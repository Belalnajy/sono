import ArticleCard from '@/components/ui/ArticleCard';
import { apiClient } from '@/lib/api-client';
import { Article } from '@/types';
import { ArrowLeft, Filter, Search, X } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Pagination from '@/components/ui/Pagination';

async function getArticles(params: {
  status?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
  search?: string;
}) {
  try {
    return await apiClient.getArticles(params);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { articles: [], total: 0 };
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

export default async function AllArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>;
}) {
  const { search, category: categorySlug, page } = await searchParams;
  const currentPage = parseInt(page || '1');
  const limit = 12;
  const searchQuery = search || '';

  const categories = await getCategories();

  // Find category ID if slug is provided
  let categoryId = undefined;
  let activeCategoryName = 'الكل';

  if (categorySlug) {
    const category = categories.find((c) => c.slug === categorySlug);
    if (category) {
      categoryId = category.id;
      activeCategoryName = category.name;
    }
  }

  const { articles, total } = await getArticles({
    status: 'published',
    categoryId,
    page: currentPage,
    limit: limit,
    search: searchQuery,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen">
      {/* Hero Header - Deep Navy Premium Design */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#0b121e]">
        {/* Architectural Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b,transparent_40%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>

        {/* Animated Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variant="fadeDown">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gold-500 hover:text-white mb-8 transition-all group font-bold px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform rotate-180" />
                العودة للرئيسية
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-1.5 bg-gold-500 rounded-full"></span>
                <span className="text-gold-400 font-black tracking-widest text-xs uppercase">
                  المكتبة الرقمية
                </span>
              </div>

              <h1 className="headline-arabic text-5xl md:text-6xl lg:text-7xl text-white font-black mb-6 leading-none">
                {categorySlug ? activeCategoryName : 'جميع'}{' '}
                <span className="text-gold-500 underline decoration-white/10 decoration-8 underline-offset-12">
                  المقالات
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed font-medium">
                تصفح مكتبتنا الشاملة من المقالات والأبحاث الطبية المتخصصة
                والموثقة من قبل أهم الخبراء
              </p>

              <div className="flex items-center gap-6 mt-12">
                <div className="bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 flex flex-col items-center">
                  <span className="font-black text-3xl text-gold-500">
                    {total}
                  </span>
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">
                    مقال منشور
                  </span>
                </div>
                <div className="bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 flex flex-col items-center">
                  <span className="font-black text-3xl text-skyblue-400">
                    {categories.length}
                  </span>
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">
                    تخصص طبي
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories Filter - Enhanced Sticky Design */}
      <section className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-16 md:top-20 z-30 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 text-navy-900 font-bold whitespace-nowrap">
              <Filter className="w-5 h-5 text-gold-500" />
              <span className="text-sm">تصفية حسب:</span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/articles"
                className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                  !categorySlug
                    ? 'bg-gold-500 text-navy-900 shadow-glow-gold scale-105'
                    : 'bg-gray-50 text-navy-900 hover:bg-gold-500 hover:text-white border border-gray-100/50'
                }`}>
                الكل
              </Link>

              {categories.map((cat) => {
                const isActive = categorySlug === cat.slug;
                return (
                  <Link
                    key={cat.id}
                    href={`/articles?category=${cat.slug}`}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap border ${
                      isActive
                        ? 'bg-gold-500 text-navy-900 border-gold-400 shadow-glow-gold scale-105'
                        : 'bg-gray-50 text-navy-900 border-gray-100/50 hover:bg-gold-500 hover:text-white'
                    }`}>
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid - Premium Staggered Layout */}
      <section className="container mx-auto px-4 py-24 relative">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-gold-500/20 via-transparent to-transparent"></div>

        {searchQuery && (
          <AnimatedSection className="mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-premium border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium mb-1">
                  نتائج البحث عن:
                </p>
                <h4 className="headline-arabic text-2xl text-navy-900">
                  <span className="text-gold-500 font-black">
                    "{searchQuery}"
                  </span>
                  <span className="text-gray-400 text-lg mr-4">
                    ({total} مقال)
                  </span>
                </h4>
              </div>
              <Link
                href="/articles"
                className="flex items-center gap-2 bg-gray-50 hover:bg-gold-50 text-navy-900 px-6 py-3 rounded-2xl transition-all border border-gray-100 font-bold">
                <X className="w-4 h-4 text-gold-600" />
                إلغاء البحث
              </Link>
            </div>
          </AnimatedSection>
        )}

        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {articles.map((article: Article, index: number) => (
                <AnimatedSection
                  key={article.id}
                  delay={index * 0.05}
                  variant="fadeUp">
                  <ArticleCard article={article} />
                </AnimatedSection>
              ))}
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-premium border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#BF9B50_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="w-24 h-24 mx-auto mb-8 rounded-[2rem] bg-gray-50 flex items-center justify-center border border-gray-100">
              <Search className="w-10 h-10 text-gold-500" />
            </div>
            <h3 className="headline-arabic text-3xl text-navy-900 mb-4 font-black">
              لم نجد أي مقالات متطابقة
            </h3>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
              حاول البحث بكلمات مفتاحية أخرى أو تصفح الأقسام الرئيسية للمدونة
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center gap-3 bg-gold-500 hover:bg-navy-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-glow-gold hover:shadow-2xl">
              عرض جميع المقالات
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
