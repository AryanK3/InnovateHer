"use client"; // Mark this file as a client component

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

// Define the form data type
interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter(); // Initialize router

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior (page reload)
    router.push("/main"); // Redirect to the main page after sign-up
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={150}
            height={30}
            priority
          />
          <h1 className="text-2xl font-semibold">Sign Up</h1>
        </div>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}> {/* Attach handleSubmit */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Create a password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline hover:text-blue-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
