'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function CinematicIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Check if intro was already shown in this session
    const introShown = sessionStorage.getItem('mlks-intro-shown');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (introShown || prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    setCanSkip(true);

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('mlks-intro-shown', 'true');
        setTimeout(() => setIsVisible(false), 300);
      },
    });

    timelineRef.current = tl;

    // Animation sequence with proper initial states
    tl.set('.intro-bg', { opacity: 1 })
      .set('.intro-pulse', { scale: 0, opacity: 0 })
      .set('.intro-package', { opacity: 0, scale: 0.5 })
      .set('.intro-destination', { opacity: 0, scale: 0 })
      .set('.intro-logo', { opacity: 0, y: 20 })
      .set('.intro-tagline', { opacity: 0, y: 20 })
      .to('.intro-pulse', {
        scale: 1.2,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to(
        '.intro-route-line',
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        '-=0.3'
      )
      .to(
        '.intro-package',
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.6'
      )
      .to(
        '.intro-destination',
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      )
      .to(
        '.intro-logo',
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.2'
      )
      .to(
        '.intro-tagline',
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to('.intro-content', {
        opacity: 0,
        duration: 0.4,
        delay: 0.8,
      })
      .to('.intro-panel-left', {
        x: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
      })
      .to(
        '.intro-panel-right',
        {
          x: '100%',
          duration: 0.8,
          ease: 'power3.inOut',
        },
        '<'
      );

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const skipIntro = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    sessionStorage.setItem('mlks-intro-shown', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-mlks-deep-indigo"
    >
      {/* Skip Button */}
      {canSkip && (
        <button
          onClick={skipIntro}
          className="absolute top-8 right-8 z-50 px-6 py-3 text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors duration-200 font-medium"
          aria-label="Skip intro"
        >
          Skip Intro
        </button>
      )}

      {/* Background */}
      <div className="intro-bg absolute inset-0 bg-mlks-deep-indigo" />

      {/* Content Container */}
      <div className="intro-content relative z-10 flex flex-col items-center justify-center">
        {/* Animated Route Visualization */}
        <svg
          className="w-64 h-64 md:w-80 md:h-80 mb-8"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Route Line */}
          <path
            className="intro-route-line"
            d="M 30 100 Q 70 60, 100 100 T 170 100"
            stroke="#FF7A1A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            fill="none"
          />

          {/* Start Pulse */}
          <circle
            className="intro-pulse"
            cx="30"
            cy="100"
            r="8"
            fill="#FF7A1A"
          />

          {/* Package Icon */}
          <g className="intro-package">
            <rect
              x="90"
              y="90"
              width="20"
              height="20"
              stroke="#39BFEF"
              strokeWidth="2"
              fill="none"
              rx="2"
            />
            <path d="M 90 100 L 110 100 M 100 90 L 100 110" stroke="#39BFEF" strokeWidth="2" />
          </g>

          {/* Destination Marker */}
          <g className="intro-destination">
            <circle cx="170" cy="100" r="10" fill="#0E9F6E" />
            <circle cx="170" cy="100" r="6" fill="white" />
          </g>
        </svg>

        {/* Logo */}
        <div className="intro-logo text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="text-mlks-orange">MLKS</span> Delivery
          </h1>
        </div>

        {/* Tagline */}
        <p className="intro-tagline text-white/90 text-lg md:text-xl text-center max-w-md px-4">
          Handled With Care. Delivered With Purpose.
        </p>
      </div>

      {/* Sliding Panels */}
      <div className="intro-panel-left absolute inset-y-0 left-0 w-1/2 bg-mlks-deep-indigo z-20" />
      <div className="intro-panel-right absolute inset-y-0 right-0 w-1/2 bg-mlks-deep-indigo z-20" />
    </div>
  );
}
