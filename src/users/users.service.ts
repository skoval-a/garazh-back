import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({ where: { email } });
  }
}
