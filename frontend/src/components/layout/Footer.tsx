'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  MapPin,
  Send,
  Search,
  Youtube,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [footerSearchQuery, setFooterSearchQuery] = useState('');
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [footerCategories, setFooterCategories] = useState<any[]>([]);

  useEffect(() => {
    loadSettings();
    loadCategories();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const loadCategories = async () => {
    try {
      const categories: any[] = (await apiClient.getCategories()) as any[];
      setFooterCategories(categories.slice(0, 5));
    } catch (error) {
      console.error('Error loading footer categories:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const data = await apiClient.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleFooterSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerSearchQuery.trim()) {
      router.push(
        `/articles?search=${encodeURIComponent(footerSearchQuery.trim())}`,
      );
      setFooterSearchQuery('');
      setSearchSuggestions([]);
    }
  };

  // Debounced search for suggestions (identical to Header)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (footerSearchQuery.trim().length >= 2) {
        setLoadingSuggestions(true);
        try {
          const { articles } = await apiClient.getArticles({
            status: 'published',
            limit: 20,
            search: footerSearchQuery.trim(),
          });

          setSearchSuggestions(articles.slice(0, 5));
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setLoadingSuggestions(false);
        }
      } else {
        setSearchSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [footerSearchQuery]);

  // Skip rendering if admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#0b121e] text-white mt-24 relative overflow-hidden border-t border-white/5">
      {/* Architectural Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-gold-500/50 via-gold-500 to-gold-500/50"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-[1]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Sono */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <h2 className="headline-arabic text-3xl font-bold tracking-tight">
                <span className="text-white">
                  {settings.site_name || 'سونو'}
                </span>
              </h2>
              <p className="text-xs text-gold-400 tracking-wider mt-1 headline-arabic">
                {settings.site_slogan || 'الصحه حضارة ... مصر اصلها'}
              </p>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm mb-6">
              {settings.site_description ||
                'مصدرك الموثوق للأخبار الطبية الموثوقة والأبحاث المتطورة والتحليلات من الخبراء. نربط الفجوة بين العلوم الطبية والفهم العام.'}
            </p>
            <div className="flex gap-3">
              <a
                href={settings.facebook_url || '#'}
                target="_blank"
                className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-600 hover:text-white text-gray-400 transition-all hover:shadow-glow-gold">
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={settings.tiktok_url || '#'}
                target="_blank"
                className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-600 hover:text-white text-gray-400 transition-all hover:shadow-glow-gold">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.48a8.18 8.18 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.91z" />
                </svg>
              </a>
              <a
                href={settings.instagram_url || '#'}
                target="_blank"
                className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-600 hover:text-white text-gray-400 transition-all hover:shadow-glow-gold">
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={settings.youtube_url || '#'}
                target="_blank"
                className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-600 hover:text-white text-gray-400 transition-all hover:shadow-glow-gold">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Editorial Sections */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gold-600/30 pb-2 inline-block">
              الأقسام الرئيسية
            </h3>
            <ul className="space-y-3 text-sm">
              {footerCategories.map((cat: any) => (
                <li key={cat.id}>
                  <Link
                    href={`/articles?category=${cat.slug}`}
                    className="text-gray-400 hover:text-gold-400 hover:translate-x-1 transition-all inline-block">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/articles"
                  className="text-gray-400 hover:text-gold-400 hover:translate-x-1 transition-all inline-block">
                  جميع المقالات
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-gray-400 hover:text-gold-400 hover:translate-x-1 transition-all inline-block">
                  الفيديوهات
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gold-600/30 pb-2 inline-block">
              روابط مفيدة
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-400 hover:text-gold-400 hover:translate-x-1 transition-all inline-block">
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-gray-400 hover:text-gold-400 hover:translate-x-1 transition-all inline-block">
                  المقالات
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-gray-400 hover:text-gold-400 hover:translate-x-1 transition-all inline-block">
                  الفيديوهات
                </Link>
              </li>
              <li>
                <Link
                  href={isLoggedIn ? '/admin/dashboard' : '/admin'}
                  className="text-gold-400 font-black hover:text-white hover:translate-x-1 transition-all inline-block">
                  {isLoggedIn ? 'لوحة التحكم' : 'تسجيل دخول المحررين'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gold-600/30 pb-2 inline-block">
              اتصل بنا
            </h3>
            <div className="space-y-4 text-gray-400 text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <span>
                  {settings.contact_address_line1 || 'مبنى الصحافة الطبية'}
                  <br />
                  {settings.contact_address_line2 || '123 شارع الصحة'}
                  <br />
                  {settings.contact_address_line3 || 'القاهرة، مصر'}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <a
                  href={`mailto:${settings.contact_email || 'editorial@sono.news'}`}
                  className="hover:text-gold-400 transition-colors">
                  {settings.contact_email || 'editorial@sono.news'}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <a
                  href={`tel:${(settings.contact_phone || '+20 123 456 7890').replace(/\s/g, '')}`}
                  className="hover:text-gold-400 transition-colors">
                  {settings.contact_phone || '+20 123 456 7890'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800 bg-navy-950/50 relative z-[1]">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2025 سونو - الصحافة الطبية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-gold-400 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link
              href="/terms-of-use"
              className="hover:text-gold-400 transition-colors">
              شروط الاستخدام
            </Link>
            <Link
              href="/ethics-policy"
              className="hover:text-gold-400 transition-colors">
              سياسة الأخلاقيات
            </Link>
            <Link
              href="/sitemap-page"
              className="hover:text-gold-400 transition-colors">
              خريطة الموقع
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
