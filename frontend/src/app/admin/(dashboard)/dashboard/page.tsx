'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Folder,
  Video,
  Users,
  Activity,
  Inbox,
  Globe,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    categories: 0,
    videos: 0,
    users: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data: any = await apiClient.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-10 bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-8 text-white shadow-premium relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                أهلاً بك في لوحة الإدارة العامة
              </h2>
              <p className="text-primary-100 text-lg opacity-90">
                يمكنك هنا إدارة كل محتوى الموقع من مقالات، أقسام، وفيديوهات
                ومتابعة نشاط الموقع.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-4 rounded-xl transition font-medium border border-white/10">
                زيارة الموقع
              </Link>
              <Link
                href="/admin/articles/new"
                className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-4 rounded-xl transition font-medium shadow-lg hover:shadow-accent-500/30 border border-accent-400">
                + مقال جديد
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: 'المقالات',
              icon: FileText,
              value: loading ? '-' : stats.articles,
              color: 'bg-blue-50 text-blue-600',
            },
            {
              title: 'الأقسام',
              icon: Folder,
              value: loading ? '-' : stats.categories,
              color: 'bg-green-50 text-green-600',
            },
            {
              title: 'الفيديوهات',
              icon: Video,
              value: loading ? '-' : stats.videos,
              color: 'bg-purple-50 text-purple-600',
            },
            {
              title: 'المستخدمين',
              icon: Users,
              value: loading ? '-' : stats.users,
              color: 'bg-orange-50 text-orange-600',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100 items-center justify-between flex hover:-translate-y-1 transition-transform duration-300">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${stat.color} shadow-sm`}>
                <stat.icon className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-highlight-600 rounded-full block"></span>
            إجراءات سريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/articles"
              className="group bg-white hover:bg-primary-50 p-8 rounded-2xl border border-gray-100 shadow-elegant hover:shadow-premium transition-all duration-300 flex flex-col items-center text-center gap-4 relative overflow-hidden">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 mb-1">
                  إدارة المقالات
                </h3>
                <p className="text-gray-500 text-sm">
                  عرض، تعديل، وحذف المقالات
                </p>
              </div>
            </Link>

            <Link
              href="/admin/categories"
              className="group bg-white hover:bg-primary-50 p-8 rounded-2xl border border-gray-100 shadow-elegant hover:shadow-premium transition-all duration-300 flex flex-col items-center text-center gap-4 relative overflow-hidden">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Folder className="w-8 h-8" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 mb-1">
                  إدارة الأقسام
                </h3>
                <p className="text-gray-500 text-sm">تنظيم أقسام الموقع</p>
              </div>
            </Link>

            <Link
              href="/admin/videos"
              className="group bg-white hover:bg-primary-50 p-8 rounded-2xl border border-gray-100 shadow-elegant hover:shadow-premium transition-all duration-300 flex flex-col items-center text-center gap-4 relative overflow-hidden">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Video className="w-8 h-8" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 mb-1">
                  إدارة الفيديوهات
                </h3>
                <p className="text-gray-500 text-sm">
                  رفع وإدارة مكتبة الفيديو
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 pb-4 border-b border-gray-100">
            <Activity className="w-6 h-6 text-primary-600" /> النشاط الأخير (آخر
            المقالات)
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
            </div>
          ) : stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-2">
              {stats.recentActivity.map((activity: any) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${activity.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 font-bold mb-1 truncate group-hover:text-primary-600 transition-colors">
                      {activity.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Folder className="w-3 h-3" />
                        {activity.category?.name}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>
                        {new Date(activity.created_at).toLocaleDateString(
                          'ar-EG',
                        )}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span
                        className={
                          activity.status === 'published'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }>
                        {activity.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/admin/articles/${activity.id}/edit`}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                    title="تعديل">
                    <Globe className="w-5 h-5" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                <Inbox className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-900 font-medium">لا يوجد نشاط حديث</p>
              <p className="text-sm text-gray-500 mt-1">
                سجل النشاطات سيظهر هنا عند إضافة محتوى جديد
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
