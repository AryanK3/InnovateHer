"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { useSession } from 'next-auth/react';

export default function Frat() {
  const { data: session } = useSession({ required: false });
  const { frat } = useParams(); 
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);
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
        setDesc(data.desc);
        setContact(data.contact);
        setReviews(data.reviews || []); 
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
        <h3 className="text-2xl font-bold mb-4 text-black text-center">{name}</h3>
        <h5 className="text-2xl font-bold mb-4 text-black text-center">{desc}</h5>
        <h6 className="text-2xl font-bold mb-4 text-black text-center">{contact}</h6>
        <div className="mt-8 text-black">
        <h4 className="text-xl font-semibold mb-4">Reviews</h4>
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
