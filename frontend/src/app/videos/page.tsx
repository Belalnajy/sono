import { apiClient } from '@/lib/api-client';
import { Video as VideoType } from '@/types';
import { Play, Calendar, Video, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

async function getVideos() {
  try {
    const videos = await apiClient.getVideos();
    return videos as VideoType[];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

function getYouTubeEmbedUrl(url: string) {
  const videoId = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
  )?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-soft-tint">
      {/* Hero Section - Cinematic Navy */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#0b121e]">
        {/* Architectural Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1e293b,transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>

        {/* Floating Orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-skyblue-500/10 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-6 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <div className="w-2 h-2 rounded-full bg-gold-500 animate-ping"></div>
              <span className="text-gold-400 font-black text-xs uppercase tracking-widest">
                المحتوى المرئي
              </span>
            </div>
            <h1 className="headline-arabic text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              مكتبة <span className="text-gold-500">سونو</span> للفيديو
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
              شاهد نخبة من خبراء الطب يتحدثون عن أحدث الأبحاث والدراسات الطبية،
              بطريقة مبسطة واحترافية تصل بك إلى الفهم الأعمق لصحتك.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 -mt-12 relative z-20">
        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group bg-white rounded-[2.5rem] shadow-premium overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {/* Video Player */}
              <div className="relative aspect-video overflow-hidden group-hover:shadow-glow-gold transition-all duration-500">
                <iframe
                  src={getYouTubeEmbedUrl(video.video_url)}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-navy-900/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
              </div>

              {/* Video Info */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gold-50 text-gold-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-gold-100">
                    {video.category.name}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                    <Calendar className="w-3.5 h-3.5 text-gold-500" />
                    {new Date(video.created_at).toLocaleDateString('ar-EG')}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-navy-900 mb-4 group-hover:text-gold-600 transition-colors leading-tight line-clamp-2 h-14">
                  {video.title}
                </h3>

                {video.description && (
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-medium mb-6">
                    {video.description}
                  </p>
                )}

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-navy-900 font-black text-xs uppercase tracking-widest group/btn">
                    شاهد الآن
                    <Play className="w-4 h-4 fill-gold-500 text-gold-500 group-hover/btn:scale-125 transition-transform" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Video className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] shadow-premium border border-gray-100 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-navy-900 mb-2">
              لا توجد فيديوهات
            </h3>
            <p className="text-gray-500 font-medium">
              نعمل حالياً على تجهيز محتوى مرئي جديد لك
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-32">
        <div className="bg-navy-900 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <h2 className="headline-arabic text-3xl md:text-5xl text-white font-black mb-8 leading-tight">
              هل تفضل القراءة؟ <br />{' '}
              <span className="text-gold-500">استودع</span> مقالاتنا الطبية
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-medium">
              لدينا أكثر من 1000 مقال طبي مراجع من قبل الأطباء المتخصصين في
              مختلف المجالات.
            </p>
            <a
              href="/articles"
              className="inline-flex items-center gap-4 bg-gold-500 hover:bg-white text-navy-900 px-10 py-5 rounded-2xl font-black transition-all shadow-glow-gold">
              تصفح المقالات
              <ArrowRight className="w-6 h-6 rotate-180" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
