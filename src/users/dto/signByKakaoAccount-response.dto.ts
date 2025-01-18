import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignByKakaoAccountResponseDto {
  @ApiProperty({ description: 'User Account\'s Token', example: 'ebsoieja,glaskjdflkasdglwamrvlkamsldk' })
  @IsNotEmpty()
  @IsString()
  token?: string;
  @ApiProperty({ description: 'Sign Success Message - in/up', example: 'SIGN_UP_SUCCESS' })
  @IsString()
  @IsNotEmpty()
  message?: string;
}