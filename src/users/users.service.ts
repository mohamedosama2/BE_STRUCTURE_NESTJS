import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
import { PaginationParams } from 'src/utils/paginationParams';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import {
  Student,
  StudentDocument,
  StudentSchema,
} from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { User, UserDocument, UserSchema } from './entities/_user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async register(registerationData: CreateUserDto) {
    const prevUser = await this.userModel.findOne({
      phone: registerationData.phone,
    });
    if (prevUser) throw new BadRequestException('phone should be unique');
    let student: StudentDocument = await new this.studentModel(
      registerationData,
    ).save();
    return student;
  }

  async findAll(paginationOptions: PaginationParams) {
    let users = await (this.userModel as PaginateModel<UserDocument>).paginate(
      {} as FilterUserDto,
      paginationOptions,
    );
    return users;
  }

  async findOne(filter: FilterUserDto) {
    return await this.userModel.findOne(filter);
  }

  async update(filter: FilterUserDto, updateUserData: UpdateUserDto) {
    let user = await this.userModel.findOne(filter);
    if (!user) throw new NotFoundException('user not found');
    await user.set(updateUserData).save();
    return user;
  }

  async getProfile(me: User) {
    return me;
  }

  async createUser(createUserData: CreateUserDto) {
    return await new this.userModel(createUserData).save();
  }

  async changePassword(
    { oldPassword, newPassword }: ChangePasswordDto,
    me: User,
  ) {
    if (!(await (me as any).isValidPassword(oldPassword)))
      throw new UnauthorizedException('password not match');

    return await this.update(
      { _id: me._id } as FilterUserDto,
      {
        password: newPassword,
      } as UpdateUserDto,
    );
  }
}

// await this.userModel.deleteMany();
// await new this.teacherModel({
//   username: 'Lolo Amr  ',
//   email: 'remahTeacdshe@gmail.com',
//   password: '123456',
//   bio: '1',
// }).save();
// let users = await this.userModel.findById('6197e004a1142fa049ab941e');
// let test = await (users as any).isValidPassword('123456');
// console.log(test);
