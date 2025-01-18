import { Body, Controller, HttpCode, Post, Req, Res, Response } from '@nestjs/common';
import { SignByKakaoAccountRequestDto } from '../dto/signByKakaoAccount-request.dto';
import { SignByKakaoAccountResponseDto } from '../dto/signByKakaoAccount-response.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @HttpCode(200)
  @Post('sign/kakao')
  public async signByKakaoAccount(
    @Body() signByKakaoDto: SignByKakaoAccountRequestDto, // request body dto for checking codeKakao
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<object> {
    try {
      const signByKakaoAccountResponseDto: SignByKakaoAccountResponseDto = await this.usersService.signByKakaoAccount(signByKakaoDto);
      return {
        ...signByKakaoAccountResponseDto,
      };
    } catch (error) {
      error.throwError(error);
    }
  }
}
