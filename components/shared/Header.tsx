'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/helpers';
import Button from '../ui/Button';

interface HeaderProps {
  settings?: {
    primaryPhone?: string;
    email?: string;
    officeHours?: string;
  };
}

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/industries', label: 'Industries' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const moreLinks = [
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/shop', label: 'Shop' },
  { href: '/faqs', label: 'FAQs' },
];

export default function Header({ settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass =
    'text-mlks-ink hover:text-mlks-orange transition-colors font-medium text-sm whitespace-nowrap relative group';

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Utility Bar */}
      <div
        className={cn(
          'bg-mlks-deep-indigo text-white text-sm transition-all duration-300',
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto py-2'
        )}
      >
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            {settings?.primaryPhone && (
              <a
                href={`tel:${settings.primaryPhone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 hover:text-mlks-orange transition-colors"
              >
                <Phone size={14} />
                <span>{settings.primaryPhone}</span>
              </a>
            )}
            {settings?.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 hover:text-mlks-orange transition-colors"
              >
                <Mail size={14} />
                <span className="hidden sm:inline">{settings.email}</span>
              </a>
            )}
          </div>
          {settings?.officeHours && (
            <span className="hidden md:inline text-xs text-white/80">{settings.officeHours}</span>
          )}
          <Link
            href="/track"
            className="text-mlks-orange hover:text-mlks-orange-dark font-medium transition-colors whitespace-nowrap"
          >
            Track My Delivery →
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={cn(
          'transition-all duration-300',
          isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-[72px] lg:h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <img
                src="/images/logo.png"
                alt="MLKS Delivery Solutions"
                className="h-12 lg:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-5 flex-1 justify-center min-w-0">
              {primaryLinks.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkClass}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mlks-orange group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              {/* More dropdown — FAQs, Shop, Service Areas live here */}
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={cn(navLinkClass, 'inline-flex items-center gap-1')}
                  aria-expanded={isMoreOpen}
                  aria-haspopup="true"
                >
                  More
                  <ChevronDown
                    size={14}
                    className={cn('transition-transform', isMoreOpen && 'rotate-180')}
                  />
                </button>
                {isMoreOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMoreOpen(false)}
                        className="block px-4 py-2.5 text-sm text-mlks-ink hover:bg-mlks-ice hover:text-mlks-orange transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
              <Link href="/track">
                <Button variant="outline" size="sm">
                  Track Delivery
                </Button>
              </Link>
              <Link href="/become-a-partner">
                <Button variant="primary" size="sm">
                  Become a Partner
                </Button>
              </Link>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-mlks-indigo hover:text-mlks-orange transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      <div
        className={cn(
          'xl:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-[85vh] overflow-y-auto opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-1">
          {[...primaryLinks, ...moreLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-mlks-ink hover:text-mlks-orange transition-colors font-medium py-3 border-b border-gray-100"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/track" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" size="md" className="w-full">
                Track Delivery
              </Button>
            </Link>
            <Link href="/become-a-partner" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Become a Partner
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
