import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';

export async function seedDatabase(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const categoryRepository = dataSource.getRepository(Category);
  const subcategoryRepository = dataSource.getRepository(Subcategory);

  // Create admin user
  const adminExists = await userRepository.findOne({ where: { username: 'admin' } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = userRepository.create({
      username: 'admin',
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
    await userRepository.save(admin);
    console.log('✅ Admin user created (username: admin, password: admin123)');
  }

  // Define structured categories
  const categoriesStructure = [
    { name: 'المعرفة الطبية', slug: 'medical-library' },
    { name: 'رعاية الطفل', slug: 'child-care' },
    { name: 'الصحة والجمال', slug: 'health-beauty' },
    { name: 'الرئيسية', slug: 'home' }, // Usually handled as a route, but adding if verified as category
    { name: 'من نحن', slug: 'about-us' },
  ];

  // Specific Subcategories Map
  const subcategoriesMap = {
    'medical-library': [
      // Diseases Group
      { name: 'أمراض شائعة', slug: 'common-diseases' },
      { name: 'الأمراض المزمنة', slug: 'chronic-diseases' },
      { name: 'الصحة النفسية', slug: 'mental-health-diseases' }, // Distinguish from child mental health
      // Medications Group
      { name: 'الاستخدامات', slug: 'medication-uses' }, 
      { name: 'التحذيرات', slug: 'medication-warnings' },
      // First Aid Group
      { name: 'طوارئ الكبار', slug: 'adult-emergencies' },
      { name: 'الإسعافات الأولية', slug: 'general-first-aid' }, // specific naming
    ],
    'child-care': [
        { name: 'النمو والتطور', slug: 'growth-development' },
        { name: 'التغذية', slug: 'child-nutrition' },
        { name: 'التطعيمات', slug: 'vaccinations' },
        { name: 'الأمراض الشائعة', slug: 'child-common-diseases' },
        { name: 'الإسعافات الأولية', slug: 'child-first-aid' },
        { name: 'الصحة النفسية', slug: 'child-mental-health' },
        { name: 'العناية اليومية', slug: 'daily-care' },
    ],
    'health-beauty': [
        { name: 'العناية بالبشرة', slug: 'skincare' },
        { name: 'امراض جلدية', slug: 'dermatology' },
        { name: 'العناية بالشعر', slug: 'hair-care' },
        { name: 'الصحة والغذاء', slug: 'health-diet' },
        { name: 'التجميل غير جراحي', slug: 'non-surgical-cosmetic' },
        { name: 'التجميل الجراحي', slug: 'surgical-cosmetic' },
    ]
  };

  for (const catData of categoriesStructure) {
    let category = await categoryRepository.findOne({ where: { slug: catData.slug } });
    if (!category) {
        category = categoryRepository.create(catData);
        await categoryRepository.save(category);
        console.log(`✅ Category created: ${catData.name}`);
    }

    const subCats = subcategoriesMap[catData.slug];
    if (subCats && category) {
        for (const subData of subCats) {
            const subExists = await subcategoryRepository.findOne({ where: { slug: subData.slug } });
            if (!subExists) {
                const subcategory = subcategoryRepository.create({ ...subData, category });
                await subcategoryRepository.save(subcategory);
                console.log(`✅ Subcategory created: ${subData.name} for ${catData.name}`);
            }
        }
    }
  }

  // Create Sample Articles for ALL Categories and Subcategories
  const articleRepository = dataSource.getRepository('Article'); // Use string name or Entity class if available in scope
  // Ensuring we have the Article entity imported or using string
  
  // Helper to create article
  const createSampleArticle = async (title: string, cat: Category, sub?: Subcategory) => {
      const art = articleRepository.create({
        title: title,
        slug: `article-${Math.random().toString(36).substring(7)}`,
        content: `<p>هذا نص تجريبي للمقال في قسم ${cat.name} ${sub ? '- ' + sub.name : ''}. يساعد هذا النص في ملء المساحة ولفت الانتباه إلى التصميم.</p>`,
        status: 'published',
        author: 'د. محمد', // static author for seed
        category: cat,
        subcategory: sub,
        thumbnail_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        views: Math.floor(Math.random() * 1000),
      });
      await articleRepository.save(art);
      console.log(`📝 Article created: ${title.substring(0, 30)}...`);
  };

  // Iterate again to ensure we have entities
  for (const catData of categoriesStructure) {
      if (['home', 'about-us'].includes(catData.slug)) continue; // Skip static pages if they are in array

      const category = await categoryRepository.findOne({ where: { slug: catData.slug } });
      if (!category) continue;

      // Create primary articles for category
      for (let i = 1; i <= 3; i++) {
          await createSampleArticle(`مقال هام في ${catData.name} ${i}`, category);
      }

      // Create articles for subcategories
      const subCats = subcategoriesMap[catData.slug];
      if (subCats) {
          for (const subData of subCats) {
              const subcategory = await subcategoryRepository.findOne({ where: { slug: subData.slug } });
              if (subcategory) {
                  for (let j = 1; j <= 2; j++) {
                     await createSampleArticle(`خبر جديد عن ${subData.name} ${j}`, category, subcategory);
                  }
              }
          }
      }
  }

  console.log('🌱 Database seeding completed!');
}
