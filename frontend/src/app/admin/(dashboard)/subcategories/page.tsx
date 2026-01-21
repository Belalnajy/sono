'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import {
  Plus,
  Edit,
  Trash2,
  LayoutDashboard,
  Folder,
  X,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

export default function SubCategoriesManagement() {
  const router = useRouter();
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]); // For parent selector
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categoryId: '',
  });
  const [loading, setLoading] = useState(true);

  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subToDelete, setSubToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subsData, catsData] = await Promise.all([
        apiClient.getSubcategories(),
        apiClient.getCategories(),
      ]);
      setSubcategories(subsData as any[]);
      setCategories(catsData as any[]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      toast.error('يرجى اختيار القسم الرئيسي');
      return;
    }

    try {
      await apiClient.createSubcategory(formData);
      setShowAddModal(false);
      setFormData({ name: '', slug: '', categoryId: '' });
      toast.success('تم إضافة القسم الفرعي بنجاح');
      loadData(); // Reload to refresh list
    } catch (error: any) {
      toast.error('فشل إضافة القسم الفرعي: ' + error.message);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.updateSubcategory(currentSubcategory.id, formData);
      setShowEditModal(false);
      setCurrentSubcategory(null);
      setFormData({ name: '', slug: '', categoryId: '' });
      toast.success('تم تعديل القسم الفرعي بنجاح');
      loadData();
    } catch (error: any) {
      toast.error('فشل تعديل القسم الفرعي: ' + error.message);
    }
  };

  const confirmDelete = (id: string) => {
    setSubToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!subToDelete) return;

    try {
      await apiClient.deleteSubcategory(subToDelete);
      toast.success('تم حذف القسم الفرعي بنجاح');
      setDeleteModalOpen(false);
      setSubToDelete(null);
      loadData();
    } catch (error: any) {
      toast.error('فشل حذف القسم الفرعي: ' + error.message);
    }
  };

  const openEditModal = (sub: any) => {
    setCurrentSubcategory(sub);
    setFormData({
      name: sub.name,
      slug: sub.slug,
      categoryId: sub.category?.id || '',
    });
    setShowEditModal(true);
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
          setSubToDelete(null);
        }}
        onConfirm={handleDelete}
        title="حذف القسم الفرعي"
        message="هل أنت متأكد من رغبتك في حذف هذا القسم الفرعي؟"
      />

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Actions Bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Link
              href="/admin/dashboard"
              className="hover:text-primary-600 transition-colors flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" />
              لوحة التحكم
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">الأقسام الفرعية</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl transition font-medium shadow-lg hover:shadow-accent-500/30 border border-accent-400 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>إضافة قسم فرعي</span>
          </button>
        </div>

        {/* Subcategories Grid/Table */}
        <div className="bg-white rounded-2xl shadow-elegant border border-gray-100 overflow-hidden">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">الاسم</th>
                <th className="px-6 py-4 font-medium">القسم الرئيسي</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subcategories.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <Folder className="w-4 h-4" />
                    </div>
                    {sub.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium border border-gray-200">
                      {sub.category?.name || '---'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                    {sub.slug}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(sub)}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        title="تعديل">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(sub.id)}
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
          {subcategories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">لا توجد أقسام فرعية</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-down">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                إضافة قسم فرعي جديد
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم القسم الفرعي
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: !formData.slug
                        ? generateSlug(e.target.value)
                        : formData.slug,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  القسم الرئيسي
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-right"
                  required>
                  <option value="">اختر القسم الرئيسي</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary-600/20">
                  حفظ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ name: '', slug: '', categoryId: '' });
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-colors">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-down">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                تعديل القسم الفرعي
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم القسم الفرعي
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  القسم الرئيسي
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-right"
                  required>
                  <option value="">اختر القسم الرئيسي</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary-600/20">
                  حفظ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setCurrentSubcategory(null);
                    setFormData({ name: '', slug: '', categoryId: '' });
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-colors">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
