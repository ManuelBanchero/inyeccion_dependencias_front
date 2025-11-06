"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import shellIcon from '../resources/shell-icon.png';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src={shellIcon} alt="shell" width={56} height={56} className="rounded-md" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Lista de usuarios registrados</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">{users ? `${users.length} usuarios` : '0 usuarios'}</div>
              <button onClick={handleLogout} className="rounded bg-red-600 px-4 py-2 text-white">Cerrar sesión</button>
            </div>
          </div>

          <div className="mt-6">
            {users && users.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {users.map((u, i) => {
                  const username = typeof u['username'] === 'string' ? (u['username'] as string) : null;
                  const email = typeof u['email'] === 'string' ? (u['email'] as string) : null;
                  const name = typeof u['name'] === 'string' ? (u['name'] as string) : username || `User ${i + 1}`;
                  return (
                    <div key={i} className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center font-semibold text-indigo-800">{(name[0] || 'U').toUpperCase()}</div>
                        <div>
                          <div className="font-medium text-gray-800">{name}</div>
                          {email && <div className="text-xs text-gray-500">{email}</div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600">No hay usuarios para mostrar. Intenta iniciar sesión o registrarte.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
