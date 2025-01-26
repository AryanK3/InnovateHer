"use client"; // Mark this file as a client component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link

export default function Frat() {
  const { data: session } = useSession({ required: false });
  const { frat } = useParams();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(frat);
        const response = await fetch(`/api/frat/${frat}`);
        if (!response.ok) {
          throw new Error("Failed to fetch frat");
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
      setError("Frat not found");
    }
  }, [frat]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview) {
      setError("Please write a review");
      return;
    }
    try {
      const response = await fetch(`/api/frat/${frat}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: newReview, username: session?.user?.name || "Anonymous" }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      const data = await response.json();
      setReviews((prevReviews) => [
        ...prevReviews,
        { review: newReview, username: session?.user?.name || "Anonymous", date: new Date() },
      ]);
      setNewReview("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={150}
            height={30}
            priority
          />
          <h1 className="text-2xl font-semibold">Fraternity Details</h1>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-2 text-black text-center">{name}</h3>
          <h5 className="text-xl mb-4 text-black text-center">{desc}</h5>
          <h6 className="text-lg mb-4 text-black text-center">{contact}</h6>
        </div>
        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4 text-black">Reviews</h4>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-md text-black">
                  <p className="font-bold text-black">{review.username}</p>
                  <p>{review.review}</p>
                </div>
              ))
            ) : (
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
