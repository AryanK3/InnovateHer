"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FratList() {
  const [frats, setFrats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFrats = async () => {
      try {
        const response = await fetch("/api/fraternities");
        if (!response.ok) {
          throw new Error("Failed to fetch frats");
        }
        const data = await response.json();
        setFrats(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFrats();
  }, []);

  if (error) {
    return <div className="text-center text-[#6A4A3C]">{error}</div>;
  }

  return (
    <div className="bg-[#E6CFDC] flex flex-col items-center min-h-screen p-6 font-['Playfair_Display']">
      <h1 className="text-3xl font-bold text-[#6A4A3C] mb-8">Fraternity List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {frats.length > 0 ? (
          frats.map((frat) => (
            <Link
              href={`/frat/${frat.name}`}
              key={frat.name}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {frat.image && (
                <img
                  src={frat.image}
                  alt={frat.name}
                  className="w-40 h-40 object-cover rounded-full mb-4 border-4 border-[#E6CFDC]"
                />
              )}
              <h3 className="text-xl font-bold text-[#6A4A3C] text-center">
                {frat.name}
              </h3>
            </Link>
          ))
        ) : (
          <p className="text-[#6A4A3C] text-center">No fraternities available.</p>
        )}
      </div>
    </div>
  );
}
