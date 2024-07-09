import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const fakeUserService: Partial<UsersService> = {
  find: () => Promise.resolve([]),
  create: (email: string, password: string) =>
    Promise.resolve({ id: 1, email, password }),
};

const fakeJwtService: Partial<JwtService> = {
  signAsync: () => Promise.resolve(''),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: JwtService,
          useValue: fakeJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user and get accessToken', async () => {
    const accessToken = await service.signup('test@test.test', '1234');

    expect(accessToken).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUserService.find = () =>
      Promise.resolve([{ id: 1, email: 'twat', password: 'test' }]);

    await expect(service.signup('test@t.t', 'asdsadsa')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('ttyt@ty.sd', 'sadad')).rejects.toThrow(
      NotFoundException,
    );
  });
});
