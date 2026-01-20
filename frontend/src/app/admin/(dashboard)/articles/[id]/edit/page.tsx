'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

interface EditArticleProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditArticle({ params }: EditArticleProps) {
  const unwrappedParams = React.use(params) as { id: string };
  const id = unwrappedParams.id;
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    thumbnail_url: '',
    images: [] as string[],
    video_url: '',
    status: 'draft',
    author: '',
    categoryId: '',
    subcategoryId: '',
    is_featured: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load categories
      const categoriesData = await apiClient.getCategories();
      setCategories(categoriesData as any[]);

      // Load article data
      const articleData: any = await apiClient.getArticleById(id);

      setFormData({
        title: articleData.title,
        slug: articleData.slug,
        content: articleData.content,
        thumbnail_url: articleData.thumbnail_url || '',
        images: articleData.images || [],
        video_url: articleData.video_url || '',
        status: articleData.status,
        author: articleData.author || '',
        categoryId: articleData.category?.id || '',
        subcategoryId: articleData.subcategory?.id || '',
        is_featured: articleData.is_featured || false,
      });

      // Load subcategories if category exists
      if (articleData.category?.slug) {
        const category = await apiClient.getCategoryBySlug(
          articleData.category.slug
        );
        setSubcategories((category as any).subcategories || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    setFormData({ ...formData, categoryId, subcategoryId: '' });

    if (categoryId) {
      try {
        const category = await apiClient.getCategoryBySlug(
          categories.find((c) => c.id === categoryId)?.slug || ''
        );
        setSubcategories((category as any).subcategories || []);
      } catch (error) {
        console.error('Error loading subcategories:', error);
      }
    } else {
      setSubcategories([]);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const result = await apiClient.uploadImage(file);
      setFormData({ ...formData, thumbnail_url: result.url });
    } catch (error: any) {
      alert('فشل رفع الصورة: ' + error.message);
      setUploadingImage(false);
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    try {
      const uploadPromises = Array.from(files).map((file) =>
        apiClient.uploadImage(file)
      );
      const results = await Promise.all(uploadPromises);
      const newImages = results.map((r) => r.url);

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    } catch (error: any) {
      alert('فشل رفع الصور: ' + error.message);
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await apiClient.updateArticle(id, {
        ...formData,
        subcategoryId: formData.subcategoryId || undefined,
      });
      router.push('/admin/articles');
    } catch (error: any) {
      alert('فشل تحديث المقال: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">تعديل المقال</h1>
          <Link
            href="/admin/articles"
            className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
            ← العودة للمقالات
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              العنوان
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                القسم
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required>
                <option value="">اختر القسم</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                القسم الفرعي (اختياري)
              </label>
              <select
                value={formData.subcategoryId}
                onChange={(e) =>
                  setFormData({ ...formData, subcategoryId: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!formData.categoryId}>
                <option value="">لا يوجد</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة المقال
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              disabled={uploadingImage}
            />
            {uploadingImage && (
              <p className="text-sm text-blue-600 mt-2">جاري رفع الصورة...</p>
            )}
            {formData.thumbnail_url && (
              <img
                src={formData.thumbnail_url}
                alt="Preview"
                className="mt-4 max-w-xs rounded-lg"
              />
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صور إضافية (معرض الصور)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              disabled={uploadingGallery}
            />
            {uploadingGallery && (
              <p className="text-sm text-blue-600 mt-2">جاري رفع الصور...</p>
            )}

            {formData.images && formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الكاتب
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="اسم الكاتب (اختياري)"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رابط فيديو (يوتيوب)
            </label>
            <input
              type="text"
              value={formData.video_url}
              onChange={(e) =>
                setFormData({ ...formData, video_url: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المحتوى (HTML)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              rows={15}
              placeholder="<p>اكتب محتوى المقال هنا...</p>"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              يمكنك استخدام HTML tags مثل &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;,
              &lt;ul&gt;, &lt;li&gt;
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الحالة
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="draft">مسودة</option>
              <option value="published">منشور</option>
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) =>
                setFormData({ ...formData, is_featured: e.target.checked })
              }
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="is_featured"
              className="text-sm font-medium text-gray-700">
              تمييز هذا المقال في الصفحة الرئيسية
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50">
              {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
            <Link
              href="/admin/articles"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center">
              إلغاء
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
