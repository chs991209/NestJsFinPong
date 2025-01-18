import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersBusinessLogic {
  private readonly jwt: JwtService;

  constructor() {
    this.jwt = new JwtService();
  }

  public async getJwtToken(id: string, secretKey: string, algorithm: string, expirationTime: string): Promise<string> {
    return this.jwt.sign({ id: id, secret: secretKey, algorithm: algorithm, expiresIn: expirationTime });
  }

  public async getStringFromBuffer(id: Buffer): Promise<string> {
    return id.toString('hex').replace(
      /([0-9a-fA-F]{8})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{12})/,
      '$1-$2-$3-$4-$5',
    );
  }
  
}