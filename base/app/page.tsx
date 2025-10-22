'use client';

import { useAuth } from '@/lib/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <img src="/favicon.ico" alt="Sana Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-[#CC342D]">Sana</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/providers"
                  className="text-gray-700 hover:text-[#CC342D] font-medium"
                >
                  Browse
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-[#CC342D] font-medium"
                >
                  Help
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-[#CC342D] font-medium"
                >
                  List your practice on Sana Health
                </Link>
              </div>
              <span className="hidden md:inline text-gray-300">|</span>
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-[#CC342D] font-medium px-4 py-2"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#CC342D] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#9B2226] transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#F4E8C1] text-[#9B2226] text-sm font-semibold px-4 py-2 rounded-full mb-6">
                Trusted by thousands of patients
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Book appointments with healthcare providers
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find and book top-rated healthcare professionals in your area. From physical therapy to mental health counseling, get the care you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="inline-block text-center bg-[#CC342D] text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-[#9B2226] transition-colors shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/providers"
                  className="inline-block text-center border-2 border-[#CC342D] text-[#CC342D] font-semibold px-8 py-4 rounded-lg text-lg hover:bg-[#CC342D] hover:text-white transition-colors"
                >
                  Browse Providers
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-8">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <img src="https://i.pravatar.cc/40?img=1" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/40?img=2" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/40?img=3" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
                  </div>
                  <div className="ml-3">
                    <div className="flex text-yellow-500">
                      ★★★★★
                    </div>
                    <p className="text-sm text-gray-600">Rated 4.9/5 by patients</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                  alt="Healthcare provider"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Appointment Booked</p>
                      <p className="font-semibold text-gray-900">1,247 today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why choose Sana?
            </h2>
            <p className="text-xl text-gray-600">
              Healthcare made simple, accessible, and convenient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="bg-[#CC342D] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#CC342D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Easy Scheduling
              </h3>
              <p className="text-gray-600">
                Book appointments 24/7 online. See real-time availability and pick the time that works for you.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="bg-[#CC342D] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#CC342D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Verified Providers
              </h3>
              <p className="text-gray-600">
                All healthcare professionals are verified and highly rated. Read reviews from real patients.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="bg-[#CC342D] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#CC342D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your health information is protected with enterprise-grade security and HIPAA compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Get the care you need in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#CC342D] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Find Your Provider
                </h3>
                <p className="text-gray-600">
                  Search by specialty, location, or availability. Compare profiles, ratings, and reviews.
                </p>
              </div>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-300"></div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#CC342D] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Book Appointment
                </h3>
                <p className="text-gray-600">
                  Choose a convenient time slot that fits your schedule. Instant confirmation.
                </p>
              </div>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-300"></div>
            </div>

            <div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#CC342D] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Get Care
                </h3>
                <p className="text-gray-600">
                  Attend your appointment and receive quality care from trusted professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular specialties
            </h2>
            <p className="text-xl text-gray-600">
              Find the right care for your needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Physical Therapy', icon: '🏃' },
              { name: 'Mental Health', icon: '🧠' },
              { name: 'Nutrition', icon: '🥗' },
              { name: 'Yoga', icon: '🧘' },
              { name: 'Personal Training', icon: '💪' },
            ].map((specialty) => (
              <Link
                key={specialty.name}
                href="/providers"
                className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-[#CC342D] hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-3">{specialty.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#CC342D]">
                  {specialty.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#CC342D] to-[#9B2226]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to take control of your health?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-8">
            Join thousands of patients who trust Sana Health for their healthcare needs
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[#CC342D] font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#EE6C4D] mb-4">Sana Health</h3>
              <p className="text-gray-400">
                Making healthcare accessible and convenient for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Patients</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/providers" className="hover:text-white">Find Providers</Link></li>
                <li><Link href="/signup" className="hover:text-white">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white">Log In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sana Health. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}