import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body as { email?: string; password?: string };

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        // Use a runtime cast to `any` to avoid mismatches with generated Prisma types in this environment.
        const user = (await prisma.user.findUnique({ where: { email } })) as any;

        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const res = NextResponse.json({ ok: true, email: user.email, role: user.role });

        // Set a simple HttpOnly cookie containing the email and role (stringified). For production,
        // use signed tokens and secure flags.
        const cookieValue = Buffer.from(JSON.stringify({ email: user.email, role: user.role })).toString('base64');
        res.cookies.set('session', cookieValue, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return res;
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
