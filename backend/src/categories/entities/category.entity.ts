import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Article } from '../../articles/entities/article.entity';
import { Video } from '../../videos/entities/video.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];

  @OneToMany(() => Video, (video) => video.category)
  videos: Video[];
}
