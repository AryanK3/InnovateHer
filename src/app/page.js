"use client";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  return (
    <div className="bg-[#9D968D] min-h-screen flex flex-col justify-center items-center text-center py-12 px-6">
      <h1 className="text-5xl font-bold text-black mb-6">Welcome to FratList</h1>
      
      <p className="text-xl text-black mb-12 max-w-3xl mx-auto">
        FratList is a platform designed for women, empowering you to explore and connect with various fraternities, learn about their cultures, and find the perfect fit for you.
      </p>

      <div className="flex space-x-8">
        <div 
          className="bg-[#CEB888] p-10 rounded-lg shadow-lg w-60 text-center cursor-pointer hover:bg-[#9D968D] hover:text-white transition duration-300"
          onClick={() => router.push('/fraternities')}
        >
          <h3 className="text-2xl font-semibold">Fraternities</h3>
          <p className="mt-4 text-lg text-black">Explore various fraternities and their communities.</p>
        </div>

      <div 
          className="bg-[#CEB888] p-10 rounded-lg shadow-lg w-60 text-center cursor-pointer hover:bg-[#9D968D] hover:text-white transition duration-300"
          onClick={() => router.push('/chat')}
        >
          <h3 className="text-2xl font-semibold">AI Chat</h3>
          <p className="mt-4 text-lg text-black">Get detailed answers for specific questions.</p>
        </div>
        </div>
    </div>
  );
}
