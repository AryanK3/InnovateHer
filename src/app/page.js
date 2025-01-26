"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-[#E6CFDC] min-h-screen flex flex-col justify-center items-center py-12 px-6 font-['Playfair_Display']">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#5A2A51] mb-6">Welcome to Purdue FratCheck</h1>
        <p className="text-xl text-[#5A2A51] max-w-3xl mx-auto">
          FratList is a platform designed for women, empowering you to explore and connect with various fraternities, 
          learn about their cultures, and find the perfect fit for you.
        </p>
      </div>

      {/* Action Cards Section */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Fraternities Card */}
        <div
          className="bg-white p-10 rounded-2xl shadow-lg w-80 text-center cursor-pointer hover:bg-[#F4E8EE] hover:shadow-xl border border-[#E6CFDC] transition-all duration-300"
          onClick={() => router.push("/fraternities")}
        >
          <h3 className="text-2xl font-semibold text-[#5A2A51]">Fraternities</h3>
          <p className="mt-4 text-lg text-[#5A2A51]">
            Explore various fraternities and their communities.
          </p>
        </div>

        {/* AI Chat Card */}
        <div
          className="bg-white p-10 rounded-2xl shadow-lg w-80 text-center cursor-pointer hover:bg-[#F4E8EE] hover:shadow-xl border border-[#E6CFDC] transition-all duration-300"
          onClick={() => router.push("/chat")}
        >
          <h3 className="text-2xl font-semibold text-[#5A2A51]">AI Chat</h3>
          <p className="mt-4 text-lg text-[#5A2A51]">
            Get detailed answers for specific questions.
          </p>
        </div>
      </div>
    </div>
  );
}