import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { UsersBusinessLogic } from '../businesslogics/users.businesslogic';
import { CreateUserByIdEmailNameDto } from '../dto/createUserByIdEmailName.dto';
import { SignByKakaoAccountRequestDto } from '../dto/signByKakaoAccount-request.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  private readonly clientId: string = String(process.env.REST_API_KEY);
  private readonly expirationTime: string = String(process.env.JWT_EXPIRES_IN);
  private readonly secretKey: string = String(process.env.SECRET_KEY);
  private readonly redirectUri: string = String(process.env.AUTH_REDIRECT_URI);
  private readonly jwtAlgorithm: string = String(process.env.JWT_ALGORITHM);
  private readonly requestBaseUrlForKakaoAccessToken: string = String('https://kauth.kakao.com');
  private readonly requestUrlForKakaoAccessToken: string = String('/oauth/token');
  private readonly requestBaseUrlForKakaoUserInfo: string = String('https://kapi.kakao.com');
  private readonly requestUrlForKakaoUserInfo: string = String('v2/user/me');
  private requestConfigForKakaoAccessToken: AxiosRequestConfig<any>;
  private requestConfigForKakaoUserInfo: AxiosRequestConfig<any>;
  private readonly createUserDto: CreateUserByIdEmailNameDto;
  private readonly uuid: typeof uuidv4;
  private userId: string;
  private jwtToken: string;

  constructor(
    private readonly axiosHttpService: HttpService,
    private readonly usersRepository: UsersRepository,
    private readonly businessLogic: UsersBusinessLogic,
  ) {
    this.uuid = uuidv4;
  }

  // public interface to Controller
  public async signByKakaoAccount(signByKakaoDto: SignByKakaoAccountRequestDto): Promise<object> {
    const kakaoCode: string = signByKakaoDto.kakaoCode;
    const kakaoAccessToken: string = await this.getKakaoAccessToken(kakaoCode, this.clientId, this.redirectUri);
    const userInfo: object = await this.getKakaoUserInfo(kakaoAccessToken);
    if (!(await this.getUserIsExisting(String(userInfo['email'])))) { // SIGN UP process 입니다.
      await this.setUserId(); // userId Setter - param 없음 => method 내에서 생성합니다.
      await this.createUserAccount(String(userInfo['email']), String(userInfo['name']));
      await this.setJwtToken(await this.businessLogic.getJwtToken(this.userId, this.secretKey, this.jwtAlgorithm, this.expirationTime));
      return {
        token: this.jwtToken,
        message: 'KAKAO_SIGN_UP_SUCCESS',
      };
    } else { // SIGN IN process입니다.
      await this.setUserId(await this.getUserId(userInfo['email'])); // userId Setter - param 있음 => db에서 제공합니다.
      await this.setJwtToken(await this.businessLogic.getJwtToken(this.userId, this.secretKey, this.jwtAlgorithm, this.expirationTime));
      return {
        token: this.jwtToken,
        message: 'KAKAO_SIGN_IN_SUCCESS',
      };
    }
  }

  private async getKakaoAccessToken(kakaoCode: string, clientId: string, redirectUri: string): Promise<string> {
    await this.setRequestConfigForKakaoAccessToken(kakaoCode, clientId, redirectUri);
    return String(await (await this.getKakaoAccessTokenResponse()).data.access_token);
  };

  // Setter
  private async setRequestConfigForKakaoAccessToken(kakaoCode: string, clientId: string, redirectUri: string): Promise<void> {
    this.requestConfigForKakaoAccessToken = {
      url: this.requestUrlForKakaoAccessToken,
      data: {},
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: clientId,
        kakaoCode,
        redirect_uri: redirectUri,
      },
    };
  }

  private async getKakaoAccessTokenResponse(): Promise<Record<string, any>> {
    return this.getRecordFromObservableAxiosResponse(this.axiosHttpService.post<any>(this.requestBaseUrlForKakaoAccessToken, {}, this.requestConfigForKakaoAccessToken));
  }

  private async getKakaoUserInfo(kakaoAccessToken: string): Promise<object> {
    await this.setRequestConfigForKakaoUserInfo(kakaoAccessToken);
    const kakaoAuthorizationResponse: Record<string, any> = await this.getKakaoUserInfoAuthorization();
    return Promise.resolve({
      name: await this.getName(kakaoAuthorizationResponse),
      email: await this.getEmail(kakaoAuthorizationResponse),
    });
  };

  // Setter
  private async setRequestConfigForKakaoUserInfo(kakaoAccessToken: string): Promise<void> {
    this.requestConfigForKakaoUserInfo = {
      url: this.requestUrlForKakaoUserInfo,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    };
  }

  private async getKakaoUserInfoAuthorization(): Promise<Record<string, any>> {
    return this.getRecordFromObservableAxiosResponse(this.axiosHttpService.get(this.requestBaseUrlForKakaoUserInfo, this.requestConfigForKakaoUserInfo));
  }

  private async getName(kakaoUserInfoAuthorizationResponse: Record<string, any>): Promise<string | null> {
    return await kakaoUserInfoAuthorizationResponse['data']['name'];
  }

  private async getEmail(kakaoUserInfoAuthorizationResponse: Record<string, any>): Promise<string | null> {
    return await kakaoUserInfoAuthorizationResponse['data']['email'];
  }

  private async getUserIsExisting(email: string): Promise<boolean> {
    return !!(await this.usersRepository.findUserByEmail(email)); // not existing user => false
  }

  private async createUserAccount(email: string, name: string): Promise<void> {
    this.createUserDto.id = this.userId;
    this.createUserDto.email = email;
    this.createUserDto.name = name;
    await this.usersRepository.createUserAccount(this.createUserDto);
  }

  // Setter
  // setUserId(id)와 setUserId()로 나뉘었어야 합니다.
  private async setUserId(id?: string): Promise<void> {
    if (id) {
      this.userId = String(id);
    }
    this.userId = String(this.uuid());
  }

  private async getUserId(email: string): Promise<string> {
    return this.businessLogic.getStringFromBuffer((await this.usersRepository.findUserByEmail(email)).id);
  }

  // Setter
  private async setJwtToken(token: string): Promise<void> {
    this.jwtToken = token;
  }

  private getRecordFromObservableAxiosResponse(axiosResponse: Observable<AxiosResponse<any, any>>): Record<string, any> { // rxjs에 dependency를 가지고 있습니다.
    return lastValueFrom(axiosResponse.pipe( // axiosResponse => subscribe target AxiosResponse입니다.
      map((axiosResponse: AxiosResponse<any>): Record<string, any> => {
        const recordFromAxiosResponse: Record<string, any> = {}; // return target Record입니다.
        for (const key in recordFromAxiosResponse) {
          if (axiosResponse.hasOwnProperty(key)) {
            recordFromAxiosResponse[key] = axiosResponse[key];
          }
        }
        return recordFromAxiosResponse;
      }),
    ));
  }
}
