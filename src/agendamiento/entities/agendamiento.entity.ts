import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EstadoAgendamiento {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  CANCELADO = 'cancelado',
  BLOQUEADO = 'bloqueado',
}

@Entity('agendamientos')
export class Agendamiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  link_token: string;

  @Column()
  clinica_id: string;

  @Column()
  paciente_nombre: string;

  @Column()
  paciente_telefono: string;

  @Column()
  profesional_id: string;

  @Column({ type: 'timestamp' })
  fecha_hora: Date;

  @Column({ type: 'int', default: 30 })
  duracion_minutos: number;

  @Column({
    type: 'enum',
    enum: EstadoAgendamiento,
    default: EstadoAgendamiento.PENDIENTE,
  })
  estado: EstadoAgendamiento;

  @Column({ nullable: true })
  confirmado_por: string;

  @Column({ type: 'timestamp', nullable: true })
  confirmado_en: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
