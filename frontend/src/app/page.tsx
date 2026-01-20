import ArticleCard from '@/components/ui/ArticleCard';
import { apiClient } from '@/lib/api-client';
import { Article } from '@/types';
import { log } from 'console';
import { ArrowLeft, Clock, User, TrendingUp, Bookmark } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

async function getArticles() {
  try {
    const response = await apiClient.getArticles({
      status: 'published',
      limit: 20,
    });
    return response.articles as Article[];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await apiClient.getCategories();
    return categories as any[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

import HeroSlider from '@/components/ui/HeroSlider';

// ... existing imports ...

export default async function HomePage() {
  const articles = await getArticles();
  const categories = await getCategories();

  // Get featured articles
  let featuredArticles = articles.filter((a) => a.is_featured);

  // Fallback if none marked as featured
  if (featuredArticles.length === 0) {
    featuredArticles = articles.slice(0, 5);
  }

  // Slider takes top 5 featured
  const sliderArticles = featuredArticles.slice(0, 5);
  // Secondary featured takes next 2 featured or next from general if not enough
  const secondaryFeatured =
    featuredArticles.length > 5
      ? featuredArticles.slice(5, 7)
      : articles.filter((a) => !sliderArticles.includes(a)).slice(0, 2);

  // Latest takes the rest
  const latestArticles = articles.slice(0, 12);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Deep Navy Premium Overhaul */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-[#0b121e]">
        {/* Architectural Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b,transparent_40%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>

        {/* Animated Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-skyblue-500/10 rounded-full blur-[120px] -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Trending Today Ticker - Seamless Dark Design */}
          <AnimatedSection delay={0.1} className="mb-10">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-1 pr-4 flex items-center gap-4 overflow-hidden shadow-2xl border border-white/10 group ring-1 ring-white/5 mt-10">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center shadow-glow-gold">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-gold-400 font-bold text-sm whitespace-nowrap">
                  عاجل:
                </span>
              </div>
              <div className="flex-1 overflow-hidden h-6">
                <div className="animate-slide-left whitespace-nowrap inline-flex gap-12 items-center h-full">
                  {sliderArticles.map((article, i) => (
                    <Link
                      key={article.id}
                      href={`/article/${article.slug}`}
                      className="text-gray-300 hover:text-gold-400 text-sm font-medium transition-colors flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold-500/40"></span>
                      {article.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Bento Grid Header - Premium Contrast */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-1.5 bg-gold-500 rounded-full"></span>
                <span className="text-gold-400 font-black tracking-widest text-xs uppercase">
                  إصدار خاص - مختارات اليوم
                </span>
              </div>
              <h1 className="headline-arabic text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight">
                التغطية{' '}
                <span className="text-gold-500 underline decoration-white/10 decoration-8 underline-offset-12">
                  الحصرية
                </span>
              </h1>
            </div>
            <Link
              href="/articles"
              className="flex items-center gap-3 bg-white/5 hover:bg-gold-500 text-white hover:text-navy-900 px-8 py-4 rounded-2xl font-bold transition-all border border-white/10 hover:border-gold-400 group self-start md:self-auto shadow-2xl backdrop-blur-md">
              الأرشيف الكامل
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180" />
            </Link>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[750px]">
            {/* Primary Area: Hero Slider */}
            <div className="lg:col-span-8 h-[500px] lg:h-full">
              <div className="h-full rounded-[2.5rem] overflow-hidden shadow-premium group">
                <HeroSlider articles={sliderArticles} />
              </div>
            </div>

            {/* Secondary Area: Featured Stack */}
            <div className="lg:col-span-4 flex flex-col gap-8 h-full">
              {secondaryFeatured.map((article, idx) => (
                <AnimatedSection
                  key={article.id}
                  delay={0.3 + idx * 0.1}
                  className="flex-1">
                  <Link
                    href={`/article/${article.slug}`}
                    className="block h-full">
                    <div className="group relative h-full rounded-[2.5rem] overflow-hidden shadow-medical hover:shadow-premium transition-all duration-700 bg-white border border-gray-100">
                      {/* Image Layer */}
                      <div className="absolute inset-0">
                        <img
                          src={
                            article.thumbnail_url || '/placeholder-medical.jpg'
                          }
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent group-hover:via-navy-900/60 transition-all duration-500"></div>
                      </div>

                      {/* Content Layer */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="bg-gold-500/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider mb-3 inline-block">
                            {article.category.name}
                          </span>
                          <h4 className="headline-arabic text-2xl text-white font-bold leading-tight group-hover:text-gold-200 transition-colors">
                            {article.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                          <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(article.created_at).toLocaleDateString(
                                'ar-EG',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:border-gold-400 transition-all duration-300">
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Medical News - Clean Light Theme on Tinted Background */}
      <section className="container mx-auto px-4 py-24">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-1 bg-gold-500 rounded-full"></span>
                <h2 className="headline-arabic text-4xl text-navy-900">
                  أحدث الأخبار الطبية
                </h2>
              </div>
              <p className="text-gray-500 mr-10 font-medium">
                مواكبة مستمرة لأهم المستجدات والأبحاث
              </p>
            </div>
            <Link
              href="/articles"
              className="hidden md:flex items-center gap-2 text-navy-700 hover:text-gold-600 font-bold transition-all group px-4 py-2 rounded-xl hover:bg-gold-50">
              عرض جميع المقالات
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {latestArticles.map((article, index) => (
              <article
                key={article.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-elegant hover:shadow-premium transition-all duration-500 border border-gray-100/50 hover:border-gold-200/50 relative">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={article.thumbnail_url || '/placeholder-medical.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10">
                      {article.category.name}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {new Date(article.created_at).toLocaleDateString(
                        'ar-EG',
                        { month: 'long', day: 'numeric', year: 'numeric' }
                      )}
                    </span>
                  </div>

                  <h3 className="headline-arabic text-xl text-navy-900 mb-4 leading-snug font-bold line-clamp-2 group-hover:text-gold-600 transition-colors">
                    <Link href={`/article/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                    {article.content.replace(/<[^>]*>/g, '').substring(0, 100) +
                      '...'}
                  </p>

                  <Link
                    href={`/article/${article.slug}`}
                    className="inline-flex items-center gap-2 text-navy-900 hover:text-gold-600 font-black text-xs uppercase tracking-widest transition-all group/link underline decoration-gold-200 underline-offset-8 hover:decoration-gold-500 hover:gap-3">
                    اقرأ المقال
                    <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform rotate-180" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl shadow-elegant border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="headline-arabic text-2xl text-navy-900 mb-2">
                لا توجد مقالات منشورة بعد
              </h3>
              <p className="text-gray-500 mb-6">
                تحقق مرة أخرى قريبًا للحصول على أحدث الأخبار والأبحاث الطبية
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                الوصول إلى لوحة الإدارة
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          )}
        </AnimatedSection>
      </section>

      {/* Categories Section - Deep Navy Footer Section Transition */}
      <section className="bg-navy-900 py-32 relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#BF9B50_1px,transparent_1px)] [background-size:40px_40px]"></div>

        <AnimatedSection className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              مجموعتنا الطبية
            </div>
            <h2 className="headline-arabic text-4xl md:text-5xl text-white mb-6">
              تصفح حسب <span className="text-gold-500">التخصص</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              استكشف تغطيتنا الشاملة عبر التخصصات والموضوعات الطبية الأكثر دقة
              وأهمية
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative overflow-hidden bg-white/5 hover:bg-gold-500 p-8 rounded-[2rem] text-center transition-all duration-500 border border-white/10 hover:border-gold-400 shadow-2xl backdrop-blur-sm">
                <div className="relative z-10">
                  <h3 className="font-bold text-xl text-white group-hover:text-navy-900 transition-colors mb-2 headline-arabic">
                    {cat.name}
                  </h3>
                  <div className="w-8 h-1 bg-gold-500/30 group-hover:bg-navy-900/30 mx-auto rounded-full transition-colors mb-3"></div>
                  <p className="text-xs text-gray-400 group-hover:text-navy-900/70 transition-colors font-medium">
                    استكشف المحتوى
                  </p>
                </div>

                {/* Decorative Icon or Element */}
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gold-400/5 rounded-full group-hover:scale-[2] group-hover:bg-navy-900/10 transition-all duration-700"></div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
