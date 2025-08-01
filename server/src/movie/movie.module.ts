import { Module } from '@nestjs/common';
import { MoviesService } from './movie.service';
import { MoviesController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Movie } from './movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), UserModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
