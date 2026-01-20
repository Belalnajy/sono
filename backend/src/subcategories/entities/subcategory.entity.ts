import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Article } from '../../articles/entities/article.entity';
import { Video } from '../../videos/entities/video.entity';

@Entity('subcategories')
export class Subcategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => Category, (category) => category.subcategories, { onDelete: 'CASCADE' })
  category: Category;

  @OneToMany(() => Article, (article) => article.subcategory)
  articles: Article[];

  @OneToMany(() => Video, (video) => video.subcategory)
  videos: Video[];
}
