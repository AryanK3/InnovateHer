import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 p-8">
      <h1 className="text-4xl font-bold">Welcome to My App!</h1>
      <p className="mt-4 text-lg">This is the home page.</p>
      <div className="flex gap-4 mt-6">
        <Link
          href="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
