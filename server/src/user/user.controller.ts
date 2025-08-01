import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ResponseWrapper } from '../common/utils/response-wrapper';
import { UserService } from './user.service';
import {
  GenericApiResponseOfFilter,
  GenericResponse,
} from '../common/utils/generic-reponse';
import { UserDto, UserResponseDto } from './dto/user.dto';

@ApiTags('User')
@Controller('api/user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('sort') sort: string,
  ): Promise<GenericApiResponseOfFilter<UserDto[]>> {
    try {
      let res: UserResponseDto = await this.userService.findAll({
        page,
        size,
        sort,
      });
      return ResponseWrapper.Paginated(res);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('email')
  async findByEmail(
    @Query('email') email: string,
  ): Promise<GenericResponse<UserDto>> {
    try {
      let res: UserDto = await this.userService.findByEmail(email);
      return ResponseWrapper.Success(res);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
