import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Basedto } from '../../common/entities/base.dto';

export class UserDto extends Basedto {
  @IsNotEmpty()
  @Expose()
  email: string;
}

export class UserResponseDto {
  data: UserDto[];
  total: number;
  page: number;
  size: number;
  sort: string;
}
