import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signup(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (user) throw new BadRequestException('User is exist');

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    const newUser = await this.userService.create(email, hashPassword);

    return {
      accessToken: await this.issueAccessToken(newUser.id),
    };
  }

  async signin(email: string, password: string) {
    const user = await this.validate(email, password);

    return {
      accessToken: await this.issueAccessToken(user.id),
    };
  }

  private async validate(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('ivalide password');

    return user;
  }

  private issueAccessToken(id: number) {
    return this.jwtService.signAsync({ id }, { expiresIn: '31d' });
  }
}
