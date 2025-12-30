'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { emailAtom } from '@/lib/atoms';
import { getUserByEmail } from '@/app/actions/user';

type User = {
  id: string;
  name: string;
  email: string;
  wing: string;
  houseNumber: string;
  role: string;
  createdAt: Date;
};

export default function DashboardPage() {
  const [email] = useAtom(emailAtom);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUserByEmail(email);
        if (!userData) {
          router.push('/?error=User not found');
          return;
        }
        setUser(userData as User);
      } catch (err) {
        console.error(err);
        router.push('/?error=Error fetching user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-600 mt-1">
            Wing {user.wing} • House {user.houseNumber}
          </p>
          <p className="mt-2">
            Role: <strong>{user.role}</strong>
          </p>
        </div>

        {user.role === 'ADMIN' && (
          <div className="bg-white p-6 rounded shadow border-l-4 border-black">
            <h2 className="text-xl font-semibold mb-2">Admin Controls</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Manage users</li>
              <li>Create announcements</li>
              <li>Assign maintenance bills</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
