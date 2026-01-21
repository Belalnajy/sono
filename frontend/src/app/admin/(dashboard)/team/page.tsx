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
  Users,
  Upload,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

export default function TeamManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    imageUrl: '',
    order: 0,
  });
  const [uploading, setUploading] = useState(false);

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await apiClient.getTeamMembers();
      setMembers(data as any[]);
    } catch (error) {
      console.error('Error loading members:', error);
      toast.error('فشل تحميل أعضاء الفريق');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { url } = await apiClient.uploadImage(file);
      setFormData({ ...formData, imageUrl: url });
      toast.success('تم رفع الصورة بنجاح');
    } catch (error) {
      toast.error('فشل رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      toast.error('يرجى اختيار صورة');
      return;
    }

    try {
      if (editingMember) {
        await apiClient.updateTeamMember(editingMember.id, formData);
        toast.success('تم تحديث العضو بنجاح');
      } else {
        await apiClient.createTeamMember(formData);
        toast.success('تم إضافة العضو بنجاح');
      }
      setIsModalOpen(false);
      setEditingMember(null);
      setFormData({ name: '', role: '', imageUrl: '', order: 0 });
      loadMembers();
    } catch (error: any) {
      toast.error('حدث خطأ: ' + error.message);
    }
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role || '',
      imageUrl: member.imageUrl,
      order: member.order || 0,
    });
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setMemberToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!memberToDelete) return;

    try {
      await apiClient.deleteTeamMember(memberToDelete);
      toast.success('تم حذف العضو بنجاح');
      setDeleteModalOpen(false);
      setMemberToDelete(null);
      loadMembers();
    } catch (error: any) {
      toast.error('فشل حذف العضو: ' + error.message);
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
          setMemberToDelete(null);
        }}
        onConfirm={handleDelete}
        title="حذف عضو"
        message="هل أنت متأكد من رغبتك في حذف هذا العضو من الفريق؟ لا يمكن التراجع عن هذا الإجراء."
      />

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-premium w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg text-navy-900">
                {editingMember ? 'تعديل عضو' : 'إضافة عضو جديد'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الدور (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الترتيب
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  الصورة
                </label>
                <div className="flex items-center gap-4">
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-20 h-20 rounded-xl object-cover border"
                    />
                  )}
                  <label className="flex-1 flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      {uploading ? 'جاري الرفع...' : 'اختر صورة'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
              <div className="pt-4 flex gap-2">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition shadow-lg disabled:opacity-50">
                  {editingMember ? 'حفظ التغييرات' : 'إضافة'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            <span className="text-gray-900 font-medium">أعضاء الفريق</span>
          </div>

          <button
            onClick={() => {
              setEditingMember(null);
              setFormData({ name: '', role: '', imageUrl: '', order: 0 });
              setIsModalOpen(true);
            }}
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl transition font-medium shadow-lg hover:shadow-accent-500/30 border border-accent-400 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>إضافة عضو جديد</span>
          </button>
        </div>

        {/* Members List */}
        <div className="bg-white rounded-2xl shadow-elegant border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                    العضو
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                    الدور
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                    الترتيب
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={member.imageUrl}
                          alt=""
                          className="h-12 w-12 rounded-full object-cover ml-3 shadow-sm border-2 border-white ring-1 ring-gray-100"
                        />
                        <span className="text-gray-900 font-bold">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                      {member.role || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono">
                      {member.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="تعديل">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDelete(member.id)}
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
          {members.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="font-medium">لا يوجد أعضاء فريق</p>
              <p className="text-sm mt-1">ابدأ بإضافة أعضاء الفريق الأوائل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
