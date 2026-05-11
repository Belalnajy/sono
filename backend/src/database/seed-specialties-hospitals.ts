import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { Article } from '../articles/entities/article.entity';
import { Specialty } from '../specialties/entities/specialty.entity';
import { Hospital } from '../hospitals/entities/hospital.entity';

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
  synchronize: true,
});

const hospitalsData = [
  {
    specialty: 'تخصص القلب',
    slug: 'cardiology',
    icon: 'HeartPulse',
    hospitals: [
      {
        name: 'مستشفى دار الفؤاد',
        desc: 'تعد من المستشفيات الخاصة الرائدة في مصر وتتميز بتقديم خدمات طبية عالية الجودة وفق المعايير العالمية تضم مجموعة كبيرة من التخصصات مثل القلب والجراحة والأورام والعظام وتشتهر بإجراء العمليات الدقيقة باستخدام أحدث الأجهزة والتقنيات كما توفر رعاية متكاملة تشمل التشخيص والعلاج والمتابعة وتستقطب نخبة من الأطباء المتخصصين وتقدم خدمات فندقية مميزة داخل المستشفى',
        working_hours: 'غالبًا من 8 ص لـ 8 م، الطوارئ 24 ساعة.',
        technologies: ['جراحات قلب مفتوح', 'قسطرة قلبية وتشخيصية', 'أجهزة صدى قلب متقدمة', 'وحدات عناية مركزة قلبية'],
        phone: '16370',
        website: 'https://www.daralfouad.org',
      },
      {
        name: 'مستشفي مجدي يعقوب',
        desc: 'مركز متقدم لعلاج وجراحات القلب يقدم خدمات مجانية بمعايير عالمية ويعد من أبرز المراكز الطبية المتخصصة في القلب في الشرق الأوسط',
        working_hours: '24 ساعة، يشمل العيادات والطوارئ.',
        technologies: ['جراحات قلب معقدة للأطفال والكبار', 'زرع صمامات وأجهزة تنظيم ضربات القلب', 'قسطرة قلبية متطورة', 'عناية مركزة متخصصة للقلب'],
        phone: '19731',
        website: 'https://myf-egypt.org',
      },
    ],
  },
  {
    specialty: 'تخصص الأورام',
    slug: 'oncology',
    icon: 'Activity',
    hospitals: [
      {
        name: 'مستشفى سرطان الأطفال 57357',
        desc: 'تعد من أكبر مستشفيات علاج سرطان الأطفال في العالم وتعمل بنظام غير ربحي يعتمد على التبرعات تقدم خدمات تشخيص وعلاج متكاملة تشمل العلاج الكيميائي والإشعاعي وزراعة النخاع وتهتم أيضا بالدعم النفسي للأطفال وأسرهم وتشارك في أبحاث علمية متقدمة لتحسين نسب الشفاء',
        working_hours: '24 ساعة (استقبال وعلاج مستمر).',
        technologies: ['أجهزة علاج إشعاعي متطورة', 'وحدات زرع نخاع', 'تشخيص جيني وأشعة متقدمة'],
        phone: '19057',
        website: 'https://www.57357.org',
      },
      {
        name: 'المعهد القومي للأورام',
        desc: 'مؤسسة طبية تعليمية وبحثية تابعة لجامعة القاهرة متخصصة في علاج جميع أنواع السرطان تضم أقساما متعددة مثل الجراحة والعلاج الكيميائي والأشعة وتلعب دورا مهما في تدريب الأطباء وإجراء الأبحاث رغم الضغط الكبير بسبب أعداد المرضى',
        working_hours: 'عيادات صباحية و بالإضافة للطوارئ 24 ساعة',
        technologies: ['علاج إشعاعي وكيميائي', 'جراحات أورام دقيقة', 'معامل تحليل متقدمة'],
        phone: '02 23640693',
        website: 'https://nci.cu.edu.eg',
      },
      {
        name: 'مستشفى بهية',
        desc: 'مؤسسة خيرية متخصصة في الكشف المبكر وعلاج سرطان الثدي للسيدات تقدم خدمات مجانية وتعتمد على أحدث الوسائل الطبية وتركز على نشر التوعية بأهمية الفحص المبكر',
        working_hours: 'غالبًا من 9 ص لـ 4 م (حسب القسم)',
        technologies: ['أجهزة ماموجرام', 'أشعة رنين', 'علاج إشعاعي وكيميائي'],
        phone: '16602',
        website: 'https://baheya.org',
      },
    ],
  },
  {
    specialty: 'تخصص العظام',
    slug: 'orthopedics',
    icon: 'Bone',
    hospitals: [
      {
        name: 'مستشفى الحضرة لجراحة العظام',
        desc: 'مستشفى حكومي متخصص في جراحات العظام والإصابات ويعد من أهم مراكز علاج الكسور في الإسكندرية يقدم خدمات الطوارئ والعمليات الجراحية والتأهيل الحركي',
        working_hours: 'عيادات صباحية و بالإضافة للطوارئ 24 ساعة',
        technologies: ['جراحات كسور', 'تركيب مفاصل صناعية', 'أشعة عادية ومقطعية'],
        phone: '03 4282570',
        website: 'https://alexu.edu.eg',
      },
      {
        name: 'مستشفيات قصر العيني (عظام)',
        desc: 'يعتبر من أعرق المستشفيات في مصر ويتبع جامعة القاهرة يتميز قسم العظام فيه بإجراء جراحات متقدمة مثل تغيير المفاصل وعلاج التشوهات وله دور كبير في التعليم الطبي',
        working_hours: 'صباحي و بالإضافة للطوارئ 24 ساعة',
        technologies: ['جراحات العمود الفقري', 'مناظير المفاصل', 'أشعة متقدمة'],
        phone: '02 23657790',
        website: 'https://kasralainy.edu.eg',
      },
      {
        name: 'مستشفيات جامعة عين شمس (عظام)',
        desc: 'من أكبر المستشفيات التعليمية ويضم قسم عظام متطور يقدم خدمات جراحية متنوعة خاصة في إصابات الملاعب والعمود الفقري مع تدريب الطلاب والأطباء',
        working_hours: 'صباحي + طوارئ',
        technologies: ['جراحات دقيقة', 'مناظير', 'أجهزة تثبيت حديثة'],
        phone: '02 26831474',
        website: 'https://med.asu.edu.eg',
      },
    ],
  },
  {
    specialty: 'تخصص الأطفال',
    slug: 'pediatrics',
    icon: 'Baby',
    hospitals: [
      {
        name: 'مستشفى أبو الريش للأطفال',
        desc: 'مستشفى جامعي متخصص في طب الأطفال يقدم خدمات شاملة تشمل الحضانات والعناية المركزة وجراحات الأطفال ويستقبل أعدادا كبيرة يوميا ويعد مركزا مهما لتدريب الأطباء',
        working_hours: '24 ساعة',
        technologies: ['حضانات أطفال', 'عناية مركزة', 'أشعة وتحاليل متكاملة'],
        phone: '02 23640733',
        website: 'https://kasralainy.edu.eg',
      },
      {
        name: 'مستشفى الأطفال الجامعي بالإسكندرية',
        desc: 'يقدم رعاية طبية متكاملة للأطفال في مختلف التخصصات ويضم وحدات حديثة للعناية المركزة وحديثي الولادة ويساهم في التعليم والبحث العلمي',
        working_hours: '24 ساعة',
        technologies: ['عناية مركزة أطفال', 'أجهزة تنفس صناعي', 'تشخيص شامل'],
        phone: '03 4878560',
        website: 'https://alexu.edu.eg',
      },
    ],
  },
  {
    specialty: 'تخصص المخ والأعصاب',
    slug: 'neurology',
    icon: 'Brain',
    hospitals: [
      {
        name: 'مستشفيات قصر العيني (مخ وأعصاب)',
        desc: 'يتميز بتشخيص وعلاج الأمراض العصبية مثل الجلطات والصرع ويجري جراحات المخ والعمود الفقري باستخدام تقنيات حديثة',
        working_hours: '24 ساعة',
        technologies: ['جراحات مخ دقيقة', 'رسم مخ وأعصاب', 'رنين مغناطيسي'],
        phone: '02 23657790',
        website: 'https://kasralainy.edu.eg',
      },
    ],
  },
  {
    specialty: 'تخصص الكلى والمسالك البولية',
    slug: 'urology',
    icon: 'Droplets',
    hospitals: [
      {
        name: 'مركز الكلى والمسالك البولية بجامعة المنصورة',
        desc: 'مركز طبي عالمي متخصص في أمراض وزراعة الكلى والمسالك البولية ويستقبل مرضى من داخل وخارج مصر ويتميز بخبرات طبية عالية',
        working_hours: '24 ساعة',
        technologies: ['زراعة كلى', 'غسيل كلوي', 'مناظير مسالك'],
        phone: '050 2262222',
        website: 'https://www.unc.edu.eg/ar/contact-us',
      },
      {
        name: 'معهد تيودور بلهارس للأبحاث',
        desc: 'مركز بحثي وعلاجي متخصص في أمراض الكبد والجهاز الهضمي والطفيليات وله دور كبير في مكافحة الأمراض المتوطنة ويقدم خدمات علاجية متقدمة',
        working_hours: 'صباحي و بالإضافة للطوارئ',
        technologies: ['مناظير جهاز هضمي', 'علاج أمراض الكبد', 'تحاليل متخصصة'],
        phone: '02 23315486',
        website: 'http://tbri.sci.eg',
      },
    ],
  },
  {
    specialty: 'تخصص النساء والتوليد',
    slug: 'obstetrics',
    icon: 'PersonStanding',
    hospitals: [
      {
        name: 'مستشفى الجلاء التعليمي للنساء والتوليد',
        desc: 'مستشفى متخصص في النساء والتوليد يقدم خدمات الولادة الطبيعية والقيصرية ويتميز بخبرة في الحالات الحرجة ومتابعة الحمل',
        working_hours: '24 ساعة',
        technologies: ['حضانات', 'عمليات قيصرية', 'متابعة حمل'],
        phone: '02 23315486',
        website: 'https://galaahp.gov.eg/',
      },
      {
        name: 'مستشفى النساء والتوليد بجامعة عين شمس',
        desc: 'من أكبر مستشفيات الولادة في مصر يقدم خدمات متابعة الحمل وعلاج أمراض النساء وتأخر الإنجاب وله دور كبير في التعليم الطبي',
        working_hours: '24 ساعة',
        technologies: ['متابعة حمل عالي الخطورة', 'حضانات متقدمة', 'جراحات نسائية'],
        phone: '02 26831474',
        website: 'https://med.asu.edu.eg',
      },
    ],
  },
  {
    specialty: 'تخصص الأمراض الجلدية',
    slug: 'dermatology',
    icon: 'Sparkles',
    hospitals: [
      {
        name: 'مستشفى الحوض المرصود للأمراض الجلدية',
        desc: 'من أقدم المستشفيات المتخصص في الأمراض الجلدية يقدم خدمات تشخيص وعلاج الأمراض الجلدية المزمنة والمعدية وبعض الخدمات التجميلية',
        working_hours: 'صباحي',
        technologies: ['ليزر جلدي', 'علاج أمراض جلدية مزمنة', 'تحاليل جلدية'],
        phone: '02 23901614',
        website: 'https://www.facebook.com/alhaudalmarsoudhospital/',
      },
    ],
  },
  {
    specialty: 'تخصص الأنف والأذن والحنجرة',
    slug: 'ent',
    icon: 'Ear',
    hospitals: [
      {
        name: 'مستشفى إمبابة للأنف والأذن والحنجرة',
        desc: 'متخصص في علاج أمراض الأنف والأذن والحنجرة ويقدم خدمات جراحية مثل عمليات اللوز والجيوب الأنفية وعلاج مشاكل السمع',
        working_hours: 'صباحي و بالإضافة للطوارئ',
        technologies: ['مناظير أنف وأذن', 'عمليات لوز وجيوب أنفية', 'أجهزة سمع'],
        phone: '02 33140501',
        website: '',
      },
      {
        name: 'المستشفى الرئيسي الجامعي بالإسكندرية',
        desc: 'مستشفى كبير يضم معظم التخصصات الطبية ويستقبل أعدادا ضخمة من المرضى يوميا ويعد من أهم المستشفيات التعليمية في مصر',
        working_hours: '24 ساعة',
        technologies: ['جراحات متقدمة', 'عناية مركزة', 'أشعة وتحاليل شاملة'],
        phone: '03 4282570',
        website: 'https://alexu.edu.eg',
      },
    ],
  },
];

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    const specialtyRepository = AppDataSource.getRepository(Specialty);
    const hospitalRepository = AppDataSource.getRepository(Hospital);

    for (const spec of hospitalsData) {
      let specialty = await specialtyRepository.findOne({
        where: { slug: spec.slug },
      });
      if (!specialty) {
        specialty = specialtyRepository.create({
          name: spec.specialty,
          slug: spec.slug,
          icon: spec.icon,
        });
        await specialtyRepository.save(specialty);
        console.log(`✅ Specialty created: ${spec.specialty}`);
      } else {
        specialty.name = spec.specialty;
        specialty.icon = spec.icon;
        await specialtyRepository.save(specialty);
        console.log(`🔄 Specialty updated: ${spec.specialty}`);
      }

      for (const h of spec.hospitals) {
        const hSlug = `hospital-${h.name.replace(/\s+/g, '-').toLowerCase()}`;
        let hospital = await hospitalRepository.findOne({
          where: { slug: hSlug },
        });

        if (!hospital) {
          hospital = hospitalRepository.create({
            name: h.name,
            slug: hSlug,
            description: h.desc,
            working_hours: h.working_hours,
            technologies: h.technologies,
            phone: h.phone,
            website: h.website,
            specialty: specialty,
            thumbnail_url:
              'https://images.unsplash.com/photo-1519494026892-80bbd5d6f9d0?w=800&q=80',
          });
          await hospitalRepository.save(hospital);
          console.log(`📝 Hospital created: ${h.name}`);
        } else {
          hospital.description = h.desc;
          hospital.working_hours = h.working_hours;
          hospital.technologies = h.technologies;
          hospital.phone = h.phone;
          hospital.website = h.website;
          hospital.specialty = specialty;
          await hospitalRepository.save(hospital);
          console.log(`🔄 Hospital updated: ${h.name}`);
        }
      }
    }

    await AppDataSource.destroy();
    console.log(
      'Specialties & Hospitals Seeding completed and connection closed.',
    );
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during Data Source initialization or seeding:', error);
    process.exit(1);
  });
