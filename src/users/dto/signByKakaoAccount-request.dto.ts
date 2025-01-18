import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignByKakaoAccountRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(
    { description: 'Kakao Code for User Access Request', example: 'kakaoCode' },
  )
  readonly kakaoCode?: string;
}