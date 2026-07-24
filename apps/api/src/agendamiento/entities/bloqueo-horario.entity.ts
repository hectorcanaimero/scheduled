import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bloqueos_horario')
export class BloqueoHorario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clinica_id: string;

  @Column()
  profesional_id: string;

  @Column({ type: 'timestamp' })
  inicio: Date;

  @Column({ type: 'timestamp' })
  fin: Date;

  @Column({ nullable: true })
  agendamiento_id: string;

  @Column({ default: 'confirmacion' })
  motivo: string;

  @CreateDateColumn()
  created_at: Date;
}
