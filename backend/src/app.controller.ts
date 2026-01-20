import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Article } from './articles/entities/article.entity';
import { Category } from './categories/entities/category.entity';
import { Video } from './videos/entities/video.entity';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('stats')
  async getStats() {
    const [articles, categories, videos, users, recentActivity] = await Promise.all([
      this.dataSource.getRepository(Article).count(),
      this.dataSource.getRepository(Category).count(),
      this.dataSource.getRepository(Video).count(),
      this.dataSource.getRepository(User).count(),
      this.dataSource.getRepository(Article).find({
        order: { created_at: 'DESC' },
        take: 5,
        relations: ['category'],
      }),
    ]);

    return {
      articles,
      categories,
      videos,
      users,
      recentActivity,
    };
  }
}
