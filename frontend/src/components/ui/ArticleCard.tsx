import Link from 'next/link';
import { Article } from '@/types';
import { Clock, ArrowLeft } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden shadow-elegant hover:shadow-premium transition-all duration-500 border border-gray-100/50 hover:border-gold-200/50 relative h-full flex flex-col">
      <div className="relative h-60 overflow-hidden">
        <img
          src={article.thumbnail_url || '/placeholder-medical.jpg'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10">
            {article.category.name}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {new Date(article.created_at).toLocaleDateString('ar-EG', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <h3 className="headline-arabic text-xl text-navy-900 mb-4 leading-snug font-bold line-clamp-2 group-hover:text-gold-600 transition-colors">
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed flex-1">
          {article.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
        </p>

        <Link
          href={`/article/${article.slug}`}
          className="inline-flex items-center gap-2 text-navy-900 hover:text-gold-600 font-black text-xs uppercase tracking-widest transition-all group/link underline decoration-gold-200 underline-offset-8 hover:decoration-gold-500 hover:gap-3">
          اقرأ المقال
          <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform rotate-180" />
        </Link>
      </div>
    </article>
  );
}
