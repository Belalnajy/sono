'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { ReactNode } from 'react';

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

export default function HeroSection({
  children,
  className = '',
  paddingTop = 'pt-12',
  paddingBottom = 'pb-24',
}: HeroSectionProps) {
  const { isLight } = useTheme();

  return (
    <section
      className={`relative ${paddingTop} ${paddingBottom} overflow-hidden transition-colors duration-500 ${
        isLight
          ? 'bg-white'
          : 'bg-[#0b121e]'
      } ${className}`}>
      {/* Architectural Background Elements - Only show in dark mode */}
      {!isLight && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b,transparent_40%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(11,18,30,0.8),#0b121e)] z-0"></div>
          {/* Animated Orbs */}
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-skyblue-500/10 rounded-full blur-[120px] -z-10"></div>
        </>
      )}

      {/* Light mode subtle background */}
      {isLight && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#f8fafc,transparent_60%)]"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-skyblue-500/5 rounded-full blur-[120px] -z-10"></div>
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </section>
  );
}

// Helper component for hero text that changes based on theme
export function HeroTitle({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isLight } = useTheme();

  return (
    <h1
      className={`headline-arabic transition-colors duration-500 ${
        isLight ? 'text-navy-900' : 'text-white'
      } ${className}`}>
      {children}
    </h1>
  );
}

export function HeroSubtitle({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isLight } = useTheme();

  return (
    <p
      className={`transition-colors duration-500 ${
        isLight ? 'text-gray-600' : 'text-gray-400'
      } ${className}`}>
      {children}
    </p>
  );
}

export function HeroLabel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isLight } = useTheme();

  return (
    <span
      className={`font-black tracking-widest text-xs uppercase transition-colors duration-500 ${
        isLight ? 'text-gold-600' : 'text-gold-400'
      } ${className}`}>
      {children}
    </span>
  );
}

export function HeroAccentBar({ className = '' }: { className?: string }) {
  return (
    <span
      className={`w-12 h-1.5 bg-gold-500 rounded-full ${className}`}></span>
  );
}

// Component for glass-style cards in hero section
export function HeroGlassCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isLight } = useTheme();

  return (
    <div
      className={`backdrop-blur-md rounded-2xl border transition-colors duration-500 ${
        isLight
          ? 'bg-navy-900/5 border-navy-900/10'
          : 'bg-white/5 border-white/10'
      } ${className}`}>
      {children}
    </div>
  );
}

