import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mlks-indigo to-mlks-deep-indigo flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-mlks-orange mb-4">404</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </p>
        </div>

        {/* Visual Element */}
        <div className="mb-12">
          <svg
            className="w-64 h-64 mx-auto opacity-20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3L8 3L16 21L21 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-mlks-orange"
            />
            <circle cx="8" cy="3" r="2" fill="currentColor" className="text-mlks-orange" />
            <circle cx="21" cy="21" r="2" fill="currentColor" className="text-mlks-cyan" />
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg" className="group">
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-mlks-indigo">
              <Search className="w-5 h-5 mr-2" />
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
