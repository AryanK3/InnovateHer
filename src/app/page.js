"use client";
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  return (
    <div className="bg-[#9D968D] flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">IH</h1>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => signIn('google')}
            className="w-full bg-black text-[#CEB888] rounded py-2 hover:bg-[#CEB888] hover:text-black transition duration-200"
          >
            Login/Signup
          </button>
        </div>
      </div>
    </div>
  );
}