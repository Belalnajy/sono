'use client';

import { useEffect, useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import {
  Heart,
  Target,
  Award,
  Shield,
  Users,
  BookOpen,
  Video,
  Baby,
  Stethoscope,
  Leaf,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

export default function AboutUsPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const data = await apiClient.getTeamMembers();
      setTeamMembers(data as any[]);
    } catch (error) {
      console.error('Error loading team members:', error);
    }
  };

  return (
    <div className="min-h-screen bg-soft-tint">
      {/* Hero Section - Deep Navy Premium Design */}
      <section className="hero-section relative pt-40 pb-32 overflow-hidden bg-[#0b121e]">
        {/* Architectural Background Elements */}
        <div className="hero-overlay absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b,transparent_40%)]"></div>
        <div className="hero-overlay absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>

        {/* Animated Orbs */}
        <div className="hero-orb absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="hero-orb absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-skyblue-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variant="fadeDown">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-12 h-1.5 bg-gold-500 rounded-full"></span>
                <span className="text-gold-400 font-black tracking-widest text-xs uppercase">
                  من نحن
                </span>
                <span className="w-12 h-1.5 bg-gold-500 rounded-full"></span>
              </div>

              <h1 className="headline-arabic text-5xl md:text-7xl lg:text-8xl text-white font-black mb-8 leading-none">
                سونو -{' '}
                <span className="text-gold-500 underline decoration-white/10 decoration-8 underline-offset-12">
                  مستقبلك
                </span>{' '}
                الصحي
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-medium">
                سونو هو الكيان الطبي المصري الرائد، نجمع بين عراقة العلم الحديث
                ودقة المحتوى الموثق لنصحبك في رحلة واعية نحو حياة أفضل
              </p>

              <div className="flex items-center justify-center gap-6 mt-16">
                <div className="bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10">
                  <span className="block text-gold-500 font-black text-2xl mb-1">
                    +100K
                  </span>
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    قارئ شهري
                  </span>
                </div>
                <div className="bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10">
                  <span className="block text-skyblue-400 font-black text-2xl mb-1">
                    +50
                  </span>
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    خبير طبي
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section - Elegant White Card */}
      <section className="container mx-auto px-4 py-32 relative">
        <div className="absolute top-0 right-1/4 w-px h-64 bg-gradient-to-b from-gold-500/30 to-transparent"></div>

        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[3.5rem] shadow-premium p-10 md:p-20 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-[#0b121e] flex items-center justify-center shadow-2xl flex-shrink-0 rotate-3">
                  <Heart className="w-10 h-10 md:w-14 md:h-14 text-gold-500" />
                </div>
                <div>
                  <h2 className="headline-arabic text-4xl md:text-5xl text-navy-900 font-black mb-6">
                    قصتنا <span className="text-gold-500">العريقة</span>
                  </h2>
                  <div className="space-y-6 text-gray-600 leading-relaxed text-xl font-medium">
                    <p>
                      استلهمنا اسم{' '}
                      <span className="text-navy-900 font-black border-b-2 border-gold-200">
                        سونو
                      </span>{' '}
                      من الطبيب المصري القديم، رمز العلم والحكمة الخالدة.
                    </p>
                    <p>
                      في سونو، نحن لا ننشر مجرد مقالات، بل نبني جسراً من الثقة
                      بين المريض والمعلومة الطبية الصحيحة، معتمدين على نخبة من
                      الأطباء المتخصصين لنضمن لك أعلى معايير الدقة العلمية.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 p-8 md:p-12 bg-gray-50 rounded-[2.5rem] border border-gray-100 text-center relative group">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#BF9B50_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <p className="text-3xl md:text-4xl font-black text-navy-900 leading-tight relative z-10">
                  "المعلومة الطبية الدقيقة هي{' '}
                  <span className="text-gold-500 italic">السلاح الأول</span>{' '}
                  لحياة أكثر صحة"
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Vision & Mission - Symmetrical Grid */}
      <section className="bg-white py-32 border-y border-gray-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Vision */}
            <AnimatedSection delay={0.1} variant="fadeUp">
              <div className="bg-soft-tint rounded-[3rem] p-12 shadow-elegant hover:shadow-premium transition-all duration-500 border border-gray-100 group h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Target className="w-32 h-32 text-navy-900" />
                </div>
                <div className="w-20 h-20 rounded-2xl bg-navy-900 flex items-center justify-center mb-8 shadow-2xl group-hover:rotate-6 transition-transform">
                  <Target className="w-10 h-10 text-gold-500" />
                </div>
                <h3 className="headline-arabic text-3xl font-black text-navy-900 mb-6">
                  رؤيتنا
                </h3>
                <p className="text-gray-500 leading-relaxed text-xl font-medium">
                  نسعى لأن يكون سونو المرجع الصحي الأول والموثوق في منطقة الشرق
                  الأوسط، نضع معايير جديدة للوعي الطبي الرقمي ونساهم في بناء
                  مجتمع عربي يتمتع بالثقافة الصحية اللازمة للوقاية والنمو.
                </p>
              </div>
            </AnimatedSection>

            {/* Mission */}
            <AnimatedSection delay={0.2} variant="fadeUp">
              <div className="bg-soft-tint rounded-[3rem] p-12 shadow-elegant hover:shadow-premium transition-all duration-500 border border-gray-100 group h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Award className="w-32 h-32 text-navy-900" />
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gold-500 flex items-center justify-center mb-8 shadow-2xl group-hover:-rotate-6 transition-transform">
                  <Award className="w-10 h-10 text-navy-900" />
                </div>
                <h3 className="headline-arabic text-3xl font-black text-navy-900 mb-6">
                  رسالتنا
                </h3>
                <p className="text-gray-500 leading-relaxed text-xl font-medium">
                  تمكين القارئ العربي من خلال تقديم محتوى طبي احترافي، مبسط،
                  ومدعوم بالأدلة العلمية. نؤمن بمسؤوليتنا في مراجعة كل تفصيلة
                  طبية لنقدم لك الأمان والاطمئنان في كل معلومة تقرأها عبر
                  منصتنا.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Section - Premium Staggered Look */}
      {teamMembers.length > 0 && (
        <section className="bg-soft-tint py-32 relative">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-24 relative">
                <h2 className="headline-arabic text-4xl md:text-5xl font-black text-navy-900 mb-4">
                  عقول سونو <span className="text-gold-500">المبدعة</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6 font-medium">
                  نحن مجموعة من المتخصصين المتحمسين لنشر الوعي الصحي
                </p>
                <div className="w-24 h-1.5 bg-navy-900 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
                {teamMembers.map((member, index) => (
                  <AnimatedSection
                    key={member.id}
                    delay={0.1 * index}
                    variant="fadeUp">
                    <div className="group relative">
                      <div className="relative mb-8 overflow-hidden rounded-[2.5rem] aspect-[1/1.2] shadow-premium group-hover:shadow-glow-gold transition-all duration-500 border-4 border-white">
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b121e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Social Overlay Placeholder */}
                        <div className="absolute top-6 left-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 text-white hover:bg-gold-500 hover:text-navy-900 transition-colors cursor-pointer">
                            <Users className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-black text-navy-900 mb-2 group-hover:text-gold-500 transition-colors">
                          {member.name}
                        </h3>
                        {member.role && (
                          <span className="text-gold-600 text-xs font-black uppercase tracking-widest bg-gold-50 px-4 py-1.5 rounded-full border border-gold-100">
                            {member.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Important Notice - High Contrast Alert */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <div className="bg-navy-900 rounded-[3rem] p-10 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-red-500/10 transition-all"></div>

              <div className="flex flex-col md:flex-row items-start gap-10 relative z-10">
                <div className="w-20 h-20 rounded-[1.5rem] bg-red-500/20 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                  <Shield className="w-10 h-10 text-red-500 shadow-glow-red" />
                </div>
                <div>
                  <h3 className="headline-arabic text-3xl font-black text-white mb-6 flex items-center gap-4">
                    تنبيه <span className="text-red-500">قانوني</span> هام
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-xl font-medium">
                    المحتوى المنشور على سونو هو محتوى تعليمي وتثقيفي حصراً. لا
                    يمكن، بأي حال من الأحوال، اعتباره تشخيصاً طبياً أو وصفة
                    علاجية. نحن نحثك بشدة على استشارة طبيبك الخاص قبل اتخاذ أي
                    قرار يتعلق بصحتك الجسدية أو النفسية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Section - Cinematic Footer CTA */}
      <section className="bg-[#0b121e] text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[150px] -mr-[400px] -mt-[400px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-skyblue-500/5 rounded-full blur-[120px] -ml-[300px] -mb-[300px]"></div>

        <AnimatedSection>
          <div className="container mx-auto px-4 text-center relative z-10">
            <span className="text-gold-500 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
              ابدأ اليوم
            </span>
            <h2 className="headline-arabic text-4xl md:text-6xl font-black mb-10 leading-tight">
              كن جزءاً من <span className="text-gold-500">عالم</span> سونو الصحي
            </h2>
            <Link
              href="/articles"
              className="inline-flex items-center gap-4 bg-gold-500 hover:bg-white text-navy-900 px-12 py-6 rounded-2xl font-black transition-all shadow-glow-gold hover:shadow-2xl text-lg uppercase tracking-widest group">
              استكشف مكتبتنا الطبية
              <ArrowLeft className="w-6 h-6 rotate-180 group-hover:-translate-x-2 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
