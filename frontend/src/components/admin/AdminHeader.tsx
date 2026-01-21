'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Menu } from 'lucide-react';

export default function AdminHeader({
  toggleSidebar,
}: {
  toggleSidebar?: () => void;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 h-20 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left Side: Toggle & Title (for mobile mainly, or context) */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-gray-800 hidden md:block">
          مرحباً بك،{' '}
          <span className="text-primary-600">{user?.username || 'Admin'}</span>{' '}
          👋
        </h2>
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
          <Search className="w-4 h-4 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="بحث..."
            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-gray-700"
          />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-r border-gray-100 mr-2 pr-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
            {user?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-gray-800 leading-tight">
              {user?.username || 'Admin'}
            </p>
            <p className="text-xs text-gray-500">مدير النظام</p>
          </div>
        </div>
      </div>
    </header>
  );
}
