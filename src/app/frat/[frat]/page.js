"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { useSession } from 'next-auth/react';

export default function Frat() {
  const { data: session } = useSession({ required: true });
  const { frat } = useParams(); 
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [img, setImg] = useState(null);
  const [map, setMap] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [summaryResponse, setSummaryResponse] = useState('');
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(frat);  
        const response = await fetch(`/api/frat/${frat}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch frat');
        }
        const data = await response.json();
        setName(data.name);
        setLink(data.link);
        setImg(data.image_url);
        setMap(data.google_url);
        setReviews(data.reviews || []); 
        setSummaryResponse(data.summary); 
      } catch (error) {
        setError(error.message);
      }
    };

    if (frat) {  
      fetchData();
    } else {
      setError('Frat not found');
    }
  }, [frat]); 

  if (error) {
    return <div>{error}</div>;
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview) {
      setError('Please write a review');
      return;
    }
    try {
      const response = await fetch(`/api/frat/${frat}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: newReview, username: session?.user?.name || 'Anonymous' })
      });
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      const data = await response.json();
      setReviews((prevReviews) => [
        ...prevReviews,
        { review: newReview, username: session?.user?.name || 'Anonymous', date: new Date() }
      ]);
      setNewReview('');  
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="bg-[#9D968D] flex flex-col items-center min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {img && (
          <div className="flex justify-center mb-4">
          <img
            src={img}
            alt={name}
            className="w-40 h-40 object-cover rounded-full"
          />
          </div>
        )}
        <h3 className="text-2xl font-bold mb-3 text-black text-center">{name}</h3>
        <div className='flex justify-center gap-x-6'>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">About</a>
        <a href={map} target="_blank" rel="noopener noreferrer" className="text-blue-500">Location</a>
        </div>
        <h5 className="text-xl text-black font-semibold mt-4">AI Summary</h5>
        <p className="font-bold mb-4 text-black text-center">{summaryResponse}</p>
        <div className="mt-8 text-black">
        <h5 className="text-xl font-semibold mb-4">Reviews</h5>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md text-black">
                <p className="font-bold text-black">{review.username}</p>
                <p>{review.review}</p>
              </div>
            ))) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
      <form className="mt-8 text-black" onSubmit={handleReviewSubmit}>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          rows="4"
          placeholder="Write your review here"
          className="w-full p-3 mb-4 border rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit Review</button>
      </form>
      </div>
    </div>
  );
}
