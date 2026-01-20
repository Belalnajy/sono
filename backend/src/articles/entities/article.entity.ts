import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  thumbnail_url: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column({ nullable: true })
  video_url: string;

  @Column({ type: 'enum', enum: ArticleStatus, default: ArticleStatus.DRAFT })
  status: ArticleStatus;

  @Column({ default: false })
  is_featured: boolean;

  @Column({ nullable: true })
  author: string;

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.articles, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  subcategory?: Subcategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
