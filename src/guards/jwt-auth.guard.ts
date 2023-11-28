import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { TokenPayload } from 'src/modules/auth/auth.service';

export interface IAuthRequest extends Request {
  user: TokenPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }) as TokenPayload;
        request.user = decoded;
        return true;
      } catch (err) {
        // Token is invalid
        return false;
      }
    }
    // No token provided
    return false;
  }
}


