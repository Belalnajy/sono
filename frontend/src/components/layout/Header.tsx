'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import {
  Calendar,
  Menu,
  Search,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  TrendingUp,
  Bell,
  ChevronDown,
  ChevronUp,
  User,
  Sun,
  Moon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import MegaMenu from './MegaMenu';
import { useTheme } from '@/contexts/ThemeContext';

const navigationItems = [
  { id: 'home', name: 'الرئيسية', slug: '' },
  { id: 'about', name: 'من نحن', slug: 'about-us' },
  {
    id: 'medical-library',
    name: 'المعرفة الطبية',
    slug: 'medical-library',
    groups: [
      {
        title: 'الأمراض',
        items: [
          { name: 'أمراض شائعة', slug: 'common-diseases' },
          { name: 'الأمراض المزمنة', slug: 'chronic-diseases' },
          { name: 'الصحة النفسية', slug: 'mental-health-diseases' },
        ],
      },
      {
        title: 'الأدوية',
        items: [
          { name: 'الاستخدامات', slug: 'medication-uses' },
          { name: 'التحذيرات', slug: 'medication-warnings' },
        ],
      },
      {
        title: 'الإسعافات العامة',
        items: [
          { name: 'طوارئ الكبار', slug: 'adult-emergencies' },
          { name: 'الإسعافات الأولية', slug: 'general-first-aid' },
        ],
      },
    ],
    // Flat list for mobile fallback or simplicity if needed, but we'll use groups in mobile too if possible
    subcategories: [
      { id: '3-1', name: 'أمراض شائعة', slug: 'common-diseases' },
      { id: '3-2', name: 'الأمراض المزمنة', slug: 'chronic-diseases' },
      { id: '3-3', name: 'الصحة النفسية', slug: 'mental-health-diseases' },
      { id: '3-4', name: 'الاستخدامات', slug: 'medication-uses' },
      { id: '3-5', name: 'التحذيرات', slug: 'medication-warnings' },
      { id: '3-6', name: 'طوارئ الكبار', slug: 'adult-emergencies' },
      { id: '3-7', name: 'الإسعافات الأولية', slug: 'general-first-aid' },
    ],
  },
  {
    id: 'child-care',
    name: 'رعاية الطفل',
    slug: 'child-care',
    subcategories: [
      { id: '4-1', name: 'النمو والتطور', slug: 'growth-development' },
      { id: '4-2', name: 'التغذية', slug: 'child-nutrition' },
      { id: '4-3', name: 'التطعيمات', slug: 'vaccinations' },
      { id: '4-4', name: 'الأمراض الشائعة', slug: 'child-common-diseases' },
      { id: '4-5', name: 'الإسعافات الأولية', slug: 'child-first-aid' },
      { id: '4-6', name: 'الصحة النفسية', slug: 'child-mental-health' },
      { id: '4-7', name: 'العناية اليومية', slug: 'daily-care' },
    ],
  },
  {
    id: 'health-beauty',
    name: 'الصحة والجمال',
    slug: 'health-beauty',
    subcategories: [
      { id: '5-1', name: 'العناية بالبشرة', slug: 'skincare' },
      { id: '5-2', name: 'امراض جلدية', slug: 'dermatology' },
      { id: '5-3', name: 'العناية بالشعر', slug: 'hair-care' },
      { id: '5-4', name: 'الصحة والغذاء', slug: 'health-diet' },
      { id: '5-5', name: 'التجميل غير جراحي', slug: 'non-surgical-cosmetic' },
      { id: '5-6', name: 'التجميل الجراحي', slug: 'surgical-cosmetic' },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, isLight } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<
    string | null
  >(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await apiClient.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced search for suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setLoadingSuggestions(true);
        try {
          const { articles } = await apiClient.getArticles({
            status: 'published',
            limit: 20,
            search: searchQuery.trim(),
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
  }, [searchQuery]);

  const toggleMobileCategory = (id: string) => {
    if (mobileExpandedCategory === id) {
      setMobileExpandedCategory(null);
    } else {
      setMobileExpandedCategory(id);
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/articles?search=${encodeURIComponent(
        searchQuery.trim(),
      )}`;
      setSearchOpen(false);
      setSearchQuery('');
      setSearchSuggestions([]);
    }
  };

  // Skip rendering if admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Breaking News Ticker - أخبار عاجلة - Enhanced Mini Design */}
      <div className="bg-[#0b121e] text-white/80 overflow-hidden relative border-b border-white/5 h-10 flex items-center">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></div>
            <span className="font-black text-[10px] uppercase tracking-widest text-gold-500">
              مباشر
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="animate-slide-left whitespace-nowrap inline-block text-[11px] font-medium">
              {(settings.news_ticker || '').split('|').map((msg, idx) => (
                <span key={idx} className="inline-block px-8">
                  {msg.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Bar - Architectural Dark Design */}
      <div
        className={`bg-[#0b121e]/80 backdrop-blur-md text-white transition-all duration-300 border-b border-white/5 ${
          isScrolled ? 'py-1 opacity-0 pointer-events-none' : 'py-2'
        }`}>
        <div className="container mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 font-medium tracking-tight">
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {new Date().toLocaleDateString('ar-EG', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="hidden md:flex gap-4 border-r border-white/10 pr-4 mr-4">
              <Link
                href={settings.facebook_url || '#'}
                target="_blank"
                className="text-gray-400 hover:text-gold-500 transition-all hover:scale-110">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href={settings.twitter_url || '#'}
                target="_blank"
                className="text-gray-400 hover:text-gold-500 transition-all hover:scale-110">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href={settings.instagram_url || '#'}
                target="_blank"
                className="text-gray-400 hover:text-gold-500 transition-all hover:scale-110">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href={settings.youtube_url || '#'}
                target="_blank"
                className="text-gray-400 hover:text-gold-500 transition-all hover:scale-110">
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={isLoggedIn ? '/admin/dashboard' : '/admin'}
              className="flex items-center gap-2 text-gold-500 hover:text-white transition-all font-black px-4 py-1 rounded-full border border-gold-500/30 hover:bg-gold-500 hover:border-gold-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
              {isLoggedIn ? 'لوحة التحكم' : 'دخول الأدمن'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header - Premium Dark Sticky Design */}
      <header
        className={`fixed left-0 right-0 z-[40] transition-all duration-500 border-b border-white/5 ${
          isScrolled
            ? 'top-0 py-3 bg-navy-900/95 backdrop-blur-xl shadow-2xl'
            : 'top-10 py-5 bg-navy-900/40 backdrop-blur-lg'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo - Enhanced with Shadow & Glow */}
            <Link href="/" className="flex-shrink-0 group/logo">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold-500 blur-xl opacity-0 group-hover/logo:opacity-30 transition-opacity"></div>
                  <img
                    src="/logo.png"
                    className={`relative transition-all duration-500 rounded-xl ${
                      isScrolled ? 'w-10 h-10' : 'w-14 h-14'
                    }`}
                    alt="سونو"
                  />
                </div>
                <div className="hidden lg:block">
                  <h1 className="headline-arabic text-3xl text-white font-black leading-none group-hover/logo:text-gold-500 transition-colors">
                    سونو{' '}
                    <span className="text-gold-500 group-hover/logo:text-white transition-colors">
                      NEWS
                    </span>
                  </h1>
                  <p className="text-[10px] text-gray-400 font-bold tracking-[0.1em] mt-1 headline-arabic">
                    الصحه حضارة ... مصر اصلها
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - RTL */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center relative">
              {navigationItems.map((category) => {
                // Static pages (home, about) don't need /category/ prefix
                const staticPages = ['home', 'about'];
                const href = category.slug
                  ? staticPages.includes(category.id)
                    ? category.id === 'home'
                      ? '/'
                      : `/${category.slug}`
                    : `/articles?category=${category.slug}`
                  : '/';

                return (
                  <div
                    key={category.id}
                    className="group"
                    onMouseEnter={() => setActiveCategory(category.id)}
                    onMouseLeave={() => setActiveCategory(null)}>
                    <Link
                      href={href}
                      className={`px-5 py-2.5 text-xs font-black transition-all rounded-xl whitespace-nowrap flex items-center gap-2 tracking-wide uppercase ${
                        pathname === href
                          ? 'text-navy-900 bg-gold-500 shadow-glow-gold'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}>
                      {category.name}
                      {category.subcategories && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            activeCategory === category.id ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {activeCategory === category.id &&
                        category.subcategories && (
                          <MegaMenu
                            category={category}
                            isOpen={activeCategory === category.id}
                            onClose={() => setActiveCategory(null)}
                          />
                        )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-all text-gray-400 hover:text-gold-500 hover:bg-white/5 border border-white/5"
                aria-label={isLight ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}>
                {isLight ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {/* Search */}
              <div className="hidden md:block relative">
                <AnimatePresence mode="wait">
                  {searchOpen ? (
                    <motion.form
                      key="search-input"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSearch}
                      className="flex items-center gap-2 relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث عن مقالات..."
                        autoFocus
                        className="bg-gray-50 border border-skyblue-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 w-64 text-right"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                          setSearchSuggestions([]);
                        }}
                        className="text-gray-400 hover:text-navy-900 flex-shrink-0">
                        <X className="w-5 h-5" />
                      </button>

                      {/* Search Suggestions Dropdown */}
                      {(searchSuggestions.length > 0 || loadingSuggestions) && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-[9999]">
                          {loadingSuggestions ? (
                            <div className="p-4 text-center text-gray-500">
                              <div className="animate-spin w-5 h-5 border-2 border-gold-500 border-t-transparent rounded-full mx-auto"></div>
                            </div>
                          ) : (
                            searchSuggestions.map((article) => (
                              <a
                                key={article.id}
                                href={`/article/${article.slug}`}
                                className="block p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
                                <h4 className="text-sm font-semibold text-navy-900 mb-1 line-clamp-1">
                                  {article.title}
                                </h4>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                  {article.content
                                    .replace(/<[^>]*>/g, '')
                                    .substring(0, 80)}
                                  ...
                                </p>
                              </a>
                            ))
                          )}
                        </div>
                      )}
                    </motion.form>
                  ) : (
                    <motion.button
                      key="search-btn"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSearchOpen(true)}
                      className="p-2 text-navy-700 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all">
                      <Search className="w-5 h-5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Login/Dashboard Toggle */}
              <Link
                href={isLoggedIn ? '/admin/dashboard' : '/admin'}
                className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
                  isLoggedIn
                    ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20 hover:bg-gold-500 hover:text-navy-900 shadow-glow-gold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
                }`}>
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">
                  {isLoggedIn ? 'لوحة التحكم' : 'دخول'}
                </span>
              </Link>

              {/* Articles Link */}
              <Link
                href="/articles"
                className="hidden xl:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-lg hover:shadow-glow-gold transition-all text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>جميع المقالات</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-navy-800 hover:text-gold-600 transition-colors p-2 hover:bg-gold-50 rounded-lg">
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Decorative Border */}
      <div className="h-0.5 bg-gradient-to-l from-transparent via-gold-400 to-transparent"></div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} // slide from right (RTL) or left depending on lang? AR is RTL, so sidebar usually right side? or left? usually "Start".
              // In generic RTL layout, "start" is right. But the sidebar code says "left-0".
              // original was "absolute top-0 left-0 bottom-0". So it was on the left.
              // I will animate it from x: "-100%" to 0
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-80 max-w-full bg-white shadow-premium overflow-y-auto z-[100]">
              <nav className="p-6 flex flex-col gap-2">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في الأخبار الطبية..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-right"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3 pointer-events-none" />

                  {/* Mobile Search Suggestions */}
                  {(searchSuggestions.length > 0 || loadingSuggestions) && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-64 overflow-y-auto z-[9999]">
                      {loadingSuggestions ? (
                        <div className="p-4 text-center text-gray-500">
                          <div className="animate-spin w-5 h-5 border-2 border-gold-500 border-t-transparent rounded-full mx-auto"></div>
                        </div>
                      ) : (
                        searchSuggestions.map((article) => (
                          <a
                            key={article.id}
                            href={`/article/${article.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
                            <h4 className="text-sm font-semibold text-navy-900 mb-1 line-clamp-1">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-1">
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
                </form>

                {navigationItems.map((category) => {
                  // Static pages (home, about) don't need /category/ prefix
                  const staticPages = ['home', 'about'];
                  const href = category.slug
                    ? staticPages.includes(category.id)
                      ? category.id === 'home'
                        ? '/'
                        : `/${category.slug}`
                      : `/category/${category.slug}`
                    : '/';

                  return (
                    <div
                      key={category.id}
                      className="border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                      <div className="flex items-center justify-between">
                        <Link
                          href={href}
                          className={`flex-1 py-3 text-base font-medium transition-all ${
                            pathname === href
                              ? 'text-gold-600'
                              : 'text-navy-800 hover:text-gold-600'
                          }`}
                          onClick={() =>
                            !category.subcategories && setMobileMenuOpen(false)
                          }>
                          {category.name}
                        </Link>
                        {category.subcategories && (
                          <button
                            onClick={() => toggleMobileCategory(category.id)}
                            className="p-2 text-gray-400 hover:text-gold-600">
                            {mobileExpandedCategory === category.id ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Mobile Subcategories */}
                      <AnimatePresence>
                        {category.subcategories &&
                          mobileExpandedCategory === category.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden">
                              <div className="pr-4 flex flex-col gap-2 bg-gray-50/50 rounded-lg p-3 mb-2">
                                {category.subcategories.map((sub: any) => (
                                  <Link
                                    key={sub.id}
                                    href={`/category/${category.slug}/${sub.slug}`}
                                    className="text-sm text-gray-600 hover:text-gold-600 py-1.5 flex items-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    <span className="w-1 h-1 rounded-full bg-gold-300"></span>
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div className="border-t border-gray-200 my-4"></div>

                <div className="grid grid-cols-1 gap-3">
                  {/* Mobile Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-navy-900 rounded-xl font-bold justify-center border border-gray-200">
                    {isLight ? (
                      <>
                        <Moon className="w-5 h-5 text-gold-500" />
                        الوضع الداكن
                      </>
                    ) : (
                      <>
                        <Sun className="w-5 h-5 text-gold-500" />
                        الوضع الفاتح
                      </>
                    )}
                  </button>
                  <Link
                    href="/articles"
                    className="flex items-center gap-2 px-4 py-3 bg-white border border-gold-500 text-navy-900 rounded-xl font-bold justify-center shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}>
                    <TrendingUp className="w-5 h-5 text-gold-500" />
                    جميع المقالات
                  </Link>
                  <Link
                    href={isLoggedIn ? '/admin/dashboard' : '/admin'}
                    className="flex items-center gap-2 px-4 py-3 bg-navy-900 text-gold-500 rounded-xl font-bold justify-center shadow-2xl border border-gold-500/30"
                    onClick={() => setMobileMenuOpen(false)}>
                    <User className="w-5 h-5" />
                    {isLoggedIn ? 'لوحة التحكم' : 'دخول المشرفين'}
                  </Link>
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
