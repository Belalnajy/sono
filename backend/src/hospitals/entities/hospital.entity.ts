import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Specialty } from '../../specialties/entities/specialty.entity';

@Entity('hospitals')
export class Hospital {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  thumbnail_url: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  working_hours: string;

  @Column('simple-array', { nullable: true })
  technologies: string[];

  @Column({ nullable: true })
  website: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.hospitals, {
    onDelete: 'CASCADE',
  })
  specialty: Specialty;
}
