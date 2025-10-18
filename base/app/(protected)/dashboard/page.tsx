'use client';

import { useAuth } from '@/lib/authContext'; // CONFIGURE AUTH CONTEXT HERE

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to your Dashboard!
        </h1>
        <p className="text-gray-600">
          You are successfully logged in as: <span className="font-medium text-gray-900">{user?.email}</span>
        </p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="text-green-600 text-xl mr-2">✅</div>
          <h2 className="text-lg font-semibold text-green-800">
            Authentication is working end-to-end!
          </h2>
        </div>
        <div className="space-y-2 text-sm text-green-700">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Rails backend is running
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Session cookies are set
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Next.js frontend is connected
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Protected routes are working
          </div>
        </div>
      </div>
    </div>
  );
}