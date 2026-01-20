import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { seedDatabase } from './seeds/seed';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { Article } from '../articles/entities/article.entity';
import { Video } from '../videos/entities/video.entity';

config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST') || 'localhost',
  port: parseInt(configService.get('DB_PORT'), 10) || 5432,
  username: configService.get('DB_USERNAME') || 'postgres',
  password: configService.get('DB_PASSWORD') || 'password',
  database: configService.get('DB_NAME') || 'news_db',
  entities: [User, Category, Subcategory, Article, Video],
  synchronize: true,
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    await seedDatabase(AppDataSource);
    await AppDataSource.destroy();
    console.log('Seeding completed and connection closed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during Data Source initialization or seeding:', error);
    process.exit(1);
  });
