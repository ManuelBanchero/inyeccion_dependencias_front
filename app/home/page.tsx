"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const usersState = useState<Array<Record<string, unknown>> | null>(() => {
    try {
      const raw = localStorage.getItem('users');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Array<Record<string, unknown>>) : null;
    } catch {
      return null;
    }
  });
  const users = usersState[0];

  function handleLogout() {
    try { localStorage.removeItem('users'); } catch {}
    router.push('/signin');
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Home</h1>
          <button onClick={handleLogout} className="rounded bg-gray-700 px-3 py-1 text-white">Logout</button>
        </div>

        <div className="mt-6">
          {users && users.length > 0 ? (
            <ul className="space-y-2">
              {users.map((u, i) => {
                const username = typeof u['username'] === 'string' ? (u['username'] as string) : null;
                const email = typeof u['email'] === 'string' ? (u['email'] as string) : null;
                return (
                  <li key={i} className="rounded bg-white/5 p-3">
                    <div className="text-sm font-medium">{username || `User ${i + 1}`}</div>
                    {email && <div className="text-xs text-gray-500">{email}</div>}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No hay usuarios para mostrar. Intenta iniciar sesión o registrarte.</p>
          )}
        </div>
      </div>
    </div>
  );
}
