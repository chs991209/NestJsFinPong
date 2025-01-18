import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserByIdEmailNameDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
