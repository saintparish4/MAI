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
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Animated hamburger icon */}
              <motion.div
                className="relative w-6 h-6"
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Top line */}
                  <motion.line
                    x1="3" y1="6" x2="21" y2="6"
                    animate={{
                      y1: isMenuOpen ? 12 : 6,
                      y2: isMenuOpen ? 12 : 6,
                      rotate: isMenuOpen ? 45 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "12px 12px" }}
                  />
                  
                  {/* Middle line */}
                  <motion.line
                    x1="3" y1="12" x2="21" y2="12"
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      scaleX: isMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{ transformOrigin: "center" }}
                  />
                  
                  {/* Bottom line */}
                  <motion.line
                    x1="3" y1="18" x2="21" y2="18"
                    animate={{
                      y1: isMenuOpen ? 12 : 18,
                      y2: isMenuOpen ? 12 : 18,
                      rotate: isMenuOpen ? -45 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "12px 12px" }}
                  />
                </motion.svg>
              </motion.div>
            </motion.button>
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
