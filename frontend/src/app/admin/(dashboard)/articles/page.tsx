'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import {
  Plus,
  Edit,
  Trash2,
  ArrowRight,
  LayoutDashboard,
  FileText,
  Star,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

export default function ArticlesManagement() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await apiClient.getArticles({ limit: 100 });
      setArticles(response.articles);
    } catch (error) {
      console.error('Error loading articles:', error);
      toast.error('فشل تحميل المقالات');
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (article: any) => {
    try {
      await apiClient.updateArticle(article.id, {
        is_featured: !article.is_featured,
      });
      toast.success(
        article.is_featured ? 'تم إزالة التمييز' : 'تم تمييز المقال'
      );
      loadArticles();
    } catch (error: any) {
      toast.error('فشل تحديث حالة التمييز: ' + error.message);
    }
  };

  const confirmDelete = (id: string) => {
    setArticleToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!articleToDelete) return;

    try {
      await apiClient.deleteArticle(articleToDelete);
      toast.success('تم حذف المقال بنجاح');
      setDeleteModalOpen(false);
      setArticleToDelete(null);
      loadArticles();
    } catch (error: any) {
      toast.error('فشل حذف المقال: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-elegant">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setArticleToDelete(null);
        }}
        onConfirm={handleDelete}
        title="حذف المقال"
        message="هل أنت متأكد من رغبتك في حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء."
      />

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Actions Bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Link
              href="/admin/dashboard"
              className="hover:text-primary-600 transition-colors flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" />
              لوحة التحكم
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">المقالات</span>
          </div>

          <Link
            href="/admin/articles/new"
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl transition font-medium shadow-lg hover:shadow-accent-500/30 border border-accent-400 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>إضافة مقال جديد</span>
          </Link>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-2xl shadow-elegant border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                    العنوان
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                    القسم
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                    مميز
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                    تاريخ النشر
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {article.image_url && (
                          <img
                            src={article.image_url}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover ml-3 shadow-sm border border-gray-200"
                          />
                        )}
                        <span className="text-gray-900 font-medium">
                          {article.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                      <span className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full">
                        {article.category?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(article)}
                        className={`p-2 rounded-lg transition-colors ${
                          article.is_featured
                            ? 'text-gold-600 bg-gold-50 hover:bg-gold-100'
                            : 'text-gray-300 hover:bg-gray-100 hover:text-gray-500'
                        }`}
                        title={
                          article.is_featured
                            ? 'إزالة من المميزة'
                            : 'إضافة إلى المميزة'
                        }>
                        <Star
                          className={`w-5 h-5 ${
                            article.is_featured ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          article.status === 'published'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                        {article.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {new Date(
                        article.published_at || article.created_at
                      ).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="تعديل">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => confirmDelete(article.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="حذف">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {articles.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="font-medium">لا توجد مقالات</p>
              <p className="text-sm mt-1">ابدأ بإضافة مقالاتك الأولى</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
