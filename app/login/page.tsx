'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { emailAtom } from '@/lib/atoms';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [, setEmailAtom] = useAtom(emailAtom);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            const resp = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await resp.json();
            if (!resp.ok) {
                setError(data?.error || 'Login failed');
                return;
            }

            // Save email to Jotai atom
            setEmailAtom(email);

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Network error');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            className="mt-1 block w-full border rounded px-3 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            className="mt-1 block w-full border rounded px-3 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600">{error}</p>}

                    <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
