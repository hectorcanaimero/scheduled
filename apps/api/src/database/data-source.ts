import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Agendamiento } from '../agendamiento/entities/agendamiento.entity';
import { BloqueoHorario } from '../agendamiento/entities/bloqueo-horario.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? 'postgres',
  database: process.env.DB_NAME ?? 'scheduled',
  entities: [Agendamiento, BloqueoHorario],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
});
