'use client';

import { useEffect, useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import {
  Map,
  Home,
  Newspaper,
  Video,
  Users,
  FolderOpen,
  FileText,
  Shield,
  Scale,
  Heart,
  ChevronLeft,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: { id: number; name: string; slug: string }[];
}

export default function SitemapPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await apiClient.getCategories();
      setCategories(data as Category[]);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const mainPages = [
    { name: 'الرئيسية', href: '/', icon: Home, description: 'الصفحة الرئيسية للموقع' },
    { name: 'المقالات', href: '/articles', icon: Newspaper, description: 'تصفح جميع المقالات الطبية' },
    { name: 'الفيديوهات', href: '/videos', icon: Video, description: 'مكتبة الفيديوهات التعليمية' },
    { name: 'من نحن', href: '/about-us', icon: Users, description: 'تعرف على فريق سونو' },
  ];

  const legalPages = [
    { name: 'سياسة الخصوصية', href: '/privacy-policy', icon: Shield, description: 'كيف نحمي بياناتك' },
    { name: 'شروط الاستخدام', href: '/terms-of-use', icon: Scale, description: 'شروط وأحكام استخدام الموقع' },
    { name: 'سياسة الأخلاقيات', href: '/ethics-policy', icon: Heart, description: 'معاييرنا الأخلاقية والتحريرية' },
  ];

  return (
    <div className="min-h-screen bg-soft-tint">
      {/* Hero Section */}
      <section className="hero-section relative pt-40 pb-24 overflow-hidden bg-[#0b121e]">
        <div className="hero-overlay absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b,transparent_40%)]"></div>
        <div className="hero-overlay absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>

        <div className="hero-orb absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-skyblue-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="hero-orb absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variant="fadeDown">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-12 h-1.5 bg-skyblue-500 rounded-full"></span>
                <span className="text-skyblue-400 font-black tracking-widest text-xs uppercase">
                  دليل الموقع
                </span>
                <span className="w-12 h-1.5 bg-skyblue-500 rounded-full"></span>
              </div>

              <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-skyblue-500/20 flex items-center justify-center border border-skyblue-500/30">
                <Map className="w-12 h-12 text-skyblue-400" />
              </div>

              <h1 className="headline-arabic text-5xl md:text-7xl text-white font-black mb-8 leading-none">
                خريطة{' '}
                <span className="text-skyblue-400">الموقع</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-medium">
                استكشف جميع صفحات وأقسام موقع سونو للوصول السريع إلى المحتوى الذي
                تبحث عنه.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Pages */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="headline-arabic text-3xl font-black text-navy-900 mb-4">
              الصفحات <span className="text-gold-500">الرئيسية</span>
            </h2>
            <div className="w-20 h-1.5 bg-navy-900 mx-auto rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {mainPages.map((page, index) => (
            <AnimatedSection key={page.href} delay={0.1 * index} variant="fadeUp">
              <Link
                href={page.href}
                className="bg-white rounded-2xl p-6 shadow-elegant border border-gray-100 hover:shadow-premium hover:border-gold-200 transition-all duration-300 block group h-full">
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-4 group-hover:bg-gold-500 transition-colors">
                  <page.icon className="w-6 h-6 text-gold-400 group-hover:text-navy-900 transition-colors" />
                </div>
                <h3 className="font-black text-navy-900 mb-2 flex items-center gap-2">
                  {page.name}
                  <ChevronLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-gray-500 text-sm">{page.description}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="headline-arabic text-3xl font-black text-navy-900 mb-4">
                الأقسام <span className="text-gold-500">والتصنيفات</span>
              </h2>
              <div className="w-20 h-1.5 bg-navy-900 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="text-center text-gray-500 py-12">جاري التحميل...</div>
          ) : categories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {categories.map((category, index) => (
                <AnimatedSection key={category.id} delay={0.1 * index} variant="fadeUp">
                  <div className="bg-soft-tint rounded-2xl p-6 shadow-elegant border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-gold-400" />
                      </div>
                      <Link
                        href={`/category/${category.slug}`}
                        className="font-black text-navy-900 hover:text-gold-600 transition-colors text-lg flex items-center gap-2">
                        {category.name}
                        <ExternalLink className="w-4 h-4 opacity-50" />
                      </Link>
                    </div>

                    {category.subcategories && category.subcategories.length > 0 && (
                      <ul className="space-y-2 mr-4 border-r-2 border-gray-200 pr-4">
                        {category.subcategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/category/${category.slug}/${sub.slug}`}
                              className="flex items-center gap-2 text-gray-600 hover:text-gold-600 transition-colors text-sm py-1">
                              <FileText className="w-4 h-4" />
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">لا توجد تصنيفات حالياً</div>
          )}
        </div>
      </section>

      {/* Legal Pages */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="headline-arabic text-3xl font-black text-navy-900 mb-4">
              الصفحات <span className="text-gold-500">القانونية</span>
            </h2>
            <div className="w-20 h-1.5 bg-navy-900 mx-auto rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {legalPages.map((page, index) => (
            <AnimatedSection key={page.href} delay={0.1 * index} variant="fadeUp">
              <Link
                href={page.href}
                className="bg-white rounded-2xl p-6 shadow-elegant border border-gray-100 hover:shadow-premium hover:border-gold-200 transition-all duration-300 block group text-center h-full">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-navy-900 transition-colors">
                  <page.icon className="w-7 h-7 text-gray-600 group-hover:text-gold-400 transition-colors" />
                </div>
                <h3 className="font-black text-navy-900 mb-2">{page.name}</h3>
                <p className="text-gray-500 text-sm">{page.description}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="container mx-auto px-4 pb-32">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="bg-navy-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-skyblue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>

              <div className="relative z-10 text-center">
                <h3 className="headline-arabic text-3xl font-black text-white mb-4">
                  لم تجد ما تبحث عنه؟
                </h3>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  يمكنك تصفح مقالاتنا الطبية أو التواصل معنا مباشرة للمساعدة.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/articles"
                    className="inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-navy-900 px-8 py-4 rounded-xl font-black transition-all shadow-lg hover:shadow-xl">
                    <Newspaper className="w-5 h-5" />
                    تصفح المقالات
                  </Link>
                  <Link
                    href="/about-us"
                    className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-black transition-all border border-white/20">
                    <Users className="w-5 h-5" />
                    تواصل معنا
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

