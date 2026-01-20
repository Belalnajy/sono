'use client';

import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageLinks = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      pages.push(
        <Link
          key={i}
          href={createPageURL(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
            isActive
              ? 'bg-gold-500 text-white shadow-glow-gold'
              : 'bg-white text-navy-900 border border-gray-100 hover:border-gold-500 hover:text-gold-500 shadow-sm'
          }`}>
          {i}
        </Link>,
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <Link
        href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
        className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm transition-all ${
          currentPage > 1
            ? 'text-navy-900 hover:border-gold-500 hover:text-gold-500'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-disabled={currentPage <= 1}>
        <ChevronRight className="w-5 h-5" />
      </Link>

      <div className="flex items-center gap-2">{renderPageLinks()}</div>

      <Link
        href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
        className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm transition-all ${
          currentPage < totalPages
            ? 'text-navy-900 hover:border-gold-500 hover:text-gold-500'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-disabled={currentPage >= totalPages}>
        <ChevronLeft className="w-5 h-5" />
      </Link>
    </div>
  );
}
