import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
  UseFilters,
  UploadedFiles,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { request } from 'http';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, UserRole } from './models/_user.model';
import { UsersService } from './users.service';
import { REQUEST } from '@nestjs/core';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
import { PaginationParams } from 'src/utils/paginationParams.dto';
import ParamsWithId from 'src/utils/paramsWithId';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/utils/ApiPaginatedResponse';
import CreateUserDto from './dto/create-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(REQUEST) private readonly req: Record<string, unknown>,
  ) {}

  @Roles(UserRole.STUDENT)
  @ApiPaginatedResponse(User)
  @Get()
  findAll(@Query() paginationOptions: PaginationParams) {
    return this.usersService.findAll(paginationOptions);
  }

  @Get('profile')
  async getProfile() {
    return await this.usersService.getProfile(this.req.me as User);
  }

  @Patch('profile')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }, { name: 'photos' }]),
  )
  @ApiConsumes('multipart/form-data')
  async updateProfile(
    @UploadedFiles()
    files,
    @Body() updateUserData: UpdateUserDto,
  ) {
    // console.log(files.photos);
    if (files && files.photo) updateUserData.photo = files.photo[0].secure_url;

    delete updateUserData.enabled;

    return await this.usersService.update(
      { _id: this.req.me } as FilterUserDto,
      updateUserData,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/change-password')
  async changePassword(
    @Body() { oldPassword, newPassword }: ChangePasswordDto,
    @AuthUser() me: User,
  ) {
    return await this.usersService.changePassword(
      { oldPassword, newPassword },
      me,
    );
  }

  @Public()
  @Get(':id')
  async fetchUserById(@Param() { id }: ParamsWithId) {
    return await this.usersService.findOne({ _id: id } as FilterUserDto);
  }
}
