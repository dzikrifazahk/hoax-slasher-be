import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHash {
  async hash(password: string): Promise<string> {
    const SALT_ROUND = 10;
    return bcrypt.hash(password, SALT_ROUND);
  }

  async compare(password: string, encryptedPassowrd: string) {
    return bcrypt.compare(password, encryptedPassowrd);
  }
}
