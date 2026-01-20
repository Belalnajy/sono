'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response: any = await apiClient.login(
        formData.username,
        formData.password
      );
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(
        err.message || 'فشل تسجيل الدخول. تحقق من اسم المستخدم وكلمة المرور.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Back to Website Button */}
      <div className="absolute top-8 left-8 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-bold hover:bg-white/20 transition-all group shadow-xl">
          <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180" />
          <span>العودة للموقع</span>
        </Link>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-900 text-white rounded-2xl mb-6 shadow-lg shadow-primary-900/20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg
                className="w-10 h-10 text-accent-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              لوحة التحكم
            </h1>
            <p className="text-gray-500 text-sm">
              قم بتسجيل الدخول للوصول إلى أدوات الإدارة
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-r-4 border-highlight-600 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold text-gray-700 mb-2">
                اسم المستخدم
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition outline-none text-gray-800 font-medium"
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition outline-none text-gray-800 font-medium"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-800 to-primary-900 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-3.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-premium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <span className="group-hover:translate-x-[-4px] transition-transform">
                    ←
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-gray-400 hover:text-primary-600 font-medium text-sm transition-colors duration-200">
              ← العودة إلى الصفحة الرئيسية
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-primary-200/60 mt-8 text-xs font-light tracking-wide">
          © 2025 موقع الأخبار. جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  );
}
