import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { JwtPayload, LoginResponse } from './auth.types';
import { LoginDto } from './dto/login.dto';
import { Usuario } from './entities/usuario.entity';

interface InsforgeUser {
  id: string;
  email: string;
}

interface LoginResponse {
  access_token: string;
  usuario: {
    id: string;
    nombre: string;
    clinica_id: string;
  };
}

@Injectable()
export class AuthService {
  private readonly insforgeUrl = process.env.INSFORGE_URL ?? '';

  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    const insforgeUser = await this.authenticateWithInsforge(dto.email, dto.password);

    const usuario = await this.usuarioRepo.findOne({
      where: { id: insforgeUser.id },
    });

    if (!usuario) {
      throw new NotFoundException(
        'Usuario no registrado en el sistema. Contacte al administrador.',
      );
    }

    const payload: JwtPayload = {
      sub: usuario.id,
      clinica_id: usuario.clinica_id,
      nombre: usuario.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        clinica_id: usuario.clinica_id,
      },
    };
  }

  private async authenticateWithInsforge(
    email: string,
    password: string,
  ): Promise<InsforgeUser> {
    if (!this.insforgeUrl) {
      throw new InternalServerErrorException('INSFORGE_URL no configurado');
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.post<{ user?: { id: string; email: string }; id?: string; email?: string }>(
          `${this.insforgeUrl}/auth/v1/signin`,
          { email, password },
        ),
      );
      const id = data.user?.id ?? data.id;
      const userEmail = data.user?.email ?? data.email;
      if (!id) throw new Error('Respuesta inesperada de Insforge');
      return { id, email: userEmail ?? email };
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } }).response?.status;
      if (status === 401 || status === 400) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      throw new UnauthorizedException('No se pudo autenticar con Insforge');
    }
  }
}
