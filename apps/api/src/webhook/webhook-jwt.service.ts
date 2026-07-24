import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface WebhookJwtPayload {
  /** clinica_id */
  sub: string;
  /** Evolution API instance name */
  instance: string;
  scope: 'webhook';
  iat?: number;
  exp?: number;
}

@Injectable()
export class WebhookJwtService {
  constructor(private readonly jwtService: JwtService) {}

  mint(clinicaId: string, instance: string): string {
    const payload: Omit<WebhookJwtPayload, 'iat' | 'exp'> = {
      sub: clinicaId,
      instance,
      scope: 'webhook',
    };
    return this.jwtService.sign(payload);
  }

  verify(token: string): WebhookJwtPayload {
    return this.jwtService.verify<WebhookJwtPayload>(token);
  }
}
