'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
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

  useEffect(() => {
    loadSettings();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

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
        `/articles?search=${encodeURIComponent(footerSearchQuery.trim())}`
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

      {/* Search Section - Premium Glassmorphism */}
      <div className="bg-white/5 border-b border-white/5 relative z-10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="headline-arabic text-3xl md:text-4xl font-black text-white mb-4">
              ابحث في{' '}
              <span className="text-gold-500 underline decoration-white/10 underline-offset-10 decoration-4">
                مكتبتنا
              </span>{' '}
              الطبية
            </h3>
            <p className="text-gray-400 mb-8 text-lg font-medium opacity-80">
              استكشف آلاف المقالات والأبحاث الطبية الموثقة من خلال محرك بحثنا
              المتخصص
            </p>
            <form
              onSubmit={handleFooterSearch}
              className="flex gap-3 max-w-md mx-auto relative">
              <button
                type="submit"
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-glow-gold flex items-center gap-2">
                <Search className="w-4 h-4" />
                بحث
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={footerSearchQuery}
                  onChange={(e) => setFooterSearchQuery(e.target.value)}
                  placeholder="عن ماذا تبحث اليوم؟"
                  className="w-full bg-navy-700 border border-navy-600 rounded-lg py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-right"
                />

                {/* Search Suggestions Dropdown (Styled for Footer Dark Theme) */}
                {(searchSuggestions.length > 0 || loadingSuggestions) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-navy-800 rounded-lg shadow-premium border border-navy-600 max-h-64 overflow-y-auto z-[1000] text-right">
                    {loadingSuggestions ? (
                      <div className="p-4 text-center text-gray-400">
                        <div className="animate-spin w-5 h-5 border-2 border-gold-500 border-t-transparent rounded-full mx-auto"></div>
                      </div>
                    ) : (
                      searchSuggestions.map((article) => (
                        <a
                          key={article.id}
                          href={`/article/${article.slug}`}
                          className="block p-3 hover:bg-navy-700 border-b border-navy-700 last:border-0 transition-colors">
                          <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                            {article.title}
                          </h4>
                          <p className="text-xs text-gray-400 line-clamp-1">
                            {article.content
                              .replace(/<[^>]*>/g, '')
                              .substring(0, 60)}
                            ...
                          </p>
                        </a>
                      ))
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Sono */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <h2 className="headline-arabic text-3xl font-bold tracking-tight">
                <span className="text-white">سونو</span>
              </h2>
              <p className="text-xs text-gold-400 tracking-wider mt-1 headline-arabic">
                الصحه حضارة ... مصر اصلها
              </p>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm mb-6">
              مصدرك الموثوق للأخبار الطبية الموثوقة والأبحاث المتطورة والتحليلات
              من الخبراء. نربط الفجوة بين العلوم الطبية والفهم العام.
            </p>
            <div className="flex gap-3">
              <a
                href={settings.facebook_url || '#'}
                target="_blank"
                className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-600 hover:text-white text-gray-400 transition-all hover:shadow-glow-gold">
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={settings.twitter_url || '#'}
                target="_blank"
                className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-600 hover:text-white text-gray-400 transition-all hover:shadow-glow-gold">
                <Twitter className="w-5 h-5" />
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
              <li>
                <Link
                  href="/articles?category=medical-library"
                  className="text-gray-400 hover:text-gold-400 hover:translate-x-1 transition-all inline-block">
                  المعرفة الطبية
                </Link>
              </li>
              <li>
                <Link
                  href="/articles?category=child-care"
                  className="text-gray-400 hover:text-gold-400 hover:translate-x-1 transition-all inline-block">
                  رعاية الطفل
                </Link>
              </li>
              <li>
                <Link
                  href="/articles?category=health-beauty"
                  className="text-gray-400 hover:text-gold-400 hover:translate-x-1 transition-all inline-block">
                  الصحة والجمال
                </Link>
              </li>
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
                  مبنى الصحافة الطبية
                  <br />
                  123 شارع الصحة
                  <br />
                  القاهرة، مصر
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <a
                  href="mailto:editorial@sono.news"
                  className="hover:text-gold-400 transition-colors">
                  editorial@sono.news
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <a
                  href="tel:+201234567890"
                  className="hover:text-gold-400 transition-colors">
                  +20 123 456 7890
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800 bg-navy-950/50 relative z-10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2025 سونو - الصحافة الطبية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="hover:text-gold-400 transition-colors">
              سياسة الخصوصية
            </a>
            <a href="/terms" className="hover:text-gold-400 transition-colors">
              شروط الاستخدام
            </a>
            <a href="/ethics" className="hover:text-gold-400 transition-colors">
              سياسة الأخلاقيات
            </a>
            <a
              href="/sitemap"
              className="hover:text-gold-400 transition-colors">
              خريطة الموقع
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
