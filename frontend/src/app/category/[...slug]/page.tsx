import { apiClient } from '@/lib/api-client';
import { Article, Category } from '@/types';
import ArticleCard from '@/components/ui/ArticleCard';
import { notFound } from 'next/navigation';
import { FileText } from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

async function getCategoryData(slug: string) {
  try {
    const category = (await apiClient.getCategoryBySlug(slug)) as Category;
    const response = await apiClient.getArticles({
      status: 'published',
      categoryId: category.id,
    });
    return { category, articles: response.articles };
  } catch (error) {
    return null;
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) {
    notFound();
  }

  const { category, articles } = data;

  return (
    <div className="bg-gray-50/50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white rounded-3xl p-10 mb-12 shadow-premium relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-serif font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto font-light">
              تصفح جميع المقالات والأخبار المتعلقة بـ {category.name}
            </p>
          </div>
        </div>

        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-primary-900">
                الأقسام الفرعية
              </h2>
              <div className="h-px flex-grow bg-gray-200"></div>
            </div>

            <div className="flex flex-wrap gap-4">
              {category.subcategories?.map((sub) => (
                <a
                  key={sub.id}
                  href={`/category/${category.slug}/${sub.slug}`}
                  className="bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-200 px-8 py-3 rounded-xl font-medium text-gray-600 hover:text-primary-700 transition-all duration-300 shadow-sm hover:shadow-md">
                  {sub.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="h-full">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100/50">
            <FileText className="w-20 h-20 mx-auto mb-4 text-gray-200" />
            <p className="text-gray-900 text-xl font-medium mb-2">
              لا توجد مقالات في هذا القسم حالياً
            </p>
            <p className="text-gray-500">نعمل على إضافة محتوى جديد قريباً.</p>
          </div>
        )}
      </div>
    </div>
  );
}
