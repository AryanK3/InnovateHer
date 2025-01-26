"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link'; 
export default function FratList() {
  const [frats, setFrats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFrats = async () => {
      try {
        const response = await fetch('/api/fraternities'); 
        if (!response.ok) {
          throw new Error('Failed to fetch frats');
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
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#9D968D] flex flex-col items-center min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {frats.length > 0 ? (
          frats.map((frat) => (
            <div key={frat.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              {frat.image && (
                <img
                  src={frat.image}
                  alt={frat.name}
                  className="w-40 h-40 object-cover rounded-full mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-black text-center mb-2">{frat.name}</h3>
              <Link
                href={`/frat/${frat.name}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No fraternities available.</p>
        )}
      </div>
    </div>
  );
}
