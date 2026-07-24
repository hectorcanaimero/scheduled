import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClinicaId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<{ user?: { clinica_id: string } }>();
    return request.user?.clinica_id ?? '';
  },
);
