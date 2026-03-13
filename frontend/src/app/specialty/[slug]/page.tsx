import { apiClient } from '@/lib/api-client';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Hospital as HospitalIcon,
} from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Specialty } from '@/types';

export const dynamic = 'force-dynamic';

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const specialty = (await apiClient.getSpecialtyBySlug(slug)) as Specialty;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header Section */}
      <section className="bg-navy-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#BF9B50_1px,transparent_1px)] [background-size:30px_30px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            العودة للرئيسية
          </Link>
          <h1 className="headline-arabic text-5xl md:text-6xl text-white mb-6">
            {(specialty as any).name}
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg headline-arabic leading-relaxed">
            استعرض قائمة المستشفيات والمراكز الطبية المتخصصة في{' '}
            {(specialty as any).name} الموثوقة لدينا.
          </p>
        </div>
      </section>

      {/* Hospitals List */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(specialty as any).hospitals?.map((hospital: any) => (
            <AnimatedSection key={hospital.id}>
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-elegant hover:shadow-premium transition-all duration-500 border border-gray-100 group h-full flex flex-col">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600 flex-shrink-0">
                      <HospitalIcon className="w-6 h-6" />
                    </div>
                    <span className="bg-gold-500/10 text-gold-600 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                      مستشفى متخصص
                    </span>
                  </div>

                  <h3 className="headline-arabic text-2xl font-bold text-navy-900 mb-4 group-hover:text-gold-600 transition-colors">
                    {hospital.name}
                  </h3>

                  <div className="space-y-4 mb-8">
                    {hospital.address && (
                      <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                        <span className="line-clamp-1">{hospital.address}</span>
                      </div>
                    )}
                    {hospital.phone && (
                      <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                        <span>{hospital.phone}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-3 mb-8 leading-relaxed headline-arabic">
                    {hospital.description.replace(/<[^>]*>/g, '')}
                  </p>

                  <Link
                    href={`/hospital/${hospital.slug}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-gold-500 text-white hover:text-navy-900 px-6 py-4 rounded-2xl font-bold transition-all group/btn">
                    عرض التفاصيل
                    <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform rotate-180" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {((specialty as any).hospitals?.length || 0) === 0 && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-elegant border border-gray-100">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
              <HospitalIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="headline-arabic text-2xl text-navy-900 mb-2">
              لا توجد مستشفيات مضافة بعد
            </h3>
            <p className="text-gray-500">
              تحقق مرة أخرى قريباً للحصول على قائمة محدثة بالمراكز المتخصصة.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
