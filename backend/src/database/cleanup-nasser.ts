import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Hospital } from '../hospitals/entities/hospital.entity';
import { Specialty } from '../specialties/entities/specialty.entity';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { Article } from '../articles/entities/article.entity';

config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST') || 'localhost',
  port: parseInt(configService.get('DB_PORT') || '5432', 10),
  username: configService.get('DB_USERNAME') || 'postgres',
  password: configService.get('DB_PASSWORD') || 'password',
  database: configService.get('DB_NAME') || 'news_db',
  entities: [User, Category, Subcategory, Article, Specialty, Hospital],
  synchronize: false,
});

async function deleteNasser() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Data Source has been initialized!');

    const hospitalRepository = AppDataSource.getRepository(Hospital);
    const articleRepository = AppDataSource.getRepository(Article);

    // Names to delete (from user's screenshot and previous Turn)
    const namesToDelete = [
      'معاهد ناصر للبحوث والعلاج',
      'معهد ناصر للبحوث والعلاج'
    ];

    for (const name of namesToDelete) {
      console.log(`🔍 Searching for: "${name}"`);
      
      // Delete from Hospital entity
      const hospitals = await hospitalRepository.find({
        where: [
          { name: name },
          { slug: Like('%ناصر%') } // Extra safety
        ]
      });
      
      if (hospitals.length > 0) {
        await hospitalRepository.remove(hospitals);
        console.log(`🗑️ Deleted ${hospitals.length} hospital records matching "${name}"`);
      }

      // Also check Article entity because some seeders use Articles for hospitals
      const articles = await articleRepository.find({
        where: [
          { title: name },
          { slug: Like('%ناصر%') }
        ]
      });

      if (articles.length > 0) {
        await articleRepository.remove(articles);
        console.log(`🗑️ Deleted ${articles.length} article records matching "${name}"`);
      }
    }

    console.log('✨ Deletion complete.');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('💥 Error during deletion:', error);
    process.exit(1);
  }
}

// Helper for Like operator
import { Like } from 'typeorm';

deleteNasser();
