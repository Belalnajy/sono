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

async function updateNasserInstitute() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Data Source has been initialized!');

    const hospitalRepository = AppDataSource.getRepository(Hospital);

    // Define the data
    const nasserData = {
      name: 'معاهد ناصر للبحوث والعلاج',
      desc: 'من أكبر المستشفيات الحكومية متعددة التخصصات في مصر يضم تجهيزات حديثة ويقدم خدمات في مجالات كثيرة مثل القلب والجراحة والأورام ويعد مركزا مهما للطوارئ',
      phone: '02 24328066 - 16424',
      website: '',
      working_hours: '24 ساعة',
      technologies: ['جراحات القلب', 'وحدات غسيل كلوي', 'أشعة حديثة'],
    };

    // Find the hospital by name (using ILIKE for flexibility)
    const hospital = await hospitalRepository.createQueryBuilder('hospital')
      .where('hospital.name ILIKE :name', { name: `%معهد ناصر%` })
      .getOne();

    if (hospital) {
      hospital.description = nasserData.desc;
      hospital.phone = nasserData.phone;
      hospital.website = nasserData.website;
      hospital.working_hours = nasserData.working_hours;
      hospital.technologies = nasserData.technologies;
      
      await hospitalRepository.save(hospital);
      console.log(`✨ Success: Updated data for "${hospital.name}"`);
    } else {
      console.error('❌ Error: Nasser Institute not found in the database.');
    }

    await AppDataSource.destroy();
  } catch (error) {
    console.error('💥 Error during update:', error);
    process.exit(1);
  }
}

updateNasserInstitute();
