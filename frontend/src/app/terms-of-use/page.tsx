'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import {
  ScrollText,
  Scale,
  FileCheck,
  AlertTriangle,
  Ban,
  Copyright,
  Users,
  Gavel,
  RefreshCw,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

export default function TermsOfUsePage() {
  const sections = [
    {
      icon: FileCheck,
      title: 'قبول الشروط',
      content:
        'باستخدامك لموقع سونو، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام الموقع. نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم نشر التعديلات على هذه الصفحة.',
    },
    {
      icon: ScrollText,
      title: 'طبيعة المحتوى',
      content:
        'جميع المحتويات المنشورة على سونو هي لأغراض تعليمية وتثقيفية فقط. لا يُعتبر أي محتوى على الموقع بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. يجب دائماً استشارة طبيب مختص قبل اتخاذ أي قرارات تتعلق بصحتك.',
    },
    {
      icon: AlertTriangle,
      title: 'إخلاء المسؤولية الطبية',
      content:
        'لا تتحمل سونو أي مسؤولية عن أي ضرر أو خسارة ناتجة عن استخدام المعلومات المنشورة على الموقع. المعلومات المقدمة ليست بديلاً عن الرعاية الطبية المهنية، ولا ينبغي استخدامها لتشخيص أو علاج أي حالة صحية دون إشراف طبي.',
    },
    {
      icon: Copyright,
      title: 'حقوق الملكية الفكرية',
      content:
        'جميع المحتويات المنشورة على سونو، بما في ذلك النصوص والصور والرسومات والشعارات، محمية بموجب قوانين حقوق النشر والملكية الفكرية. لا يجوز نسخ أو توزيع أو تعديل أي محتوى دون إذن كتابي مسبق من سونو.',
    },
    {
      icon: Ban,
      title: 'الاستخدام المحظور',
      items: [
        'استخدام الموقع بطريقة تنتهك أي قانون أو لائحة معمول بها.',
        'محاولة الوصول غير المصرح به إلى أنظمتنا أو بيانات المستخدمين.',
        'نشر محتوى مسيء أو تشهيري أو غير قانوني.',
        'استخدام الموقع لأغراض تجارية دون إذن.',
        'جمع بيانات المستخدمين بأي طريقة غير مصرح بها.',
        'التدخل في عمل الموقع أو الخوادم المرتبطة به.',
      ],
    },
    {
      icon: Users,
      title: 'حسابات المستخدمين',
      content:
        'عند إنشاء حساب على سونو، أنت مسؤول عن الحفاظ على سرية معلومات حسابك وعن جميع الأنشطة التي تحدث تحت حسابك. يجب إبلاغنا فوراً عن أي استخدام غير مصرح به لحسابك.',
    },
    {
      icon: MessageSquare,
      title: 'المحتوى الذي ينشره المستخدمون',
      content:
        'أنت مسؤول عن أي محتوى تنشره على الموقع. بنشرك لأي محتوى، فإنك تمنحنا ترخيصاً غير حصري لاستخدام هذا المحتوى. نحتفظ بالحق في إزالة أي محتوى نراه غير مناسب دون إشعار مسبق.',
    },
    {
      icon: Scale,
      title: 'تحديد المسؤولية',
      content:
        'إلى أقصى حد يسمح به القانون، لا تتحمل سونو أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام الموقع أو عدم القدرة على استخدامه.',
    },
    {
      icon: Gavel,
      title: 'القانون الحاكم',
      content:
        'تخضع هذه الشروط وتُفسر وفقاً لقوانين جمهورية مصر العربية. أي نزاع ينشأ عن استخدام الموقع يخضع للاختصاص القضائي الحصري للمحاكم المصرية.',
    },
    {
      icon: RefreshCw,
      title: 'التعديلات',
      content:
        'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستصبح التعديلات سارية فور نشرها على الموقع. استمرارك في استخدام الموقع بعد نشر التعديلات يعني موافقتك على الشروط المعدلة.',
    },
  ];

  return (
    <div className="min-h-screen bg-soft-tint">
      {/* Hero Section */}
      <section className="hero-section relative pt-40 pb-24 overflow-hidden bg-[#0b121e]">
        <div className="hero-overlay absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b,transparent_40%)]"></div>
        <div className="hero-overlay absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>

        <div className="hero-orb absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="hero-orb absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variant="fadeDown">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-12 h-1.5 bg-amber-500 rounded-full"></span>
                <span className="text-amber-400 font-black tracking-widest text-xs uppercase">
                  الإطار القانوني
                </span>
                <span className="w-12 h-1.5 bg-amber-500 rounded-full"></span>
              </div>

              <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                <Scale className="w-12 h-12 text-amber-400" />
              </div>

              <h1 className="headline-arabic text-5xl md:text-7xl text-white font-black mb-8 leading-none">
                شروط{' '}
                <span className="text-amber-400">الاستخدام</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-medium">
                يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام موقع سونو.
                باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط.
              </p>

              <div className="mt-8 text-gray-500 text-sm">
                آخر تحديث: يناير 2026
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <AnimatedSection key={index} delay={0.05 * index} variant="fadeUp">
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-elegant border border-gray-100 hover:shadow-premium transition-all duration-500 group">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform">
                    <section.icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="headline-arabic text-2xl font-black text-navy-900 mb-4">
                      {section.title}
                    </h3>
                    {section.content && (
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {section.content}
                      </p>
                    )}
                    {section.items && (
                      <ul className="space-y-3 mt-2">
                        {section.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-3 text-gray-600 leading-relaxed">
                            <span className="w-2 h-2 rounded-full bg-amber-500 mt-2.5 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Important Notice */}
      <section className="container mx-auto px-4 pb-32">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
                <h3 className="headline-arabic text-3xl font-black text-white mb-4">
                  ملاحظة هامة
                </h3>
                <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                  باستخدامك لموقع سونو، فإنك تقر بأنك قرأت وفهمت هذه الشروط
                  والأحكام وتوافق على الالتزام بها. إذا كانت لديك أي أسئلة، يرجى
                  التواصل معنا قبل استخدام الموقع.
                </p>
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-amber-600 px-8 py-4 rounded-xl font-black transition-all shadow-lg hover:shadow-xl text-lg mt-8">
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

