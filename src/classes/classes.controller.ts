import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClassDocument } from './models/class.model';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import ParamsWithId from 'src/utils/paramsWithId.dto';

@ApiBearerAuth()
@ApiTags('CLASSES')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto): Promise<ClassDocument> {
    return this.classesService.create(createClassDto);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: ParamsWithId,
    @Body() updateClassDto: UpdateClassDto,
  ): Promise<ClassDocument> {
    return this.classesService.update(id, updateClassDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param() { id }: ParamsWithId): Promise<void> {
    return this.classesService.remove(id);
  }
}
