import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IAuthRequest } from './jwt-auth.guard';

@Injectable()
export class BridgingCredentials implements CanActivate {
  logger = new Logger(BridgingCredentials.name);

  canActivate(context: ExecutionContext): boolean {
    try {
      const req = this.getRequest(context);

      return true;
    } catch (error) {
      this.logger.log(error);
      return false;
    }
  }
  protected getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest<IAuthRequest>();
  }
}
