import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Profesional } from '../../profesional/entities/profesional.entity';

export enum EstadoDisponibilidad {
  LIBRE = 'libre',
  RESERVADO = 'reservado',
}

@Entity('disponibilidades')
@Unique(['clinica_id', 'profesional_id', 'fecha', 'horario'])
export class Disponibilidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clinica_id: string;

  @Column()
  profesional_id: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  horario: string;

  @Column({
    type: 'enum',
    enum: EstadoDisponibilidad,
    default: EstadoDisponibilidad.LIBRE,
  })
  estado: EstadoDisponibilidad;

  @ManyToOne(() => Profesional, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'profesional_id' })
  profesional: Profesional;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
