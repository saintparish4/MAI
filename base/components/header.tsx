'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="relative text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm group"
    >
      {children}
      <div className="absolute -bottom-1 left-0 h-px bg-gray-900 w-0 group-hover:w-full transition-all duration-200" />
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect with native JavaScript
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-100 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md' 
          : 'bg-white/0 backdrop-blur-none'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="hover:scale-105 transition-transform duration-200">
            <Link href="/" className="text-xl font-light text-gray-900">
              nora
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/booking/symptoms">Book</NavLink>
            <NavLink href="/providers">Providers</NavLink>
            <NavLink href="/for-providers">For Providers</NavLink>
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/login">Sign In</NavLink>
            <Link
              href="/signup"
              className="px-4 py-2 bg-gray-900 text-white font-medium text-sm rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors active:scale-95 hover:scale-105"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {/* Unique 9-dot grid menu icon */}
              <div className={`relative w-6 h-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                <svg
                  className="w-full h-full [transform-box:fill-box]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {/* Row 1 */}
                  <circle cx="6" cy="6" r="1.6" className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-70 [transition-delay:0ms]' : 'opacity-100'}`} />
                  <circle cx="12" cy="6" r="1.6" className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-80 [transition-delay:50ms]' : 'opacity-100'}`} />
                  <circle cx="18" cy="6" r="1.6" className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-70 [transition-delay:100ms]' : 'opacity-100'}`} />

                  {/* Row 2 */}
                  <circle cx="6" cy="12" r="1.6" className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-80 [transition-delay:150ms]' : 'opacity-100'}`} />
                  <circle cx="12" cy="12" r="1.6" className={`transition-all duration-300 ease-out origin-center ${isMenuOpen ? 'scale-125 opacity-100 [transition-delay:200ms]' : 'scale-100 opacity-100'}`} />
                  <circle cx="18" cy="12" r="1.6" className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-80 [transition-delay:250ms]' : 'opacity-100'}`} />

                  {/* Row 3 */}
                  <circle cx="6" cy="18" r="1.6" className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-70 [transition-delay:300ms]' : 'opacity-100'}`} />
                  <circle cx="12" cy="18" r="1.6" className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-80 [transition-delay:350ms]' : 'opacity-100'}`} />
                  <circle cx="18" cy="18" r="1.6" className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-70 [transition-delay:400ms]' : 'opacity-100'}`} />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="px-0 pt-4 pb-6 space-y-1 bg-white border-t border-gray-100">
                <Link
                  href="/booking/symptoms"
                  className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Appointment
                </Link>
                <Link
                  href="/providers"
                  className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find Providers
                </Link>
                <Link
                  href="/for-providers"
                  className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Providers
                </Link>
                <Link
                  href="/how-it-works"
                  className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/login"
                  className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <div className="pt-2 px-4">
                  <Link
                    href="/signup"
                    className="block px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-center font-medium text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
