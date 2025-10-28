'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="relative text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 h-px bg-gray-900"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 20],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 20],
    ['blur(0px)', 'blur(20px)']
  );

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100"
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="text-xl font-light text-gray-900">
              nora
            </Link>
          </motion.div>

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
              className="text-gray-700 hover:text-gray-900 transition-colors p-2"
              aria-label="Toggle menu"
            >
              <motion.svg 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
