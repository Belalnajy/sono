'use client';

import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '@/types';

// Import Slick CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface HeroSliderProps {
  articles: Article[];
}

export default function HeroSlider({ articles }: HeroSliderProps) {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Take top 5 articles for the slider
  const slides = articles.slice(0, 5);

  // Progress bar animation
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 100 / 60; // 6000ms / 100ms intervals = 60 steps
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isPlaying,
    autoplaySpeed: 6000,
    arrows: false,
    fade: false, // Changed from true to false to fix image visibility
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    pauseOnHover: true,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
      setProgress(0);
    },
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
        }}>
        <ul className="flex gap-2 p-0 m-0 items-center glass-card-dark px-4 py-2 rounded-full">
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white transition-all duration-300 slider-dot-custom" />
    ),
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
    setProgress(0);
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      sliderRef.current?.slickPause();
    } else {
      sliderRef.current?.slickPlay();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  if (!slides.length) return null;

  return (
    <div className="relative group w-full h-[550px] md:h-[750px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-100/50">
      <Slider ref={sliderRef} {...settings} className="h-full hero-slider">
        {slides.map((article, index) => (
          <div
            key={article.id}
            className="relative h-[550px] md:h-[750px] outline-none">
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden">
              {article.thumbnail_url ? (
                <img
                  src={article.thumbnail_url}
                  alt={article.title}
                  className={`w-full h-full object-cover ${
                    index % 2 === 0 ? 'ken-burns-zoom' : 'ken-burns-pan'
                  }`}
                  onError={(e) => {
                    console.error(
                      `Failed to load image for article ${index}:`,
                      article.thumbnail_url,
                    );
                  }}
                  onLoad={() => {
                    console.log(
                      `Image loaded successfully for article ${index}:`,
                      article.thumbnail_url,
                    );
                  }}
                />
              ) : (
                /* Fallback gradient for articles without images */
                <div
                  className={`w-full h-full bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 ${
                    index % 2 === 0 ? 'ken-burns-zoom' : 'ken-burns-pan'
                  }`}>
                  {/* Medical pattern overlay */}
                  <div className="absolute inset-0 bg-medical-pattern opacity-10"></div>
                  {/* Category-based accent */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 via-transparent to-skyblue-500/20"></div>
                </div>
              )}
              {/* Gradient Overlays - Layered for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-navy-900/10 opacity-30 mix-blend-multiply"></div>
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
                <div className="max-w-3xl">
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4 md:mb-6 flex items-center gap-2 md:gap-3 flex-wrap">
                    <span className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg">
                      {article.category.name}
                    </span>
                    <div className="flex items-center gap-2 text-gray-200 text-xs md:text-sm glass-card px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                      <Clock className="w-3 md:w-4 h-3 md:h-4" />
                      <span className="hidden sm:inline">
                        {new Date(article.created_at).toLocaleDateString(
                          'ar-EG',
                          {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          },
                        )}
                      </span>
                      <span className="sm:hidden">
                        {new Date(article.created_at).toLocaleDateString(
                          'ar-EG',
                          {
                            month: 'short',
                            day: 'numeric',
                          },
                        )}
                      </span>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="headline-arabic text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight mb-4 md:mb-6 drop-shadow-2xl">
                    <Link
                      href={`/article/${article.slug}`}
                      className="hover:text-gold-200 transition-colors">
                      {article.title}
                    </Link>
                  </motion.h2>

                  {/* Excerpt */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-100 text-base md:text-lg lg:text-xl line-clamp-2 md:line-clamp-3 mb-6 md:mb-8 leading-relaxed max-w-2xl">
                    {article.content.replace(/<[^>]*>/g, '').substring(0, 200)}
                    ...
                  </motion.p>

                  {/* Action Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}>
                    <Link
                      href={`/article/${article.slug}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-skyblue-500 to-skyblue-600 hover:from-skyblue-600 hover:to-skyblue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold transition-all shadow-lg hover:shadow-glow-blue group/btn ring-2 ring-white/20 text-sm md:text-base">
                      اقرأ المقال
                      <ArrowLeft className="w-4 md:w-5 h-4 md:h-5 group-hover/btn:-translate-x-1 transition-transform rotate-180" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Enhanced Controls Container */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 flex gap-2 md:gap-3 z-10">
        {/* Navigation Arrows */}
        <button
          onClick={nextSlide}
          className="w-10 h-10 md:w-12 md:h-12 glass-card-dark hover:bg-gold-500 border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-glow-gold group/arrow"
          aria-label="Previous Slide">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover/arrow:scale-110 transition-transform" />
        </button>
        <button
          onClick={prevSlide}
          className="w-10 h-10 md:w-12 md:h-12 glass-card-dark hover:bg-gold-500 border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-glow-gold group/arrow"
          aria-label="Next Slide">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover/arrow:scale-110 transition-transform" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 md:w-12 md:h-12 glass-card-dark hover:bg-skyblue-500 border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-glow-blue"
          aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <Pause className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />
          )}
        </button>
      </div>

      {/* Slide Counter with Progress Ring */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10">
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          {/* Progress Ring */}
          <svg
            className="w-12 h-12 md:w-16 md:h-16 progress-ring"
            viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#BF9B50"
              strokeWidth="4"
              className="progress-ring-circle"
              style={{
                strokeDashoffset: 283 - (283 * progress) / 100,
              }}
            />
          </svg>
          {/* Counter */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-bold text-xs md:text-sm">
              <span className="text-gold-400">{currentSlide + 1}</span>
              <span className="text-white/60 text-[10px] md:text-xs">
                /{slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Badge */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 z-10 hidden sm:block">
        <div className="glass-card-dark text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl font-bold text-xs md:text-sm shadow-lg flex items-center gap-2 glow-pulse">
          <TrendingUp className="w-3 md:w-4 h-3 md:h-4" />
          <span>أهم الأخبار</span>
        </div>
      </div>

      {/* Linear Progress Bar (Alternative) */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-white/10 z-10">
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
