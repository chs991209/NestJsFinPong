import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersBusinessLogic } from './businesslogics/users.businesslogic';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService, UsersBusinessLogic, UsersRepository],
})
export class UsersModule {
}
