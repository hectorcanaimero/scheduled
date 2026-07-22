import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum EstadoTurno {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  CANCELADO = 'cancelado',
  COMPLETADO = 'completado',
  NO_ASISTIO = 'no_asistio',
}

@Entity('turnos')
@Index(['fecha', 'clinica_id'])
@Index(['medico_id', 'fecha'])
export class Turno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fin: string;

  @Column({
    type: 'enum',
    enum: EstadoTurno,
    default: EstadoTurno.PENDIENTE,
  })
  estado: EstadoTurno;

  @Column()
  paciente_nombre: string;

  @Column()
  paciente_telefono: string;

  @Column({ nullable: true })
  paciente_documento: string;

  @Column('uuid')
  @Index()
  medico_id: string;

  @Column()
  medico_nombre: string;

  @Column('uuid')
  @Index()
  clinica_id: string;

  @Column({ nullable: true, type: 'text' })
  notas: string;

  @Column({ nullable: true })
  motivo_consulta: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
