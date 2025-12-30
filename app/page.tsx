'use client';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded shadow space-y-4">
                <h1 className="text-2xl font-bold text-center">Society Management Login</h1>

                <form
                    className="space-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
                        window.location.href = `/dashboard/${encodeURIComponent(email)}`;
                    }}
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full border rounded p-2"
                    />

                    <button type="submit" className="w-full bg-black text-white p-2 rounded">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
