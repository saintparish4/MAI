'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { updateEmailPreferences } from '@/lib/api';

export default function SettingsPage() {
  const { user } = useAuth();
  const [bookingConfirmations, setBookingConfirmations] = useState(true);
  const [reminders24h, setReminders24h] = useState(true);
  const [cancellationNotices, setCancellationNotices] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setBookingConfirmations(user.booking_confirmations ?? true);
      setReminders24h(user.reminders_24h ?? true);
      setCancellationNotices(user.cancellation_notices ?? true);
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      await updateEmailPreferences({
        booking_confirmations: bookingConfirmations,
        reminders_24h: reminders24h,
        cancellation_notices: cancellationNotices
      });
      setMessage('Preferences saved successfully!');
    } catch (error: any) {
      setMessage(error.message || 'Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Email Notifications
          </h2>

          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="booking-confirmations"
                  type="checkbox"
                  checked={bookingConfirmations}
                  onChange={(e) => setBookingConfirmations(e.target.checked)}
                  className="w-5 h-5 text-[#CC342D] border-gray-300 rounded focus:ring-[#CC342D]"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="booking-confirmations" className="font-medium text-gray-900 cursor-pointer">
                  Booking Confirmations
                </label>
                <p className="text-sm text-gray-600">
                  Receive an email when you book a new appointment
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="reminders"
                  type="checkbox"
                  checked={reminders24h}
                  onChange={(e) => setReminders24h(e.target.checked)}
                  className="w-5 h-5 text-[#CC342D] border-gray-300 rounded focus:ring-[#CC342D]"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="reminders" className="font-medium text-gray-900 cursor-pointer">
                  24-Hour Reminders
                </label>
                <p className="text-sm text-gray-600">
                  Get reminded about your appointments 24 hours in advance
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="cancellations"
                  type="checkbox"
                  checked={cancellationNotices}
                  onChange={(e) => setCancellationNotices(e.target.checked)}
                  className="w-5 h-5 text-[#CC342D] border-gray-300 rounded focus:ring-[#CC342D]"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="cancellations" className="font-medium text-gray-900 cursor-pointer">
                  Cancellation Notices
                </label>
                <p className="text-sm text-gray-600">
                  Be notified when appointments are cancelled
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-[#CC342D] text-white rounded-lg hover:bg-[#B32E28] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}