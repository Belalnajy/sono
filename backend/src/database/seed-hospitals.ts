import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { Article, ArticleStatus } from '../articles/entities/article.entity';

config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST') || 'localhost',
  port: parseInt(configService.get('DB_PORT') || '5432', 10),
  username: configService.get('DB_USERNAME') || 'postgres',
  password: configService.get('DB_PASSWORD') || 'password',
  database: configService.get('DB_NAME') || 'news_db',
  entities: [User, Category, Subcategory, Article],
  synchronize: true,
});

const hospitalsData = [
  {
    specialty: 'تخصص القلب',
    slug: 'cardiology',
    hospitals: [
      {
        name: 'مستشفى دار الفؤاد',
        desc: 'مستشفى متطور يقدم خدمات طبية متقدمة في جراحات القلب والأوعية الدموية والعديد من التخصصات الطبية الأخرى، ويضم فريقاً من الأطباء المتخصصين وأحدث الأجهزة الطبية',
      },
      {
        name: 'مستشفي مجدي يعقوب',
        desc: 'يعد من أهم المراكز المتخصصة في علاج أمراض القلب في مصر والشرق الأوسط، ويعمل تحت إشراف مؤسسة القلب التي أسسها جراح القلب العالمي Magdi Yacoub',
      },
    ],
  },
  {
    specialty: 'تخصص الأورام',
    slug: 'oncology',
    hospitals: [
      {
        name: 'مستشفى سرطان الأطفال 57357',
        desc: 'يعد من أكبر مستشفيات علاج سرطان الأطفال في العالم، ويقدم خدمات التشخيص والعلاج الكيماوي والإشعاعي والجراحات المتخصصة للأطفال المصابين بالأورام.',
      },
      {
        name: 'المعهد القومي للأورام',
        desc: 'يتبع جامعة القاهرة ويعتبر من أهم المراكز الطبية المتخصصة في تشخيص وعلاج الأورام، كما يساهم في تدريب الأطباء وإجراء الأبحاث العلمية في مجال السرطان.',
      },
      {
        name: 'مستشفى بهية',
        desc: 'مؤسسة طبية غير ربحية متخصصة في الكشف المبكر وعلاج سرطان الثدي للسيدات، وتقدم خدمات الفحص والعلاج والدعم النفسي للمرضى.',
      },
    ],
  },
  {
    specialty: 'تخصص العظام',
    slug: 'orthopedics',
    hospitals: [
      {
        name: 'مستشفى الحضرة لجراحة العظام',
        desc: 'مستشفى جامعي متخصص في جراحات العظام والكسور وإصابات الحوادث والعمود الفقري، ويستقبل عدداً كبيراً من الحالات يومياً.',
      },
      {
        name: 'مستشفيات قصر العيني (عظام)',
        desc: 'يعد من أقدم وأكبر المستشفيات التعليمية في مصر والشرق الأوسط ويضم العديد من الأقسام الطبية المتخصصة ويستقبل ملايين المرضى سنوياً.',
      },
      {
        name: 'مستشفيات جامعة عين شمس (عظام)',
        desc: 'مجموعة مستشفيات تعليمية تابعة لجامعة عين شمس تقدم خدمات طبية متقدمة في مختلف التخصصات ومنها جراحات العظام وإصابات العمود الفقري.',
      },
    ],
  },
  {
    specialty: 'تخصص الأطفال',
    slug: 'pediatrics',
    hospitals: [
      {
        name: 'مستشفى أبو الريش للأطفال',
        desc: 'أحد أكبر مستشفيات الأطفال في مصر والشرق الأوسط ويتبع كلية طب جامعة القاهرة، ويضم العديد من الأقسام التخصصية ويستقبل آلاف الأطفال يومياً للعلاج والفحوصات.',
      },
      {
        name: 'مستشفى الأطفال الجامعي بالإسكندرية',
        desc: 'مستشفى تعليمي يقدم خدمات طبية متخصصة للأطفال في العديد من المجالات مثل جراحة الأطفال وأمراض القلب للأطفال.',
      },
    ],
  },
  {
    specialty: 'تخصص المخ والأعصاب',
    slug: 'neurology',
    hospitals: [
      {
        name: 'معهد ناصر للبحوث والعلاج',
        desc: 'مستشفى حكومي كبير يقدم خدمات طبية متقدمة في العديد من التخصصات منها جراحات المخ والأعصاب والعمود الفقري.',
      },
      {
        name: 'مستشفيات قصر العيني (مخ وأعصاب)',
        desc: 'يضم أقساماً متخصصة في جراحة المخ والأعصاب ويعتبر مركزاً تعليمياً وبحثياً مهماً في مصر.',
      },
    ],
  },
  {
    specialty: 'تخصص الكلى والمسالك البولية',
    slug: 'urology',
    hospitals: [
      {
        name: 'مركز الكلى والمسالك البولية بجامعة المنصورة',
        desc: 'من أشهر المراكز الطبية المتخصصة في علاج أمراض الكلى والمسالك البولية وزراعة الكلى في الشرق الأوسط.',
      },
      {
        name: 'معهد تيودور بلهارس للأبحاث',
        desc: 'مركز طبي وبحثي متخصص في أمراض الكلى والمسالك البولية والأمراض المتوطنة ويقدم خدمات علاجية وتشخيصية متقدمة.',
      },
    ],
  },
  {
    specialty: 'تخصص النساء والتوليد',
    slug: 'obstetrics',
    hospitals: [
      {
        name: 'مستشفى الجلاء التعليمي للنساء والتوليد',
        desc: 'يعد من أكبر المستشفيات المتخصصة في النساء والتوليد في مصر ويقدم خدمات رعاية الحمل والولادة ورعاية حديثي الولادة.',
      },
      {
        name: 'مستشفى النساء والتوليد بجامعة عين شمس',
        desc: 'مستشفى تعليمي يقدم خدمات متقدمة في طب النساء والتوليد وعلاج العقم ومتابعة الحمل.',
      },
    ],
  },
  {
    specialty: 'تخصص الأمراض الجلدية',
    slug: 'dermatology',
    hospitals: [
      {
        name: 'مستشفى الحوض المرصود للأمراض الجلدية',
        desc: 'أحد أقدم المستشفيات المتخصصة في الأمراض الجلدية في مصر ويقدم خدمات تشخيص وعلاج الأمراض الجلدية المختلفة.',
      },
    ],
  },
  {
    specialty: 'تخصص الأنف والأذن والحنجرة',
    slug: 'ent',
    hospitals: [
      {
        name: 'مستشفى إمبابة للأنف والأذن والحنجرة',
        desc: 'مستشفى متخصص في أمراض الأنف والأذن والحنجرة ويقدم خدمات التشخيص والجراحة.',
      },
      {
        name: 'المستشفى الرئيسي الجامعي بالإسكندرية',
        desc: 'مستشفى جامعي كبير يقدم خدمات طبية في العديد من التخصصات ومنها الأنف والأذن والحنجرة.',
      },
    ],
  },
];

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    const categoryRepository = AppDataSource.getRepository(Category);
    const articleRepository = AppDataSource.getRepository(Article);
    const userRepository = AppDataSource.getRepository(User);

    let admin = await userRepository.findOne({ where: { username: 'admin' } });

    for (const spec of hospitalsData) {
      let category = await categoryRepository.findOne({
        where: { slug: spec.slug },
      });
      if (!category) {
        category = categoryRepository.create({
          name: spec.specialty,
          slug: spec.slug,
        });
        await categoryRepository.save(category);
        console.log(`✅ Category created: ${spec.specialty}`);
      }

      for (const hospital of spec.hospitals) {
        const articleSlug = `hospital-${hospital.name.replace(/\\s+/g, '-').toLowerCase()}`;
        let article = await articleRepository.findOne({
          where: { slug: articleSlug },
        });

        if (!article) {
          article = articleRepository.create({
            title: hospital.name,
            slug: articleSlug,
            content: `<p><strong>${hospital.name}</strong></p><p>${hospital.desc}</p>`,
            status: ArticleStatus.PUBLISHED,
            author: admin ? admin.username : 'admin',
            category: category,
            thumbnail_url:
              'https://images.unsplash.com/photo-1519494026892-80bbd5d6f9d0?w=800&q=80',
          });
          await articleRepository.save(article);
          console.log(`📝 Hospital created: ${hospital.name}`);
        }
      }
    }

    await AppDataSource.destroy();
    console.log('Hospitals Seeding completed and connection closed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during Data Source initialization or seeding:', error);
    process.exit(1);
  });
