import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { MovieResponseDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private docRepo: Repository<Movie>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async saveDocument(
    filePath: string,
    title: string,
    year: string,
    userId: string,
  ): Promise<MovieResponseDto> {
    const user = await this.userRepo.findOneBy({ id: userId });
    delete user.password;

    const doc = this.docRepo.create({
      title,
      filePath,
      year,
      owner: user,
    });

    return await this.docRepo.save(doc);
  }

  async findAll({
    user,
    page,
    size,
    sort,
  }: {
    user?: any;
    page?: string;
    size?: string;
    sort?: string;
  }): Promise<{
    data: MovieResponseDto[];
    total: number;
    page: number;
    size: number;
    sort: string;
  }> {
    const shouldPaginate = page && size && !isNaN(+page) && !isNaN(+size);
    const skip = shouldPaginate ? (+page - 1) * +size : 0;
    const take = shouldPaginate ? +size : undefined;
    const [documents, total] = await this.docRepo.findAndCount({
      skip,
      take,
      where: user ? { owner: { id: user.userId } } : {},
      order: {
        createdAt: sort?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      },
      relations: ['owner'],
    });

    const mapped = documents.map((doc) => {
      const filename = doc.filePath.split(/[/\\]/).pop();
      const fileUrl = `http://localhost:3000/uploads/${filename}`;

      return {
        id: doc.id,
        title: doc.title,
        filePath: fileUrl,
        year: doc.year,
        owner: {
          id: doc.owner.id,
          email: doc.owner.email,
        },
      };
    });

    return {
      data: mapped,
      total,
      page: shouldPaginate ? +page : 1,
      size: shouldPaginate ? +size : total,
      sort: sort ?? 'ASC',
    };
  }

  async findById(id: string): Promise<MovieResponseDto> {
    const doc = await this.docRepo.findOne({
      where: { id },
      // relations: ['owner'],
    });

    if (doc === null || doc === undefined) {
      throw new NotFoundException('Document not found');
    }

    const fileUrl = doc.filePath;

    return {
      id: doc.id,
      title: doc.title,
      filePath: fileUrl,
      year: doc.year,
      owner: {
        id: doc.owner.id,
        email: doc.owner.email,
      },
    };
  }
}
