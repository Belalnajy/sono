'use client';

import { useEffect, useState, use } from 'react';
import { apiClient } from '@/lib/api-client';
import { Article } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  ChevronLeft,
  User,
  Calendar,
  Clock,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  ArrowRight,
  FileText,
  Printer,
  Bookmark,
  Linkedin,
  ArrowLeft,
  Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ImageGallery from '@/components/articles/ImageGallery';
import ArticleCard from '@/components/ui/ArticleCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Reading time calculator
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Extract headings for TOC
function extractHeadings(
  content: string,
): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, '');
    const id = `heading-${headings.length}`;
    headings.push({ id, text, level });
  }

  return headings;
}

// Add IDs to headings in content
function addHeadingIds(content: string): string {
  let index = 0;
  return content.replace(
    /<h([2-3])([^>]*)>(.*?)<\/h\1>/gi,
    (match, level, attrs, text) => {
      const id = `heading-${index++}`;
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    },
  );
}

// Table of Contents Component
function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-40 bg-white p-8 rounded-3xl shadow-premium border border-gray-100">
      <h3 className="font-black text-navy-900 mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
        <FileText className="w-4 h-4 text-gold-500" />
        محتويات المقال
      </h3>
      <nav className="space-y-3">
        {headings.map(({ id, text, level }) => (
          <button
            key={id}
            onClick={() => scrollToHeading(id)}
            className={`block w-full text-right text-xs transition-all py-2.5 px-4 rounded-xl font-bold ${
              activeId === id
                ? 'bg-gold-500 text-navy-900 shadow-glow-gold'
                : 'text-gray-500 hover:text-navy-900 hover:bg-gray-50'
            } ${level === 3 ? 'pr-8 font-medium italic opacity-80' : ''}`}>
            {text}
          </button>
        ))}
      </nav>
    </div>
  );
}

