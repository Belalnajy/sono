'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import {
  Heart,
  CheckCircle,
  Target,
  Users,
  Eye,
  Shield,
  BookOpen,
  Scale,
  Award,
  Sparkles,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function EthicsPolicyPage() {
  const principles = [
    {
      icon: CheckCircle,
      title: 'الدقة والمصداقية',
      description:
        'نلتزم بنشر معلومات طبية دقيقة ومدققة علمياً. كل محتوى يمر بمراجعة من متخصصين قبل النشر.',
      color: 'emerald',
    },
    {
      icon: Eye,
      title: 'الشفافية',
      description:
        'نفصح عن مصادرنا ونوضح طبيعة المحتوى سواء كان تعليمياً أو إعلانياً أو برعاية.',
      color: 'blue',
    },
    {
      icon: Users,
      title: 'احترام الجمهور',
      description:
        'نحترم ذكاء قرائنا ونقدم محتوى يثري معرفتهم دون تضليل أو مبالغة.',
      color: 'purple',
    },
    {
      icon: Shield,
      title: 'حماية الخصوصية',
      description:
        'نحافظ على سرية بيانات مستخدمينا ولا نشارك معلوماتهم الشخصية دون إذن.',
      color: 'gold',
    },
  ];

  const guidelines = [
    {
      icon: BookOpen,
      title: 'معايير المحتوى الطبي',
      items: [
        'الاستناد إلى مصادر علمية موثوقة ومراجعة.',
        'التمييز الواضح بين الحقائق العلمية والآراء.',
        'تحديث المحتوى بانتظام ليعكس أحدث الأبحاث.',
        'تجنب الادعاءات الطبية غير المثبتة.',
        'الإشارة إلى ضرورة استشارة الطبيب.',
      ],
    },
    {
      icon: Scale,
      title: 'النزاهة التحريرية',
      items: [
        'استقلالية فريق التحرير عن الضغوط التجارية.',
        'الفصل بين المحتوى التحريري والإعلاني.',
        'الإفصاح عن أي تضارب في المصالح.',
        'عدم قبول هدايا أو حوافز تؤثر على المحتوى.',
        'الالتزام بمعايير الصحافة المهنية.',
      ],
    },
    {
      icon: Award,
      title: 'المسؤولية الاجتماعية',
      items: [
        'المساهمة في رفع الوعي الصحي للمجتمع.',
        'مكافحة المعلومات الطبية المضللة.',
        'دعم حملات التوعية الصحية العامة.',
        'احترام التنوع الثقافي والديني.',
        'الحرص على سلامة القراء فوق كل اعتبار.',
      ],
    },
  ];

  const commitments = [
    {
      title: 'التصحيح الفوري',
      description:
        'نلتزم بتصحيح أي خطأ فور اكتشافه مع الإشارة الواضحة إلى التصحيح.',
    },
    {
      title: 'المساءلة',
      description:
        'نتحمل مسؤولية محتوانا ونرحب بالملاحظات والانتقادات البناءة.',
    },
    {
      title: 'التطوير المستمر',
      description:
        'نعمل باستمرار على تحسين معاييرنا الأخلاقية ومواكبة أفضل الممارسات.',
    },
    {
      title: 'الحوار المفتوح',
      description:
        'نشجع النقاش البناء ونستمع لآراء قرائنا ومتابعينا.',
    },
  ];

  return (
    <div className="min-h-screen bg-soft-tint">
      {/* Hero Section */}
      <section className="hero-section relative pt-40 pb-24 overflow-hidden bg-[#0b121e]">
        <div className="hero-overlay absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b,transparent_40%)]"></div>
        <div className="hero-overlay absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>

        <div className="hero-orb absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="hero-orb absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variant="fadeDown">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-12 h-1.5 bg-rose-500 rounded-full"></span>
                <span className="text-rose-400 font-black tracking-widest text-xs uppercase">
                  قيمنا ومبادئنا
                </span>
                <span className="w-12 h-1.5 bg-rose-500 rounded-full"></span>
              </div>

              <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                <Heart className="w-12 h-12 text-rose-400" />
              </div>

              <h1 className="headline-arabic text-5xl md:text-7xl text-white font-black mb-8 leading-none">
                سياسة{' '}
                <span className="text-rose-400">الأخلاقيات</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-medium">
                نؤمن بأن المسؤولية الأخلاقية هي أساس العمل الصحفي الطبي. نلتزم
                بأعلى معايير النزاهة والشفافية في كل ما ننشره.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Principles */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="headline-arabic text-4xl font-black text-navy-900 mb-4">
              مبادئنا <span className="text-gold-500">الأساسية</span>
            </h2>
            <div className="w-24 h-1.5 bg-navy-900 mx-auto rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {principles.map((principle, index) => (
            <AnimatedSection key={index} delay={0.1 * index} variant="fadeUp">
              <div className="bg-white rounded-[2rem] p-8 shadow-elegant border border-gray-100 hover:shadow-premium transition-all duration-500 h-full group text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                    principle.color === 'emerald'
                      ? 'bg-emerald-500/10'
                      : principle.color === 'blue'
                      ? 'bg-blue-500/10'
                      : principle.color === 'purple'
                      ? 'bg-purple-500/10'
                      : 'bg-gold-500/10'
                  }`}>
                  <principle.icon
                    className={`w-8 h-8 ${
                      principle.color === 'emerald'
                        ? 'text-emerald-600'
                        : principle.color === 'blue'
                        ? 'text-blue-600'
                        : principle.color === 'purple'
                        ? 'text-purple-600'
                        : 'text-gold-600'
                    }`}
                  />
                </div>
                <h3 className="headline-arabic text-xl font-black text-navy-900 mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Guidelines */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="headline-arabic text-4xl font-black text-navy-900 mb-4">
                إرشاداتنا <span className="text-gold-500">التحريرية</span>
              </h2>
              <div className="w-24 h-1.5 bg-navy-900 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {guidelines.map((guideline, index) => (
              <AnimatedSection key={index} delay={0.1 * index} variant="fadeUp">
                <div className="bg-soft-tint rounded-[2rem] p-8 md:p-10 shadow-elegant border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center mb-6">
                    <guideline.icon className="w-7 h-7 text-rose-400" />
                  </div>
                  <h3 className="headline-arabic text-2xl font-black text-navy-900 mb-6">
                    {guideline.title}
                  </h3>
                  <ul className="space-y-4">
                    {guideline.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-gray-600 leading-relaxed">
                        <FileCheck className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="headline-arabic text-4xl font-black text-navy-900 mb-4">
              التزاماتنا <span className="text-gold-500">نحوكم</span>
            </h2>
            <div className="w-24 h-1.5 bg-navy-900 mx-auto rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {commitments.map((commitment, index) => (
              <AnimatedSection key={index} delay={0.1 * index} variant="fadeUp">
                <div className="bg-white rounded-[1.5rem] p-6 shadow-elegant border border-gray-100 hover:shadow-premium transition-all duration-500 h-full flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-navy-900 mb-2">
                      {commitment.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {commitment.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="container mx-auto px-4 pb-32">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="bg-navy-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                  <AlertCircle className="w-10 h-10 text-rose-400" />
                </div>
                <h3 className="headline-arabic text-3xl font-black text-white mb-4">
                  الإبلاغ عن مخالفة
                </h3>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  إذا لاحظت أي محتوى يخالف سياستنا الأخلاقية أو لديك ملاحظات حول
                  معاييرنا، نرحب بتواصلك معنا. رأيك يساعدنا على التحسن.
                </p>
                <a
                  href="mailto:ethics@sono.news"
                  className="inline-flex items-center gap-3 bg-rose-500 hover:bg-rose-400 text-white px-8 py-4 rounded-xl font-black transition-all shadow-lg hover:shadow-xl text-lg">
                  <Heart className="w-5 h-5" />
                  ethics@sono.news
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section> */}
    </div>
  );
}

