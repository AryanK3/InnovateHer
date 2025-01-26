"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MeetupList() {
  const [meetups, setMeetups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const response = await fetch('/api/meets'); 
        if (!response.ok) {
          throw new Error('Failed to fetch meetups');
        }
        const data = await response.json();
        setMeetups(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMeetups();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#f0f0f0] flex flex-col items-center min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {meetups.length > 0 ? (
          meetups.map((meetup) => (
            <div key={meetup.name} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              {meetup.image && (
                <img
                  src={meetup.image}
                  alt={meetup.name}
                  className="w-40 h-40 object-cover rounded-full mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-black text-center mb-2">{meetup.name}</h3>
              <p className="text-sm text-center mb-4">{meetup.date}</p> {/* Date of the meetup */}
              <Link
                href={`/meetup/${meetup.name}`} // Adjust the URL path for individual meetup page
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No meetups available.</p>
        )}
      </div>
    </div>
  );
}
