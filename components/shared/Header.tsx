'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils/helpers';
import Button from '../ui/Button';

interface HeaderProps {
  settings?: {
    primaryPhone?: string;
    email?: string;
    officeHours?: string;
  };
}

export default function Header({ settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/booking', label: 'Booking' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

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
            href="/booking"
            className="text-mlks-orange hover:text-mlks-orange-dark font-medium transition-colors"
          >
            Request Delivery →
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={cn(
          'transition-all duration-300',
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="/images/logo.png" 
                alt="MLKS Delivery Solutions" 
                className="h-16 md:h-20 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-mlks-ink hover:text-mlks-orange transition-colors font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mlks-orange group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link href="/booking">
                <Button variant="primary" size="md">
                  Request a Delivery
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-mlks-indigo hover:text-mlks-orange transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-mlks-ink hover:text-mlks-orange transition-colors font-medium py-2 border-b border-gray-100"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="primary" size="md" className="w-full">
              Request a Delivery
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
