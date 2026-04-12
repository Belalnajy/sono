import { apiClient } from '@/lib/api-client';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Calendar,
  Clock,
  Stethoscope,
  Activity,
  Zap,
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

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">المستشفى غير موجودة</h1>
          <Link href="/" className="text-gold-500 hover:underline">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header Section */}
      <section className="bg-navy-900 pt-40 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#BF9B50_1px,transparent_1px)] [background-size:30px_30px]"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-500/10 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href={`/specialty/${(hospital as any).specialty?.slug}`}
            className="inline-flex items-center gap-2 text-gold-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            تخصص {(hospital as any).specialty?.name}
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="headline-arabic text-4xl md:text-7xl text-white font-black mb-6 leading-tight">
                {hospital.name}
              </h1>
              <div className="flex flex-wrap gap-4">
                {hospital.phone && (
                  <a
                    href={`tel:${hospital.phone}`}
                    className="inline-flex items-center gap-3 bg-white/10 hover:bg-gold-500 text-white hover:text-navy-900 px-6 py-3 rounded-2xl backdrop-blur-md transition-all font-bold border border-white/10 headline-arabic">
                    <Phone className="w-5 h-5" />
                    تواصل الآن: <span dir="ltr">{hospital.phone}</span>
                  </a>
                )}
                {hospital.website && (
                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gold-500 hover:bg-white text-navy-900 px-6 py-3 rounded-2xl transition-all font-bold headline-arabic">
                    <Globe className="w-5 h-5" />
                    زيارة الموقع الرسمي
                  </a>
                )}
              </div>
            </div>
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
                <h2 className="headline-arabic text-3xl text-navy-900 mb-8 border-r-8 border-gold-500 pr-6 flex items-center gap-3">
                  <Activity className="text-gold-500" />
                  عن المستشفى (نبذة)
                </h2>
                <div
                  className="headline-arabic text-gray-600 leading-relaxed space-y-6 text-lg"
                  dangerouslySetInnerHTML={{ __html: hospital.description }}
                />
              </div>
            </AnimatedSection>

            {/* Technologies Section */}
            {hospital.technologies && hospital.technologies.length > 0 && (
              <AnimatedSection className="mt-20">
                <div className="bg-navy-900 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
                  {/* Background Accents */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                  <div className="relative z-10">
                    <h2 className="headline-arabic text-3xl text-white mb-10 border-r-8 border-gold-500 pr-6 flex items-center gap-4">
                      <Zap className="text-gold-500 w-8 h-8" />
                      أحدث التقنيات والتجهيزات
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {hospital.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-[2rem] border border-white/10 group hover:bg-gold-500 transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-white group-hover:text-navy-900 transition-colors">
                            <Zap className="w-5 h-5 fill-current" />
                          </div>
                          <span className="headline-arabic text-xl text-white/90 group-hover:text-navy-900 font-medium transition-colors">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Features/Stats Section (Visual Polish) */}
            {/* <div className="grid  gap-8 mt-10 ">
              {[
                
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 text-center group hover:bg-gold-50 transition-colors shadow-elegant">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white flex items-center justify-center text-gold-500 shadow-sm transition-transform group-hover:scale-110">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-navy-900 mb-1">{item.label}</h4>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div> */}
          </div>

          {/* sidebar */}
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
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                      <a
                        href={`tel:${hospital.phone}`}
                        dir="ltr"
                        className="text-xl font-medium hover:text-gold-400 transition-colors">
                        {hospital.phone || 'غير متوفر'}
                      </a>
                    </div>
                  </div>

                  <div className="group">
                    <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">
                      الموقع الإلكتروني
                    </p>
                    {hospital.website ? (
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-gold-500 flex-shrink-0" />
                        <a
                          href={hospital.website}
                          target="_blank"
                          dir="ltr"
                          className="text-xl font-medium hover:text-gold-400 transition-colors truncate">
                          زيارة الموقع
                        </a>
                      </div>
                    ) : (
                      <span className="text-white/50">غير متوفر</span>
                    )}
                  </div>

                  {hospital.working_hours && (
                    <div className="group">
                      <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">
                        ساعات العمل
                      </p>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                        <span className="text-lg font-medium leading-relaxed">
                          {hospital.working_hours}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Related/Back Link */}
              <Link
                href="/"
                className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 hover:bg-gray-100 transition-all group">
                <span className="font-bold text-navy-900">العودة للرئيسية</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white transition-all shadow-sm">
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
