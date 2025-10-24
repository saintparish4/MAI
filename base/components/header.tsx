'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Animated nav link component with underline effect
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-[#1E1E1E] hover:text-[#3A7FD5] transition-colors font-semibold inline-block"
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isHovered ? '100%' : '0%', opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll position to background opacity (triggers at 24px)
  const backgroundColor = useTransform(
    scrollY,
    [0, 24],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 1)']
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 24],
    ['0 0 0 0 rgba(0, 0, 0, 0)', '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)']
  );

  return (
    <motion.header
      initial={{ y: -12, opacity: 0, filter: 'blur(4px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ backgroundColor, boxShadow }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="text-2xl font-light text-[#1E1E1E] lowercase tracking-wide">
              nora
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/find-doctor">Find a Doctor</NavLink>
            <NavLink href="/telehealth">Telehealth</NavLink>
            <NavLink href="/for-providers">For Providers</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/login">Log In</NavLink>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] text-white px-7 py-3 rounded-lg font-semibold transition-colors hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#1E1E1E] hover:text-[#3A7FD5] transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <Link
                href="/find-doctor"
                className="block px-3 py-2 text-[#1E1E1E] hover:text-[#3A7FD5] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find a Doctor
              </Link>
              <Link
                href="/telehealth"
                className="block px-3 py-2 text-[#1E1E1E] hover:text-[#3A7FD5] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Telehealth
              </Link>
              <Link
                href="/for-providers"
                className="block px-3 py-2 text-[#1E1E1E] hover:text-[#3A7FD5] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                For Providers
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-[#1E1E1E] hover:text-[#3A7FD5] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="block px-3 py-2 text-[#1E1E1E] hover:text-[#3A7FD5] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 bg-[#F47C6B] text-white rounded-md hover:bg-[#3A7FD5] transition-colors mx-3 mt-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </motion.header>
  );
}
