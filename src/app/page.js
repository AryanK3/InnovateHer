"use client";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  return (
    <div className="bg-[#FFFFFF] min-h-screen flex flex-col justify-center items-center text-center py-12 px-6">
      <h1 className="text-5xl font-bold text-[#5A2A51] mb-6">Welcome to FratList</h1>
      
      <p className="text-xl text-[#5A2A51] mb-12 max-w-3xl mx-auto">
        FratList is a platform designed for women, empowering you to explore and connect with various fraternities, learn about their cultures, and find the perfect fit for you.
      </p>

      <div className="flex space-x-8">
        <div 
          className="bg-[#F7D1D3] p-10 rounded-lg shadow-lg w-60 text-center cursor-pointer hover:bg-[#F5E6E8] hover:text-pink transition duration-300"
          onClick={() => router.push('/fraternities')}
        >
          <h3 className="text-2xl font-semibold text-[#7A3F6D]">Fraternities</h3>
          <p className="mt-4 text-lg text-[#5A2A51]">Explore various fraternities and their communities.</p>
        </div>

        <div 
          className="bg-[#F7D1D3] p-10 rounded-lg shadow-lg w-60 text-center cursor-pointer hover:bg-[#F5E6E8] hover:text-pink transition duration-300"
          onClick={() => router.push('/chat')}
        >
          <h3 className="text-2xl font-semibold text-[#7A3F6D]">AI Chat</h3>
          <p className="mt-4 text-lg text-[#5A2A51]">Get detailed answers for specific questions.</p>
        </div>
      </div>
    </div>
  );
}
