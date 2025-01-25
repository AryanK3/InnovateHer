"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { useSession } from 'next-auth/react';

export default function Frat() {
  const { data: session } = useSession({ required: false });
  const { frat } = useParams();  // Access 'frat' from useParams
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(frat);  // Log frat to ensure it's passed correctly
        const response = await fetch(`/api/frat/${frat}`);  // Use backticks to interpolate 'frat'
        if (!response.ok) {
          throw new Error('Failed to fetch frat');
        }
        const data = await response.json();
        setName(data.name);
        setDesc(data.desc);
        setContact(data.contact);
      } catch (error) {
        setError(error.message);
      }
    };

    if (frat) {  // Only fetch if frat exists
      fetchData();
    } else {
      setError('Frat not found');
    }
  }, [frat]);  // Re-run when frat changes

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#9D968D] flex flex-col items-center min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4 text-black text-center">{name}</h3>
        <h5 className="text-2xl font-bold mb-4 text-black text-center">{desc}</h5>
        <h6 className="text-2xl font-bold mb-4 text-black text-center">{contact}</h6>
      </div>
    </div>
  );
}
