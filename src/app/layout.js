"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google"; // Import Playfair Display font
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

// Local fonts
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

// Google Font
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair-display",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#E6CFDC]`}
      >
        <SessionProvider>
          <header
            className={`bg-white shadow-md sticky top-0 z-50 ${playfairDisplay.variable}`}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              {/* Logo Section */}
              <div className="text-3xl font-bold text-[#6A4A3C]">
                <Link href="/" className="font-serif">
                  Purdue FratCheck
                </Link>
              </div>

              {/* Navigation Section */}
              <nav className="hidden md:flex items-center space-x-8 font-serif">
                <Link
                  href="/about"
                  className="text-[#6A4A3C] hover:text-[#543A2F] font-medium transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-[#6A4A3C] hover:text-[#543A2F] font-medium transition-colors"
                >
                  Contact
                </Link>
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
        <span className="text-[#6A4A3C]">Loading...</span>
      ) : session ? (
        <div
          className="flex items-center space-x-2 cursor-pointer p-2 rounded-full border border-[#E6CFDC] bg-[#F4E8EE] hover:bg-[#E6CFDC] transition-all"
          onClick={() => signOut()}
        >
          <img
            src={session.user.image}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-[#6A4A3C]">{session.user.name}</span>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="text-[#6A4A3C] hover:text-[#543A2F] font-medium transition-colors"
        >
          Sign In
        </button>
      )}
    </>
  );
}
