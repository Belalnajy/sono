import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  video_url: string;

  @ManyToOne(() => Category, (category) => category.videos, { onDelete: 'CASCADE' })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.videos, { nullable: true, onDelete: 'SET NULL' })
  subcategory?: Subcategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
