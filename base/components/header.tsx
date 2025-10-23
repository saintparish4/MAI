'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState(0);
  
  const specialties = [
    'dermatologists',
    'doctors',
    'OB-GYNs',
    'dentists',
    'cardiologists',
    'psychiatrists',
    'orthopedists',
    'pediatricians'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-blue-50">
      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/favicon.ico" 
                alt="Sana Health" 
                className="w-6 h-6 -mt-1"
              />
              <span className="text-xl font-bold text-gray-800">Sana Health</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/browse" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium flex items-center"
            >
              Browse
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link 
              href="/help" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Help
            </Link>
            <Link 
              href="/list-practice" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              List your practice on SanaHealth
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium flex items-center"
            >
              Log in
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link
              href="/signup"
              className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors font-medium"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link
                href="/browse"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                href="/help"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              <Link
                href="/list-practice"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                List your practice on SanaHealth
              </Link>
              <div className="border-t border-gray-200 pt-4">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition-colors mx-3 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Book local{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSpecialty}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-gray-800 inline-block"
                >
                  {specialties[currentSpecialty]}
                </motion.span>
              </AnimatePresence>
              <br />
              who take your insurance
            </h1>
          </div>

          {/* Search Bar */}
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="flex">
                {/* Search Section */}
                <div className="flex-1 hover:bg-gray-200 transition-colors cursor-pointer">
                  <div className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-700 mb-1">Search</div>
                    <div className="text-gray-500">Condition, procedure, or doctor name</div>
                  </div>
                </div>

                {/* Separator */}
                <div className="w-px bg-gray-200 my-4"></div>

                {/* Location Section */}
                <div className="flex-1 hover:bg-gray-200 transition-colors cursor-pointer">
                  <div className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-700 mb-1">Location</div>
                    <div className="text-gray-500">City, ZIP code</div>
                  </div>
                </div>

                {/* Separator */}
                <div className="w-px bg-gray-200 my-4"></div>

                {/* Insurance Section */}
                <div className="flex-1 hover:bg-gray-200 transition-colors cursor-pointer">
                  <div className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-700 mb-1">Add insurance</div>
                    <div className="text-gray-500">Insurance carrier and plan</div>
                  </div>
                </div>

                {/* Find Care Button */}
                <div className="flex items-center px-4">
                  <button className="bg-yellow-400 text-gray-800 px-8 py-5 hover:bg-yellow-500 transition-colors font-medium flex items-center rounded-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Find care
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
