const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Token management
const TOKEN_KEY = 'mai_auth_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

export interface User {
  id: number;
  email: string;
  booking_confirmations?: boolean;
  reminders_24h?: boolean;
  cancellation_notices?: boolean;
}

export interface AuthResponse {
  user: User;
  token?: string;
  message?: string;
  error?: string;
  errors?: string[];
}

export interface Provider {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  location: string;
  hourly_rate: number;
  experience_years: number;
  rating: number;
  avatar_url: string;
  availabilities?: Availability[];
}

export interface Availability {
  id: number;
  provider_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface ProvidersResponse {
  providers: Provider[];
  total: number;
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  date: string;
  time: string;
}

export interface AvailableSlotsResponse {
  provider_id: number;
  slots: Record<string, TimeSlot[]>; // grouped by date
  total_slots: number;
}

export interface Appointment {
  id: number;
  patient_id: number;
  provider_id: number;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string;
  provider?: Provider;
}

export interface AppointmentsResponse {
  upcoming: Appointment[];
  past: Appointment[];
}

export interface SymptomAnalysis {
  specialty: string;
  urgency: string;
  reasoning: string;
  keywords: string[];
  red_flags: string[];
  specialty_name: string;
  urgency_details: {
    priority: number;
    color: string;
    message: string;
  };
}

export interface SymptomAnalysisResponse {
  analysis: SymptomAnalysis;
  timestamp: string; 
}

export async function signup(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      password_confirmation: password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.errors?.join(", ") || "Signup failed");
  }

  // Store token for future requests
  if (data.token) {
    setToken(data.token);
  }

  return data;
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  // Store token for future requests
  if (data.token) {
    setToken(data.token);
  }

  return data;
}

export async function logout(): Promise<void> {
  const token = getToken();
  if (token) {
    await fetch(`${API_URL}/auth/logout`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }
  removeToken();
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = getToken();
    if (!token) {
      return null;
    }

    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // Token is invalid, remove it
      removeToken();
      return null;
    }

    const data = await res.json();
    return data.user;
  } catch (_error) {
    removeToken();
    return null;
  }
}

export async function getProviders(params?: {
  specialty?: string;
  location?: string;
  min_rating?: number;
  sort?: string;
}): Promise<ProvidersResponse> {
  const queryParams = new URLSearchParams();

  if (params?.specialty) queryParams.set("specialty", params.specialty);
  if (params?.location) queryParams.set("location", params.location);
  if (params?.min_rating)
    queryParams.set("rating", params.min_rating.toString());
  if (params?.sort) queryParams.set("sort", params.sort);

  const url = `${API_URL}/providers${
    queryParams.toString() ? `?${queryParams}` : ""
  }`;

  const token = getToken();
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  return res.json();
}

export async function getProvider(id: number): Promise<Provider> {
  const token = getToken();
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/providers/${id}`, {
    headers,
  });
  if (!res.ok) throw new Error("Provider not found");
  const data = await res.json();
  return data.provider;
}

export async function getAvailableSlots(
  providerId: number
): Promise<AvailableSlotsResponse> {
  const token = getToken();
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `${API_URL}/providers/${providerId}/available_slots`,
    {
      headers,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch available slots");
  }
  return res.json();
}

export async function bookAppointment(params: {
  provider_id: number;
  start_time: string;
  end_time: string;
  notes?: string;
}): Promise<Appointment> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers,
    body: JSON.stringify(params),
  });

  // Check if response has content before parsing
  const contentType = res.headers.get("content-type");
  let data;
  
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch (_e) {
      throw new Error("Server returned invalid JSON response");
    }
  } else {
    // If not JSON, try to get text for error message
    const text = await res.text();
    data = { error: text || "Server error" };
  }

  if (!res.ok) {
    throw new Error(data.error || "Failed to book appointment");
  }

  return data.appointment || data;
}

export async function getAppointments(): Promise<AppointmentsResponse> {
  const token = getToken();
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/appointments`, {
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch appointments"); 
  }

  return res.json();
}

export async function cancelAppointment(id: number): Promise<Appointment> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/appointments/${id}/cancel`, {
    method: "PATCH",
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to cancel appointment");
  }

  return data.appointment || data;
}

export async function updateEmailPreferences(preferences: {
  booking_confirmations?: boolean;
  reminders_24h?: boolean;
  cancellation_notices?: boolean;
}): Promise<{ message: string }> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/auth/update_preferences`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(preferences),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update preferences");
  }

  return data;
}

export async function analyzeSymptoms(description: string): Promise<SymptomAnalysisResponse> {
  const res = await fetch(`${API_URL}/api/v1/analyze-symptoms`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ description }) 
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to analyze symptoms");
  }

  return data; 
}

export async function getProvidersByAISpecialty(specialty: string, params?: {
  location?: string;
  min_rating?: number;
  sort?: string;
}): Promise<ProvidersResponse> {
  const queryParams = new URLSearchParams();

  // Use ai_specialty parameter for backend filtering
  queryParams.set("ai_specialty", specialty);

  if (params?.location) queryParams.append("location", params.location);
  if (params?.min_rating) queryParams.append('min_rating', params.min_rating.toString());
  if (params?.sort) queryParams.append('sort', params.sort);

  const url = `${API_URL}/providers?${queryParams}`;

  const res = await fetch(url, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  return res.json();
}