import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Hospital } from '../../hospitals/entities/hospital.entity';

@Entity('specialties')
export class Specialty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Hospital, (hospital) => hospital.specialty)
  hospitals: Hospital[];
}
