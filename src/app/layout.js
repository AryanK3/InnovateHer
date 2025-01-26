"use client";
import { useSession, signOut, signIn } from "next-auth/react"; 
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; 
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <header className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                <Link href="/">FratList</Link>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/about" className="hover:text-gray-400">About</Link>
                <Link href="/contact" className="hover:text-gray-400">Contact</Link>
                <SessionButton />
              </nav>
            </div>
          </header>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}

function SessionButton() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <span>Loading...</span>
      ) : session ? (
        <div
          className="flex items-center space-x-2 cursor-pointer hover:bg-red-700 p-2 rounded-full"
          onClick={() => signOut()}
        >
          <img
            src={session.user.image} 
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-white">{session.user.name}</span>
        </div>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="hover:text-gray-400"
        >
          Sign In
        </button>
      )}
    </>
  );
}
