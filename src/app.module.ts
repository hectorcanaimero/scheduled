import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { Agendamiento } from './agendamiento/entities/agendamiento.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PASS', 'postgres'),
        database: config.get('DB_NAME', 'scheduled'),
        entities: [Agendamiento],
        synchronize: config.get('NODE_ENV') !== 'production',
      }),
    }),
    AgendamientoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
