import { Client } from 'pg';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'news_db',
};

// Team members to create accounts for
const teamMembers = [
  { name: 'حنين يحيي', username: 'haneen' },
  { name: 'خلود عمرو', username: 'kholoud' },
  { name: 'زهوه البنا', username: 'zahwa' },
  { name: 'شيماء سعيد', username: 'shimaa' },
  { name: 'فاطمة رياض', username: 'fatma' },
  { name: 'ملك السيد ابراهيم', username: 'malak' },
  { name: 'مي وائل', username: 'mai' },
  { name: 'احمد حسام', username: 'ahmed' },
];

const DEFAULT_PASSWORD = 'admin@123';

async function seedUsers() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Connected to database');
    
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    
    for (const member of teamMembers) {
      // Check if user already exists
      const checkQuery = 'SELECT id FROM users WHERE username = $1';
      const existingUser = await client.query(checkQuery, [member.username]);
      
      if (existingUser.rows.length > 0) {
        console.log(`⚠️  User "${member.username}" already exists, skipping...`);
        continue;
      }
      
      // Insert new user
      const insertQuery = `
        INSERT INTO users (id, username, password, role, created_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, 'editor', NOW(), NOW())
      `;
      
      await client.query(insertQuery, [member.username, hashedPassword]);
      console.log(`✅ Created user: ${member.username} (${member.name})`);
    }
    
    console.log('\n========================================');
    console.log('🎉 User seeding completed!');
    console.log('========================================');
    console.log('\n📋 Created accounts:');
    console.log('   Password for all: admin@123');
    console.log('   Usernames:');
    teamMembers.forEach(m => console.log(`   - ${m.username} (${m.name})`));
    console.log('========================================\n');
    
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

seedUsers();

