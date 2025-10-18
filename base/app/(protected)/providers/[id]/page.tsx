"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getProvider,
  getAvailableSlots,
  Provider,
  AvailableSlotsResponse,
} from "@/lib/api";

export default function ProviderDetailPage() {
  const params = useParams();
  const providerId = Number(params.id);

  const [provider, setProvider] = useState<Provider | null>(null);
  const [slotsData, setSlotsData] = useState<AvailableSlotsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  useEffect(() => {
    loadProviderData();
  }, [providerId]);

  const loadProviderData = async () => {
    setLoading(true);
    try {
        const [providerData, slotsResponse] = await Promise.all([
            getProvider(providerId),
            getAvailableSlots(providerId),
        ]);

        setProvider(providerData);
        setSlotsData(slotsResponse);

        // Auto-select first available date
        if (slotsResponse.slots && typeof slotsResponse.slots === 'object') {
            const dates = Object.keys(slotsResponse.slots);
            if (dates.length > 0) {
                setSelectedDate(dates[0]); 
            }
        }
    } catch (error) {
        console.error("Error loading provider:", error);
    } finally {
        setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today'; 
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';  
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric', 
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CC342D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading provider details...</p>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Provider not found</h1>
          <p className="text-gray-600">The provider you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const availableDates = slotsData && slotsData.slots ? Object.keys(slotsData.slots) : [];
  const slotsForSelectedDate = selectedDate && slotsData && slotsData.slots ? slotsData.slots[selectedDate] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Provider Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {provider.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {provider.specialty}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  ★ {provider.rating ? Number(provider.rating).toFixed(1) : 'N/A'}
                </span>
                <span>
                  {provider.experience_years || 0} years experience
                </span>
                <span className="flex items-center gap-1">
                  📍 {provider.location || 'Location not specified'}
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                {provider.bio}
              </p>
              <div className="text-2xl font-bold text-[#CC342D]">
                ${provider.hourly_rate ? Number(provider.hourly_rate).toFixed(0) : 'N/A'}/hour
              </div>
            </div>
          </div>
        </div>

        {/* Available Slots Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Book an Appointment
          </h2>

          {availableDates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No available slots in the next 14 days</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Date Selector */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select a Date
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {availableDates.map((date) => {
                    const slotsCount = slotsData?.slots?.[date]?.length || 0;
                    return (
                      <button
                        key={date}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                          selectedDate === date
                            ? 'border-[#CC342D] bg-[#CC342D] bg-opacity-10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">
                          {formatDate(date)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {slotsCount} slot{slotsCount !== 1 ? 's' : ''} available
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Available Times for {selectedDate ? formatDate(selectedDate) : '...'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {slotsForSelectedDate.length === 0 ? (
                    <div className="col-span-full text-center py-8 text-gray-600">
                      No available slots for this date
                    </div>
                  ) : (
                    slotsForSelectedDate.map((slot: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          selectedSlot === slot
                            ? 'border-[#CC342D] bg-[#CC342D] text-white'
                            : 'border-gray-300 hover:border-[#CC342D] hover:bg-[#CC342D] hover:bg-opacity-10'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Booking Confirmation */}
              {selectedSlot && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Selected Appointment
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Date:</strong> {formatDate(selectedSlot.date)}</p>
                    <p><strong>Time:</strong> {selectedSlot.time}</p>
                    <p><strong>Duration:</strong> 30 minutes</p>
                  </div>
                  <button
                    className="w-full px-6 py-3 bg-[#CC342D] text-white font-semibold rounded-lg hover:bg-[#9B2226] transition-colors mt-4"
                    onClick={() => alert('Booking functionality coming in next steps!')}
                  >
                    Book Appointment - ${provider.hourly_rate ? Number(provider.hourly_rate).toFixed(0) : 'N/A'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}