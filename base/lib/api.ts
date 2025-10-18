const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface User {
  id: number;
  email: string;
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

export async function signup(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Critical for cookies
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

  return data;
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.user;
  } catch (error) {
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

  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  return res.json();
}

export async function getProvider(id: number): Promise<Provider> {
  const res = await fetch(`${API_URL}/providers/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Provider not found");
  return res.json();
}
