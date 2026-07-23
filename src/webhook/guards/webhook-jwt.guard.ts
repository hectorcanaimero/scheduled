import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { WebhookJwtService } from '../webhook-jwt.service';

/** Validates ephemeral webhook JWT on AGD-020 and AGD-022 downstream endpoints. */
@Injectable()
export class WebhookJwtGuard implements CanActivate {
  constructor(private readonly webhookJwtService: WebhookJwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>;
      clinica_id?: string;
      clinica_instance?: string;
    }>();

    const authHeader = request.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing webhook JWT');
    }

    try {
      const payload = this.webhookJwtService.verify(authHeader.slice(7));
      request.clinica_id = payload.sub;
      request.clinica_instance = payload.instance;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired webhook JWT');
    }
  }
}
