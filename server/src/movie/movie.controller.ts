import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';
import { CustomFileInterceptor } from '../common/intercepters/file.interceptor';
import {
  GenericApiResponseOfFilter,
  GenericResponse,
} from '../common/utils/generic-reponse';
import { ResponseWrapper } from '../common/utils/response-wrapper';
import { MovieResponseDto } from './dto/movie.dto';
import { MoviesService } from './movie.service';

@ApiTags('Movies')
@Controller('api/auth/movies')
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async getDocuments(
    @Req() req,
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('sort') sort?: string,
  ): Promise<GenericApiResponseOfFilter<MovieResponseDto[]>> {
    try {
      const user = req?.user;
      const result = await this.moviesService.findAll({
        user,
        page,
        size,
        sort,
      });

      return ResponseWrapper.Paginated({
        data: result.data,
        total: result.total,
        page: result.page,
        size: result.size,
        sort: result.sort,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('upload')
  @UseInterceptors(CustomFileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('year') year: string,
    @Req() req,
  ): Promise<GenericResponse<MovieResponseDto>> {
    try {
      const user = req.user;
      const filePath = file.path.split(' ').join('');
      const savedDoc = await this.moviesService.saveDocument(
        filePath,
        title,
        year,
        user.userId,
      );
      return ResponseWrapper.Success<MovieResponseDto>(savedDoc);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
