'use client';

import { useAuth } from '@/lib/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/header';
import InsuranceSection from '@/components/insurance';
import TopRatedDoctors from '@/components/top-rated-doctors';
import DentistsShortWait from '@/components/dentists-short-wait';
import Specialities from '@/components/specialities';

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
      <Header />


      {/* Insurance Section */}
      <InsuranceSection />

      {/* Top-rated Doctors */}
      <TopRatedDoctors />

      {/* Dentists with Short Wait Time */}
      <DentistsShortWait />

      {/* Top-searched specialties */}
      <Specialities />

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

      {/* Top-searched specialties */}
      <Specialities />

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