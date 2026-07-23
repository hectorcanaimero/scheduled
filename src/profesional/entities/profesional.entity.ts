import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profesionales')
export class Profesional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clinica_id: string;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_consulta: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
