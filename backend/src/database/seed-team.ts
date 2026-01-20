import { v2 as cloudinary } from 'cloudinary';
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'news_db',
};

const teamMembers = [
  'حنين يحيي',
  'خلود عمرو',
  'زهوه البنا',
  'شيماء سعيد',
  'فاطمة رياض',
  'ملك السيد ابراهيم',
  'مي وائل',
  'احمد حسام',
];

const publicDir = path.join(__dirname, '../../../frontend/public');

async function seed() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    console.log('Connected to database');

    for (let i = 0; i < teamMembers.length; i++) {
      const name = teamMembers[i];
      const fileName = `${name}.jpg`;
      const filePath = path.join(publicDir, fileName);

      if (fs.existsSync(filePath)) {
        console.log(`Uploading ${fileName}...`);
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'news_website/team',
        });

        const query = `
                INSERT INTO team_members (id, name, "imageUrl", "order", "createdAt", "updatedAt")
                VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())
            `;
        await client.query(query, [name, result.secure_url, i]);
        console.log(`Added ${name} with URL ${result.secure_url}`);
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.end();
  }
}

seed();
