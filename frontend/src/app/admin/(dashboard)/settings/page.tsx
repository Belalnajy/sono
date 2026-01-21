'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import {
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Save,
  LayoutDashboard,
  Bell,
  MapPin,
  Mail,
  Phone,
  Building2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    youtube_url: '',
    news_ticker: '',
    // Contact Information
    contact_address_line1: '',
    contact_address_line2: '',
    contact_address_line3: '',
    contact_email: '',
    contact_phone: '',
    // Site Info
    site_name: '',
    site_slogan: '',
    site_description: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await apiClient.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('فشل تحميل الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.updateSettings(settings);
      toast.success('تم حفظ الإعدادات بنجاح');
    } catch (error: any) {
      toast.error('فشل حفظ الإعدادات: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
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
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Link
              href="/admin/dashboard"
              className="hover:text-primary-600 transition-colors flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" />
              لوحة التحكم
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">الإعدادات العامه</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-elegant border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gray-50/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  الإعدادات العامة
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  قم بتحديث معلومات الموقع وبيانات التواصل والروابط الاجتماعية
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="p-8 space-y-6">
            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-500" />
                روابط التواصل الاجتماعي
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Facebook */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  رابط فيسبوك
                </label>
                <input
                  type="text"
                  value={settings.facebook_url}
                  onChange={(e) => handleChange('facebook_url', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-left dir-ltr"
                />
              </div>

              {/* Twitter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Twitter className="w-4 h-4 text-skyblue-500" />
                  رابط تويتر (X)
                </label>
                <input
                  type="text"
                  value={settings.twitter_url}
                  onChange={(e) => handleChange('twitter_url', e.target.value)}
                  placeholder="https://twitter.com/yourprofile"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-left dir-ltr"
                />
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  رابط إنستجرام
                </label>
                <input
                  type="text"
                  value={settings.instagram_url}
                  onChange={(e) =>
                    handleChange('instagram_url', e.target.value)
                  }
                  placeholder="https://instagram.com/yourprofile"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-left dir-ltr"
                />
              </div>

              {/* Youtube */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Youtube className="w-4 h-4 text-red-600" />
                  رابط يوتيوب
                </label>
                <input
                  type="text"
                  value={settings.youtube_url}
                  onChange={(e) => handleChange('youtube_url', e.target.value)}
                  placeholder="https://youtube.com/yourchannel"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-left dir-ltr"
                />
              </div>
            </div>

            {/* Site Info Section */}
            <div className="pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center text-navy-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    معلومات الموقع
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    اسم الموقع والشعار والوصف
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    اسم الموقع
                  </label>
                  <input
                    type="text"
                    value={settings.site_name}
                    onChange={(e) => handleChange('site_name', e.target.value)}
                    placeholder="سونو"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    شعار الموقع
                  </label>
                  <input
                    type="text"
                    value={settings.site_slogan}
                    onChange={(e) =>
                      handleChange('site_slogan', e.target.value)
                    }
                    placeholder="الصحه حضارة ... مصر اصلها"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-right"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">
                    وصف الموقع
                  </label>
                  <textarea
                    value={settings.site_description}
                    onChange={(e) =>
                      handleChange('site_description', e.target.value)
                    }
                    placeholder="مصدرك الموثوق للأخبار الطبية..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-right"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    معلومات التواصل
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    العنوان والبريد الإلكتروني ورقم الهاتف
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    العنوان - السطر الأول
                  </label>
                  <input
                    type="text"
                    value={settings.contact_address_line1}
                    onChange={(e) =>
                      handleChange('contact_address_line1', e.target.value)
                    }
                    placeholder="مبنى الصحافة الطبية"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    العنوان - السطر الثاني
                  </label>
                  <input
                    type="text"
                    value={settings.contact_address_line2}
                    onChange={(e) =>
                      handleChange('contact_address_line2', e.target.value)
                    }
                    placeholder="123 شارع الصحة"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    العنوان - السطر الثالث
                  </label>
                  <input
                    type="text"
                    value={settings.contact_address_line3}
                    onChange={(e) =>
                      handleChange('contact_address_line3', e.target.value)
                    }
                    placeholder="القاهرة، مصر"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Mail className="w-4 h-4 text-gold-500" />
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) =>
                      handleChange('contact_email', e.target.value)
                    }
                    placeholder="editorial@sono.news"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-left dir-ltr"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Phone className="w-4 h-4 text-gold-500" />
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={settings.contact_phone}
                    onChange={(e) =>
                      handleChange('contact_phone', e.target.value)
                    }
                    placeholder="+20 123 456 7890"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-left dir-ltr"
                  />
                </div>
              </div>
            </div>

            {/* News Ticker Section */}
            <div className="pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center text-gold-600">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    شريط الأخبار العاجلة
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    الرسائل التي تظهر في الشريط المتحرك أعلى الموقع
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    محتوى الشريط
                  </label>
                  <textarea
                    value={settings.news_ticker}
                    onChange={(e) =>
                      handleChange('news_ticker', e.target.value)
                    }
                    placeholder="أدخل الرسائل هنا... استخدم العلامة | للفصل بين الرسائل المختلفة"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-right"
                  />
                  <p className="text-[11px] text-gray-400 font-medium">
                    * يمكنك إضافة عدة رسائل، افصل بين كل رسالة والأخرى باستخدام
                    العلامة <span className="text-gold-600 font-bold">|</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl transition font-bold shadow-lg hover:shadow-primary-600/30 flex items-center gap-2 disabled:opacity-50">
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
