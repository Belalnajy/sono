'use client';

import { useEffect, useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default function SubCategoryPage({
  params,
}: {
  params: Promise<{ slug: string; subCategory: string }>;
}) {
  const { slug, subCategory } = use(params);
  const [category, setCategory] = useState<any>(null);
  const [subcategory, setSubcategory] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Fetch Parent Category (for breadcrumbs mostly, maybe ID validation)
        const catData = (await apiClient.getCategoryBySlug(slug)) as any;
        setCategory(catData);

        // Fetch Subcategory by ID (need to resolve slug first) or just by slug if we trust it unique enough
        const subData = (await apiClient.getSubcategoryBySlug(
          subCategory,
        )) as any;
        setSubcategory(subData);

        if (subData && subData.id) {
          const response = await apiClient.getArticles({
            subcategoryId: subData.id,
          });
          setArticles(response.articles);
        }
      } catch (error) {
        console.error('Failed to load subcategory data', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug, subCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (!subcategory) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gold-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <Link
          href={`/category/${slug}`}
          className="hover:text-gold-600 transition-colors">
          {category?.name || slug}
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-navy-900 font-semibold">{subcategory.name}</span>
      </div>

      <div className="mb-10">
        <h1 className="headline-arabic text-3xl text-navy-900 mb-3 font-bold">
          {subcategory.name}
        </h1>
        <p className="text-lg text-gray-600 border-r-4 border-gold-400 pr-4">
          أهم المقالات والنصائح والارشادات المتعلقة بـ {subcategory.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter Placeholder - Can make dynamic later */}
        <div className="hidden lg:block col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-medical border border-gray-100 sticky top-24 space-y-6">
            {/* Related Subcategories */}
            {category && (
              <div>
                <h3 className="font-bold text-navy-900 mb-4 text-lg flex items-center gap-2">
                  <span className="w-1 h-6 bg-gold-500 rounded-full"></span>
                  أقسام فرعية أخرى
                </h3>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/category/${slug}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 cursor-pointer transition-all p-2 rounded-lg group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 group-hover:scale-125 transition-transform"></span>
                    <span className="font-medium">عرض كل {category.name}</span>
                  </Link>
                  {/* Note: We'd need to fetch other subcategories from the API to display them here */}
                  {/* For now, showing a link back to parent category */}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="pt-6 border-t border-gray-100">
              <div className="bg-gradient-to-br from-gold-50 to-skyblue-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-gold-600 font-bold text-lg">
                      {articles.length}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">مقالات متاحة</p>
                    <p className="text-xs text-gray-500">في هذا القسم</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Articles */}
            {articles.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-bold text-navy-900 mb-4 text-lg flex items-center gap-2">
                  <span className="w-1 h-6 bg-skyblue-400 rounded-full"></span>
                  مقالات مميزة
                </h3>
                <div className="flex flex-col gap-3">
                  {articles.slice(0, 3).map((article: any) => (
                    <Link
                      key={article.id}
                      href={`/article/${article.slug}`}
                      className="group flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-all">
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        {article.thumbnail_url ? (
                          <img
                            src={article.thumbnail_url}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <span className="text-xs">IMG</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-gold-600 transition-colors line-clamp-2 leading-snug mb-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {new Date(
                            article.created_at || Date.now(),
                          ).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-1 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.length > 0 ? (
              articles.map((article: any) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="block h-full">
                  <div
                    key={article.id}
                    className="bg-white rounded-xl shadow-medical overflow-hidden hover:shadow-premium transition-all group flex flex-col h-full border border-gray-100">
                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                      {article.thumbnail_url ? (
                        <img
                          src={article.thumbnail_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                          صورة توضيحية
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
                        {article.title}
                      </h3>
                      <div
                        className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1"
                        dangerouslySetInnerHTML={{
                          __html: article.content
                            ? article.content.substring(0, 100) + '...'
                            : '',
                        }}
                      />
                      <span className="text-gold-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                        اقرأ المزيد <span className="text-lg">←</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">
                  لا توجد مقالات في هذا القسم الفرعي حالياً.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
