'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-right" dir="rtl">
      {/* Sidebar */}
      {/* Standard desktop sidebar */}
      <AdminSidebar />
      
      {/* Mobile sidebar placeholder - In a real app we'd pass props or use context */}
      {/* For now, relying on the 'hidden md:flex' classes in AdminSidebar for desktop. 
          Mobile implementation typically involves a drawer/overlay. 
          We can add a mobile implementation of the sidebar here if needed. */}
      {sidebarOpen && (
         <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl animate-slide-in-right">
                <AdminSidebar /> {/* Reusing the component, might need styling adjustments via props if it wasn't responsive friendly out of box */}
            </div>
         </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300">
        <AdminHeader toggleSidebar={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
