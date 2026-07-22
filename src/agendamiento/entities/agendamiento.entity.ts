import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AgendamientoStatus {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  CANCELADO = 'cancelado',
  COMPLETADO = 'completado',
}

@Entity('agendamientos')
export class Agendamiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  link_token: string;

  @Column()
  paciente_nombre: string;

  @Column({ nullable: true })
  paciente_telefono: string;

  @Column()
  clinica_nombre: string;

  @Column({ nullable: true })
  clinica_direccion: string;

  @Column({ nullable: true })
  especialista_nombre: string;

  @Column({ nullable: true })
  especialidad: string;

  @Column({ type: 'timestamp' })
  fecha_hora: Date;

  @Column({ nullable: true })
  duracion_minutos: number;

  @Column({ nullable: true })
  notas: string;

  @Column({
    type: 'enum',
    enum: AgendamientoStatus,
    default: AgendamientoStatus.PENDIENTE,
  })
  status: AgendamientoStatus;

  @Column({ nullable: true })
  whatsapp_mensaje_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
