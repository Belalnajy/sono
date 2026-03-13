import { apiClient } from '@/lib/api-client';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Calendar,
  Clock,
  Stethoscope,
} from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Hospital } from '@/types';

export const dynamic = 'force-dynamic';

export default async function HospitalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hospital = (await apiClient.getHospitalBySlug(slug)) as Hospital;

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header Section */}
      <section className="bg-navy-900 pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#BF9B50_1px,transparent_1px)] [background-size:30px_30px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href={`/specialty/${(hospital as any).specialty?.slug}`}
            className="inline-flex items-center gap-2 text-gold-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            تخصص {(hospital as any).specialty?.name}
          </Link>
          <h1 className="headline-arabic text-5xl md:text-7xl text-white font-black mb-6">
            {(hospital as any).name}
          </h1>
          <div className="flex items-center gap-3 text-white/70">
            <MapPin className="w-5 h-5 text-gold-500" />
            <span className="text-xl headline-arabic font-medium">
              {hospital.address || 'العنوان غير متوفر'}
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimatedSection>
              <div className="prose prose-xl prose-navy max-w-none">
                <h2 className="headline-arabic text-4xl text-navy-900 mb-8 border-r-8 border-gold-500 pr-6">
                  عن المستشفى
                </h2>
                <div
                  className="headline-arabic text-gray-600 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: hospital.description }}
                />
              </div>
            </AnimatedSection>

            {/* Features/Stats Section (Visual Polish) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: Clock,
                  label: 'رعاية على مدار الساعة',
                  sub: '24/7 طوارئ',
                },
                { icon: Calendar, label: 'تحديد مواعيد', sub: 'سهولة الحجز' },
                {
                  icon: Stethoscope,
                  label: 'أحدث التقنيات',
                  sub: 'تجهيزات عالمية',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 text-center group hover:bg-gold-50 transition-colors">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white flex items-center justify-center text-gold-500 shadow-sm transition-transform group-hover:scale-110">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-navy-900 mb-1">{item.label}</h4>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              {/* Quick Info Card */}
              <div className="bg-navy-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl"></div>

                <h3 className="headline-arabic text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-gold-500 rounded-full"></span>
                  معلومات التواصل
                </h3>

                <div className="space-y-8 relative z-10">
                  <div className="group">
                    <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">
                      رقم الهاتف
                    </p>
                    <a
                      href={`tel:${(hospital as any).phone}`}
                      className="text-xl font-medium hover:text-gold-400 transition-colors">
                      {(hospital as any).phone || 'غير متوفر'}
                    </a>
                  </div>

                  <div className="group">
                    <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">
                      الموقع الإلكتروني
                    </p>
                    {(hospital as any).website ? (
                      <a
                        href={(hospital as any).website}
                        target="_blank"
                        className="flex items-center gap-2 text-xl font-medium hover:text-gold-400 transition-colors">
                        <Globe className="w-5 h-5" />
                        زيارة الموقع
                      </a>
                    ) : (
                      <span className="text-white/50">غير متوفر</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Related/Back Link */}
              <Link
                href="/"
                className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 hover:bg-gray-100 transition-all group">
                <span className="font-bold text-navy-900">العودة للرئيسية</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white transition-all">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
