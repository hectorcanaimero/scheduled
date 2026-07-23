import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clinicas')
export class Clinica {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
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
  @Column({ nullable: true })
  logo_url: string | null;

  @Column({ nullable: true })
  whatsapp_numero: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
