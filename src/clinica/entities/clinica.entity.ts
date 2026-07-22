import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clinicas')
export class Clinica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  /** Evolution API instance name — unique key linking webhook events to this clinic */
  @Column({ unique: true })
  instance_evo: string;

  @Column({ nullable: true })
  whatsapp_numero: string;

  @Column({ default: true })
  activa: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
