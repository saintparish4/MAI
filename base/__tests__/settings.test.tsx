// Mock the API module - must be before any imports
const mockUpdateEmailPreferences = jest.fn()
const mockGetCurrentUser = jest.fn()

jest.mock('@/lib/api', () => ({
  updateEmailPreferences: mockUpdateEmailPreferences,
  getCurrentUser: mockGetCurrentUser,
}))

import { describe, it, beforeEach, expect, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import React from 'react'

// Import after mocks
import SettingsPage from '@/app/(protected)/settings/page'
import { AuthProvider } from '@/lib/authContext'

// Create a custom render function that wraps with AuthProvider
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  )
}

describe('Settings Page', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
    
    // Set up default mock implementations
    mockGetCurrentUser.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      booking_confirmations: true,
      reminders_24h: true,
      cancellation_notices: true,
    } as never)
    
    // Set up default successful API call
    mockUpdateEmailPreferences.mockResolvedValue({ message: 'Preferences updated successfully' } as never)
  })

  it('renders settings page', async () => {
    await act(async () => {
      renderWithProviders(<SettingsPage />)
    })
    const heading = screen.getByText('Email Notifications')
    expect(heading).toBeDefined()
  })

  it('displays current preferences', async () => {
    await act(async () => {
      renderWithProviders(<SettingsPage />)
    })
    
    const bookingCheckbox = screen.getByLabelText('Booking Confirmations')
    expect(bookingCheckbox).toBeDefined()
  })

  it('updates preferences on save', async () => {
    let unmount: (() => void) | undefined
    await act(async () => {
      const result = renderWithProviders(<SettingsPage />)
      unmount = result.unmount
    })
    
    const saveButton = screen.getByText('Save Preferences')
    
    await act(async () => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.getByText('Preferences saved successfully!')).toBeDefined()
    })
    
    unmount?.()
  })

  it('shows error message on API failure', async () => {
    // Mock fetch to return an error response
    global.fetch = jest.fn(() =>
      Promise.resolve({ok: false, json: () => Promise.resolve({ error: 'API Error' } as never)} as never)
    ) as jest.MockedFunction<typeof fetch>
    await act(async () => {
      renderWithProviders(<SettingsPage />)
    })
    const saveButton = screen.getByText('Save Preferences')
    await act(async () => {
      fireEvent.click(saveButton)
    })
    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeDefined()
    })
  })
})