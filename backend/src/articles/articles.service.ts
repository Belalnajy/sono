import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleStatus } from './entities/article.entity';
import { Category } from '../categories/entities/category.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const category = await this.categoryRepository.findOne({
      where: { id: createArticleDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createArticleDto.categoryId} not found`,
      );
    }

    let subcategory: Subcategory | undefined = undefined;
    if (createArticleDto.subcategoryId) {
      const sub = await this.subcategoryRepository.findOne({
        where: { id: createArticleDto.subcategoryId },
      });
      if (!sub) {
        throw new NotFoundException(
          `Subcategory with ID ${createArticleDto.subcategoryId} not found`,
        );
      }
      subcategory = sub;
    }

    const article = this.articleRepository.create({
      ...createArticleDto,
      category,
      subcategory,
    });
    return await this.articleRepository.save(article);
  }

  async findAll(
    status?: ArticleStatus,
    categoryId?: string,
    subcategoryId?: string,
    is_featured?: boolean,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ articles: Article[]; total: number }> {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.subcategory', 'subcategory')
      .orderBy('article.created_at', 'DESC');

    if (status) {
      query.andWhere('article.status = :status', { status });
    }
    if (categoryId && categoryId !== 'undefined') {
      query.andWhere('article.categoryId = :categoryId', { categoryId });
    }
    if (subcategoryId && subcategoryId !== 'undefined') {
      query.andWhere('article.subcategoryId = :subcategoryId', {
        subcategoryId,
      });
    }
    if (is_featured !== undefined) {
      query.andWhere('article.is_featured = :is_featured', { is_featured });
    }

    const total = await query.getCount();
    const articles = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { articles, total };
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['category', 'subcategory'],
    });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async findBySlug(slug: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { slug },
      relations: ['category', 'subcategory'],
    });
    if (!article) {
      throw new NotFoundException(`Article with slug ${slug} not found`);
    }
    return article;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOne(id);

    if (updateArticleDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateArticleDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateArticleDto.categoryId} not found`,
        );
      }
      article.category = category;
    }

    if (updateArticleDto.subcategoryId) {
      const subcategory = await this.subcategoryRepository.findOne({
        where: { id: updateArticleDto.subcategoryId },
      });
      if (!subcategory) {
        throw new NotFoundException(
          `Subcategory with ID ${updateArticleDto.subcategoryId} not found`,
        );
      }
      article.subcategory = subcategory;
    }

    Object.assign(article, updateArticleDto);
    return await this.articleRepository.save(article);
  }

  async remove(id: string): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }
}
