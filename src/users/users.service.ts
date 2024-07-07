import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  create(email: string, password: string) {
    const newUser = this.repo.create({ email, password });

    return this.repo.save(newUser);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attr: Partial<UserEntity>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException();

    Object.assign(user, attr);
    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException();
    return this.repo.remove(user);
  }
}
