import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Profesional } from '../../profesional/entities/profesional.entity';
import { Disponibilidad } from '../../disponibilidad/entities/disponibilidad.entity';

export enum EstadoTurno {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  CANCELADO = 'cancelado',
}

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clinica_id: string;

  @Column()
  paciente_id: string;

  @Column()
  profesional_id: string;

  @Column()
  disponibilidad_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({
    type: 'enum',
    enum: EstadoTurno,
    default: EstadoTurno.PENDIENTE,
  })
  estado: EstadoTurno;

  @Column({ unique: true })
  link_token: string;

  @ManyToOne(() => Paciente, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @ManyToOne(() => Profesional, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'profesional_id' })
  profesional: Profesional;

  @OneToOne(() => Disponibilidad, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'disponibilidad_id' })
  disponibilidad: Disponibilidad;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
