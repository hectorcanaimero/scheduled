import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryColumn()
  id: string; // ID proveniente del auth de Insforge

  @Column()
  clinica_id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;
}
