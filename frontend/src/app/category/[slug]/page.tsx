'use client';

import { useEffect, useState, use } from 'react';
import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';
import ArticleCard from '@/components/ui/ArticleCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [category, setCategory] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const catData = (await apiClient.getCategoryBySlug(slug)) as any;
        setCategory(catData);

        if (catData && catData.id) {
          const response = await apiClient.getArticles({
            categoryId: catData.id,
          });
          setArticles(response.articles);
        }
      } catch (error) {
        console.error('Failed to load category data', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b121e]">
        <div className="w-16 h-16 border-4 border-gold-500 rounded-full animate-spin border-t-transparent shadow-glow-gold"></div>
      </div>
    );
  }

  if (!category) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Category Hero - Deep Navy Premium Design */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#0b121e]">
        {/* Architectural Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b,transparent_40%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>

        {/* Animated Orbs */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variant="fadeDown">
            <div className="max-w-3xl">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-gold-500 hover:text-white mb-8 transition-all group font-bold px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform rotate-180" />
                تصفح جميع الأقسام
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-1.5 bg-gold-500 rounded-full"></span>
                <span className="text-gold-400 font-black tracking-widest text-xs uppercase">
                  قسم التخصصات
                </span>
              </div>

              <h1 className="headline-arabic text-5xl md:text-6xl lg:text-7xl text-white font-black mb-6 leading-none">
                {category.name}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed font-medium">
                استكشف أحدث المقالات والأبحاث الطبية المتخصصة في قسم{' '}
                {category.name} والموثقة من قبل الخبراء
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="container mx-auto px-4 py-24 relative">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-gold-500/20 via-transparent to-transparent"></div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any, index: number) => (
              <AnimatedSection
                key={article.id}
                delay={index * 0.1}
                variant="fadeUp">
                <ArticleCard article={article} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[3rem] shadow-premium border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#BF9B50_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="w-24 h-24 mx-auto mb-8 rounded-[2rem] bg-gray-50 flex items-center justify-center border border-gray-100">
              <BookOpen className="w-10 h-10 text-gold-500" />
            </div>
            <h3 className="headline-arabic text-3xl text-navy-900 mb-4 font-black">
              لا توجد مقالات في هذا القسم حالياً
            </h3>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
              نقوم حالياً بتجهيز أحدث الأبحاث والدراسات في هذا القسم، ابقَ على
              اطلاع!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gold-500 hover:bg-navy-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-glow-gold hover:shadow-2xl">
              العودة للرئيسية
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
