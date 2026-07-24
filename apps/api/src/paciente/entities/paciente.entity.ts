import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pacientes')
@Unique(['clinica_id', 'telefono_whatsapp'])
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clinica_id: string;

  @Column()
  nombre: string;

  @Column()
  telefono_whatsapp: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
