"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Frat() {
  const { data: session } = useSession({ required: true });
  const { frat } = useParams();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [img, setImg] = useState(null);
  const [map, setMap] = useState("");
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [summaryResponse, setSummaryResponse] = useState("");
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/frat/${frat}`);
        if (!response.ok) {
          throw new Error("Failed to fetch frat");
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
      setError("Frat not found");
    }
  }, [frat]);

  if (error) {
    return <div className="text-center text-[#6A4A3C]">{error}</div>;
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
    <div className="bg-[#E6CFDC] min-h-screen py-10 px-6 font-['Playfair_Display']">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {img && (
            <div className="flex-shrink-0">
              <img
                src={img}
                alt={name}
                className="w-60 h-60 object-cover rounded-full border-4 border-[#E6CFDC]"
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#6A4A3C] mb-4">{name}</h1>
            <div className="flex justify-center md:justify-start gap-x-6">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6A4A3C] font-semibold hover:underline"
              >
                About
              </a>
              <a
                href={map}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6A4A3C] font-semibold hover:underline"
              >
                Location
              </a>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#6A4A3C]">AI Summary</h2>
          <p className="text-[#6A4A3C]">{summaryResponse}</p>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#6A4A3C]">Reviews</h2>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-[#F4E8EE] p-4 rounded-md shadow-sm border border-[#E6CFDC]"
                >
                  <p className="font-bold">{review.username}</p>
                  <p>{review.review}</p>
                </div>
              ))
            ) : (
              <p className="text-[#6A4A3C]">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>

        {/* Review Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#6A4A3C]">Write a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows="4"
              placeholder="Write your review here"
              className="w-full p-3 mb-4 border rounded-md bg-[#F4E8EE] border-[#E6CFDC] placeholder-gray-600"
            />
            <button
              type="submit"
              className="bg-[#6A4A3C] text-white py-2 px-6 rounded-md hover:bg-[#543A2F]"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
