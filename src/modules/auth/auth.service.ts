import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { DtoOutAuth } from './dto/auth.dto';

export interface TokenPayload {
  userId: string; userEmail: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(email: string, password: string): Promise<DtoOutAuth> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const payload: TokenPayload = {
      userId: user.id, userEmail: user.email
    }

    const resultUser = {
      token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
      }
    };

    // return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
    // console.log("Result : ",resultUser);a
    return resultUser;
  }

}