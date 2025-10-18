const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

export async function signup(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Critical for cookies
    body: JSON.stringify({ 
      email, 
      password, 
      password_confirmation: password 
    })
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || data.errors?.join(', ') || 'Signup failed');
  }
  
  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  
  return data;
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include'
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
