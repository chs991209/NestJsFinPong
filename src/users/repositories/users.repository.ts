import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserByIdEmailNameDto } from '../dto/createUserByIdEmailName.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    private readonly dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager()); // Constructor of Repository<T> => param1: target Entity, param2: manager
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email }, select: ['id'] });
  }

  public async createUserAccount(createUserDto: CreateUserByIdEmailNameDto): Promise<void> {
    const user = this.create({
      ...createUserDto,
      id: Buffer.from(createUserDto.id, 'hex'),
    });
    await this.save(user);
  }

}