// Share functionality
async function shareArticle(platform: string, url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Use Web Share API if available and platform is 'generic'
  if (platform === 'share' && navigator.share) {
    try {
      await navigator.share({
        title: title,
        url: url,
      });
      return;
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  const shareUrls: Record<string, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
}

// Extract YouTube video ID from URL
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^&\s]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return null;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [processedContent, setProcessedContent] = useState('');
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [readingTime, setReadingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/articles?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const articleData = (await apiClient.getArticleBySlug(slug)) as Article;
        setArticle(articleData);

        const contentWithIds = addHeadingIds(articleData.content);
        setProcessedContent(contentWithIds);

        const extractedHeadings = extractHeadings(articleData.content);
        setHeadings(extractedHeadings);

        const time = calculateReadingTime(articleData.content);
        setReadingTime(time);

        if (articleData.category?.id) {
          const response = await apiClient.getArticles({
            status: 'published',
            categoryId: articleData.category.id,
          });

          const filtered = response.articles
            .filter((a: Article) => a.id !== articleData.id)
            .slice(0, 3);
          setRelatedArticles(filtered);
        }

        // Fetch latest articles for sidebar
        const latestResponse = await apiClient.getArticles({
          status: 'published',
          limit: 3,
        });
        setLatestArticles(latestResponse.articles);
      } catch (error) {
        console.error('Failed to load article', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b121e]">
        <div className="w-16 h-16 border-4 border-gold-500 rounded-full animate-spin border-t-transparent shadow-glow-gold"></div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Featured Header - Cinematic Navy & Gold transition */}
      {article.thumbnail_url && (
        <div className="relative h-[70vh] min-h-[500px] w-full group overflow-hidden">
          <img
            src={article.thumbnail_url}
            alt={article.title}
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-[#0b121e]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,18,30,0.4)_100%)]"></div>

          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-20">
            <div className="max-w-5xl mx-auto">
              <AnimatedSection variant="fadeDown">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-gold-500 text-navy-900 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-2xl">
                    {article.category.name}
                  </span>
                  {article.subcategory && (
                    <span className="bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-xl text-xs font-bold border border-white/20">
                      {article.subcategory.name}
                    </span>
                  )}
                </div>
                <h1 className="headline-arabic text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-gray-300">
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <User className="w-5 h-5 text-gold-500" />
                    <span className="font-bold">
                      {article.author || 'فريق تحرير سونو'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <Calendar className="w-5 h-5 text-gold-500" />
                    <span className="font-medium">
                      {new Date(article.created_at).toLocaleDateString(
                        'ar-EG',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <Clock className="w-5 h-5 text-gold-500" />
                    <span className="font-medium">
                      {readingTime} دقائق قراءة
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Share Sidebar (Desktop) - Enhanced Premium Look */}
            <div className="hidden lg:block col-span-1">
              <div className="sticky top-40 space-y-4">
                <button
                  onClick={() =>
                    shareArticle('facebook', currentUrl, article.title)
                  }
                  className="w-12 h-12 rounded-2xl bg-white shadow-premium text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-100">
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    shareArticle('twitter', currentUrl, article.title)
                  }
                  className="w-12 h-12 rounded-2xl bg-white shadow-premium text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-100">
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    shareArticle('whatsapp', currentUrl, article.title)
                  }
                  className="w-12 h-12 rounded-2xl bg-white shadow-premium text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-100">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <div className="w-12 h-px bg-gray-200 my-4"></div>
                <button
                  onClick={() => window.print()}
                  className="w-12 h-12 rounded-2xl bg-white shadow-premium text-gray-500 hover:bg-navy-900 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-100">
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Card - Premium Focus */}
            <div className="col-span-1 lg:col-span-8">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-premium border border-gray-100 relative overflow-hidden">
                {/* Architectural Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                <div
                  className="prose prose-lg md:prose-xl max-w-none 
                       font-sans
                       prose-headings:font-black prose-headings:text-navy-900 prose-headings:mb-6 prose-headings:mt-12
                       prose-h2:text-4xl prose-h2:border-r-4 prose-h2:border-gold-500 prose-h2:pr-6
                       prose-h3:text-2xl
                       prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-xl prose-p:mb-8
                       prose-p:first-of-type:text-2xl prose-p:first-of-type:font-medium prose-p:first-of-type:text-navy-800
                       prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline prose-a:font-bold
                       prose-blockquote:border-r-4 prose-blockquote:border-gold-500 prose-blockquote:bg-gray-50/50 
                       prose-blockquote:pr-8 prose-blockquote:py-6 prose-blockquote:rounded-2xl prose-blockquote:not-italic
                       prose-blockquote:text-navy-900 prose-blockquote:font-bold
                       prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
                       prose-li:text-gray-700 prose-li:text-lg prose-li:mb-3
                       prose-ul:my-8 prose-ol:my-8"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />

                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex flex-wrap gap-3">
                    <span className="text-navy-900 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                      التصنيفات:
                    </span>
                    <Link
                      href={`/category/${article.category.slug}`}
                      className="px-6 py-2 bg-gray-50 hover:bg-gold-500 hover:text-white text-gray-600 rounded-xl transition-all font-bold text-sm border border-gray-100">
                      {article.category.name}
                    </Link>
                  </div>

                  <div className="lg:hidden flex gap-4">
                    <button
                      onClick={() =>
                        shareArticle('facebook', currentUrl, article.title)
                      }
                      className="p-3 bg-gray-50 rounded-full text-navy-900 active:scale-95 transition-transform">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        shareArticle('twitter', currentUrl, article.title)
                      }
                      className="p-3 bg-gray-50 rounded-full text-navy-900 active:scale-95 transition-transform">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        shareArticle('share', currentUrl, article.title)
                      }
                      className="p-3 bg-gray-50 rounded-full text-navy-900 active:scale-95 transition-transform">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {relatedArticles.length > 0 && (
                <div className="mt-24">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-1 bg-gold-500 rounded-full"></div>
                    <h2 className="headline-arabic text-3xl font-black text-navy-900">
                      قد <span className="text-gold-500">يهمك</span> أيضاً
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedArticles.map((related) => (
                      <ArticleCard key={related.id} article={related} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-1 lg:col-span-3">
              <div className="sticky top-40 space-y-8">
                <TableOfContents headings={headings} />

                {/* Search Widget */}
                <div className="bg-white rounded-[2rem] p-8 shadow-premium border border-gray-100">
                  <h4 className="headline-arabic text-xl font-black mb-6 text-navy-900 border-r-4 border-gold-500 pr-4">
                    بحث في <span className="text-gold-500">المقال</span>
                  </h4>
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث عن مقال..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all font-medium text-navy-900 pr-12"
                    />
                    <Search className="absolute right-4 top-7 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="submit"
                      className="mt-4 w-full bg-navy-900 hover:bg-gold-500 text-white hover:text-navy-900 font-bold py-4 rounded-2xl transition-all shadow-lg text-xs uppercase tracking-widest">
                      بحث
                    </button>
                  </form>
                </div>

                {/* Latest News Widget */}
                <div className="bg-navy-900 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-gold-500/20 transition-all duration-500"></div>
                  <h4 className="headline-arabic text-xl font-black mb-8 relative z-10 border-r-4 border-gold-500 pr-4">
                    أحدث <span className="text-gold-500">الأخبار</span>
                  </h4>
                  <div className="space-y-6 relative z-10">
                    {latestArticles.map((latest) => (
                      <Link
                        key={latest.id}
                        href={`/article/${latest.slug}`}
                        className="flex gap-4 group/item">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                          <img
                            src={latest.thumbnail_url}
                            alt={latest.title}
                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-gold-400 text-[10px] font-black uppercase tracking-widest mb-1">
                            {latest.category.name}
                          </span>
                          <h5 className="text-sm font-bold leading-snug group-hover/item:text-gold-500 transition-colors line-clamp-2">
                            {latest.title}
                          </h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/articles"
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-gold-500 text-white hover:text-navy-900 font-bold py-4 rounded-2xl transition-all border border-white/10 hover:border-gold-500 text-xs uppercase tracking-widest">
                    عرض جميع المقالات
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
