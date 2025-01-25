import Image from "next/image";

export default function MainPage() {
  const reviews = [
    { location: "Central Park", review: "Amazing place to relax and enjoy nature!" },
    { location: "Eiffel Tower", review: "A stunning landmark with incredible views!" },
    { location: "Great Wall of China", review: "A breathtaking experience, full of history!" },
    { location: "Sydney Opera House", review: "Iconic architecture with a great vibe." },
    { location: "Machu Picchu", review: "Absolutely stunning. A must-see!" },
    // Add more reviews as needed
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex items-center justify-between p-4">
          {/* Logo and Website Name */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg" // Replace with your logo path
              alt="Website Logo"
              width={40}
              height={40}
              className="dark:invert"
            />
            <h1 className="text-xl font-bold">Your Website</h1>
          </div>

          {/* Hamburger Menu */}
          <div className="cursor-pointer">
            <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200"></span>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Top Reviews</h2>

        <div className="grid gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold">{review.location}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer (Optional) */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4">
        <p>&copy; {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
