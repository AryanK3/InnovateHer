"use client";

import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import { useRouter } from "next/navigation";

const reviews = [
  { id: 1, fratName: "Alpha Beta", rating: 4.5, review: "Great fraternity with lots of events." },
  { id: 2, fratName: "Delta Gamma", rating: 2.8, review: "Needs improvement, but friendly people." },
  { id: 3, fratName: "Sigma Phi", rating: 3.3, review: "Decent but not much happening." },
  { id: 4, fratName: "Theta Kappa", rating: 4.0, review: "A solid group with great leadership." },
];

const getRatingColor = (rating: number) => {
  if (rating >= 4) return "bg-green-500";
  if (rating >= 2.5) return "bg-yellow-500";
  return "bg-red-500";
};

export default function MainPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Logic to log the user out, e.g., clearing tokens, then redirect to login
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow-md">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <h1 className="text-xl font-semibold">Frat Reviews</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Fraternity Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <Link
              key={index}
              href={`/fraternity-details/${review.id}`} // Link to individual frat page with id
            >
              <div
                className="flex items-center p-4 bg-white dark:bg-gray-800 border rounded-lg shadow-sm cursor-pointer"
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${getRatingColor(review.rating)}`}>
                  {review.rating.toFixed(1)}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{review.fratName}</h3>
                  <p className="text-sm text-gray-500">{review.review}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
