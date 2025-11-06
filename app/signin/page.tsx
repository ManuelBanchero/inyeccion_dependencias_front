"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../lib/api';

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await login(username, password);

      // store users (if any) in localStorage and redirect to home
      let users: unknown = null;
      if (Array.isArray(data)) users = data;
      else if (data && typeof data === 'object') users = (data as Record<string, unknown>)['users'];

      if (users && Array.isArray(users)) {
        try { localStorage.setItem('users', JSON.stringify(users)); } catch {}
      } else {
        // clear previous users
        try { localStorage.removeItem('users'); } catch {}
      }

      router.push('/home');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-md rounded bg-white/5 p-6">
        <h1 className="mb-4 text-center text-2xl font-bold text-white">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">Usuario</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded bg-white/5 px-3 py-2 text-white outline-1 outline-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="mt-1 block w-full rounded bg-white/5 px-3 py-2 text-white outline-1 outline-white/10"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}
        </form>
        <div className="mt-4 text-center">
          <Link href="/signup" className="text-sm text-indigo-300 hover:underline">Crear cuenta</Link>
        </div>
      </div>
    </div>
  );
}
