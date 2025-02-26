import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  Request,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos';
import { UsersService } from './users.service';
import { Serialize } from 'src/iterceptors/Serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserEntity } from './user.entity';

@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/me')
  @Auth()
  getMe(@Request() { user }: { user: UserEntity }) {
    return user;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) throw new NotFoundException();

    return user;
  }

  @Get()
  find(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
