'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import {
  Shield,
  Eye,
  Database,
  Lock,
  UserCheck,
  Cookie,
  Mail,
  Globe,
  Server,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: 'المعلومات التي نجمعها',
      content: [
        'معلومات التعريف الشخصية: الاسم، البريد الإلكتروني، رقم الهاتف عند التسجيل أو التواصل معنا.',
        'معلومات الاستخدام: عنوان IP، نوع المتصفح، الصفحات المزارة، وقت الزيارة.',
        'ملفات تعريف الارتباط (Cookies): لتحسين تجربة التصفح وتذكر تفضيلاتك.',
        'المعلومات التقنية: نظام التشغيل، دقة الشاشة، ومعلومات الجهاز.',
      ],
    },
    {
      icon: Eye,
      title: 'كيف نستخدم معلوماتك',
      content: [
        'تقديم وتحسين خدماتنا ومحتوانا الطبي.',
        'إرسال التحديثات والنشرات الإخبارية (بموافقتك).',
        'تحليل أنماط الاستخدام لتطوير الموقع.',
        'الرد على استفساراتك وتقديم الدعم الفني.',
        'ضمان أمان الموقع ومنع الاحتيال.',
      ],
    },
    {
      icon: Lock,
      title: 'حماية معلوماتك',
      content: [
        'نستخدم تشفير SSL/TLS لحماية البيانات المنقولة.',
        'نخزن البيانات في خوادم آمنة مع حماية متعددة الطبقات.',
        'نقيد الوصول إلى البيانات الشخصية للموظفين المصرح لهم فقط.',
        'نجري مراجعات أمنية دورية لأنظمتنا.',
      ],
    },
    {
      icon: UserCheck,
      title: 'حقوقك',
      content: [
        'الوصول إلى بياناتك الشخصية ومعرفة كيفية استخدامها.',
        'طلب تصحيح أو تحديث بياناتك الشخصية.',
        'طلب حذف بياناتك من أنظمتنا.',
        'سحب موافقتك على معالجة البيانات في أي وقت.',
        'الاعتراض على معالجة بياناتك لأغراض تسويقية.',
      ],
    },
    {
      icon: Cookie,
      title: 'ملفات تعريف الارتباط',
      content: [
        'نستخدم ملفات تعريف الارتباط الضرورية لتشغيل الموقع.',
        'ملفات التحليلات لفهم كيفية استخدام الزوار للموقع.',
        'يمكنك إدارة تفضيلات ملفات تعريف الارتباط من إعدادات متصفحك.',
        'تعطيل بعض الملفات قد يؤثر على وظائف الموقع.',
      ],
    },
    {
      icon: Globe,
      title: 'مشاركة المعلومات',
      content: [
        'لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة.',
        'قد نشارك البيانات مع مزودي الخدمات الموثوقين لتشغيل الموقع.',
        'قد نفصح عن المعلومات إذا طُلب منا ذلك قانونياً.',
        'في حالة الاندماج أو الاستحواذ، قد تُنقل البيانات للكيان الجديد.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-soft-tint">
      {/* Hero Section */}
      <section className="hero-section relative pt-40 pb-24 overflow-hidden bg-[#0b121e]">
        <div className="hero-overlay absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b,transparent_40%)]"></div>
        <div className="hero-overlay absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>

        <div className="hero-orb absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="hero-orb absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variant="fadeDown">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-12 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-emerald-400 font-black tracking-widest text-xs uppercase">
                  حماية بياناتك
                </span>
                <span className="w-12 h-1.5 bg-emerald-500 rounded-full"></span>
              </div>

              <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <Shield className="w-12 h-12 text-emerald-400" />
              </div>

              <h1 className="headline-arabic text-5xl md:text-7xl text-white font-black mb-8 leading-none">
                سياسة{' '}
                <span className="text-emerald-400">الخصوصية</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-medium">
                نحن في سونو نلتزم بحماية خصوصيتك وبياناتك الشخصية. تشرح هذه
                السياسة كيف نجمع ونستخدم ونحمي معلوماتك.
              </p>

              <div className="mt-8 text-gray-500 text-sm">
                آخر تحديث: يناير 2026
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-premium p-10 md:p-16 border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="headline-arabic text-3xl font-black text-navy-900 mb-4">
                    مقدمة
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    مرحباً بك في سونو. نحن نقدر ثقتك بنا ونلتزم بحماية خصوصيتك.
                    تصف سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات
                    الشخصية التي تقدمها عند استخدام موقعنا. باستخدامك لموقعنا،
                    فإنك توافق على الممارسات الموضحة في هذه السياسة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Policy Sections */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <AnimatedSection key={index} delay={0.1 * index} variant="fadeUp">
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-elegant border border-gray-100 hover:shadow-premium transition-all duration-500 group">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform">
                    <section.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="headline-arabic text-2xl font-black text-navy-900 mb-6">
                      {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="container mx-auto px-4 pb-32">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="bg-navy-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Mail className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="headline-arabic text-3xl font-black text-white mb-4">
                  تواصل معنا
                </h3>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  إذا كانت لديك أي أسئلة حول سياسة الخصوصية أو ترغب في ممارسة
                  حقوقك المتعلقة ببياناتك الشخصية، يرجى التواصل معنا:
                </p>
                <a
                  href="mailto:privacy@sono.news"
                  className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-navy-900 px-8 py-4 rounded-xl font-black transition-all shadow-lg hover:shadow-xl text-lg">
                  <Mail className="w-5 h-5" />
                  privacy@sono.news
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section> */}
    </div>
  );
}

