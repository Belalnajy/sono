'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import {
  Plus,
  Trash2,
  ArrowRight,
  LayoutDashboard,
  Video as VideoIcon,
  X,
  Smartphone,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

export default function VideosManagement() {
  const router = useRouter();
  const [videos, setVideos] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    categoryId: '',
    subcategoryId: '',
  });
  const [loading, setLoading] = useState(true);

  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [videosData, categoriesData] = await Promise.all([
        apiClient.getVideos(),
        apiClient.getCategories(),
      ]);
      setVideos(videosData as any[]);
      setCategories(categoriesData as any[]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createVideo({
        ...formData,
        subcategoryId: formData.subcategoryId || undefined,
      });
      setShowAddModal(false);
      setFormData({
        title: '',
        description: '',
        video_url: '',
        categoryId: '',
        subcategoryId: '',
      });
      toast.success('تم إضافة الفيديو بنجاح');
      loadData();
    } catch (error: any) {
      toast.error('فشل إضافة الفيديو: ' + error.message);
    }
  };

  const confirmDelete = (id: string) => {
    setVideoToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!videoToDelete) return;

    try {
      await apiClient.deleteVideo(videoToDelete);
      toast.success('تم حذف الفيديو بنجاح');
      setDeleteModalOpen(false);
      setVideoToDelete(null);
      loadData();
    } catch (error: any) {
      toast.error('فشل حذف الفيديو: ' + error.message);
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
          setVideoToDelete(null);
        }}
        onConfirm={handleDelete}
        title="حذف الفيديو"
        message="هل أنت متأكد من رغبتك في حذف هذا الفيديو؟ لا يمكن التراجع عن هذا الإجراء."
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
            <span className="text-gray-900 font-medium">الفيديوهات</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl transition font-medium shadow-lg hover:shadow-accent-500/30 border border-accent-400 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>إضافة فيديو جديد</span>
          </button>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl shadow-elegant overflow-hidden hover:shadow-premium transition-all group border border-gray-100">
              <div className="aspect-video bg-gray-200 relative group-hover:opacity-90 transition-opacity">
                {video.video_url.includes('youtube') ||
                video.video_url.includes('youtu.be') ? (
                  <iframe
                    src={video.video_url
                      .replace('watch?v=', 'embed/')
                      .replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    allowFullScreen
                    title={video.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <VideoIcon className="w-12 h-12 opacity-50" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>
                  <span className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full font-bold whitespace-nowrap">
                    {video.category?.name}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {video.description}
                </p>
                <button
                  onClick={() => confirmDelete(video.id)}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl transition-colors font-medium flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  حذف الفيديو
                </button>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-16 text-gray-500 bg-white rounded-2xl shadow-elegant border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <VideoIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-medium">لا توجد فيديوهات</p>
            <p className="text-sm mt-1">قم بإضافة فيديوهات لمكتبة الموقع</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-down max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                إضافة فيديو جديد
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
                  العنوان
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رابط الفيديو (YouTube)
                </label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) =>
                    setFormData({ ...formData, video_url: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  القسم
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                  required>
                  <option value="">اختر القسم</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
                    setFormData({
                      title: '',
                      description: '',
                      video_url: '',
                      categoryId: '',
                      subcategoryId: '',
                    });
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
