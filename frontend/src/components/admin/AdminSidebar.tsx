'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Folder,
  Video,
  LogOut,
  Globe,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminSidebarProps {
  className?: string; // Allow custom classes for responsive control
  onLinkClick?: () => void; // Callback when a link is clicked
}

export default function AdminSidebar({
  className = '',
  onLinkClick,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // ... (rest of the component logic)

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin');
    if (onLinkClick) onLinkClick();
  };

  const menuItems = [
    {
      title: 'لوحة التحكم',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'إدارة المقالات',
      href: '/admin/articles',
      icon: FileText,
    },
    {
      title: 'إدارة الأقسام',
      href: '/admin/categories',
      icon: Folder,
    },
    {
      title: 'إدارة الأقسام الفرعية',
      href: '/admin/subcategories',
      icon: Folder,
    },
    {
      title: 'إدارة الفيديوهات',
      href: '/admin/videos',
      icon: Video,
    },
    {
      title: 'إدارة الفريق',
      href: '/admin/team',
      icon: Users,
    },
    {
      title: 'الإعدادات',
      href: '/admin/settings',
      icon: Globe,
    },
  ];

  return (
    <aside
      className={`w-64 bg-white border-l border-gray-100 flex-col h-screen sticky top-0 shadow-elegant z-40 ${className}`}>
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100 flex justify-center">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary-900 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-gray-900">
              لوحة الإدارة
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">
              News Website
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group font-medium ${
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
              <item.icon
                className={`w-5 h-5 transition-colors ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}
              />
              {item.title}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-gray-100">
          <a
            href="/"
            target="_blank"
            onClick={onLinkClick}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 font-medium">
            <Globe className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            زيارة الموقع
          </a>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-3 rounded-xl transition-all duration-200 font-medium">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
