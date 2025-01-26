"use client";
import { useSession, signOut, signIn } from "next-auth/react"; 
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; 
import Link from "next/link";
import Image from "next/image"; // Import Image component

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pt-0`}>
        <SessionProvider>
          <header className="bg-[#F5E6E8] text-[#7A3F6D] p-4 shadow-lg">
            <div className="flex justify-between items-center">
              {/* Logo Image */}
              <div className="flex items-center space-x-4">
                <Image 
                  src="/logo.png" // Path to your logo
                  alt="FratList Logo"
                  width={50} // Adjust width as needed
                  height={50} // Adjust height as needed
                  className="rounded-full transform hover:scale-110 transition-all duration-300" // Add zoom on hover
                />
                <div className="text-3xl font-bold"> 
                  <Link href="/" className="hover:text-[#FF3366]">FratList</Link>
                </div>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/about" className="hover:text-[#FF3366]">About</Link>
                <Link href="/contact" className="hover:text-[#FF3366]">Contact</Link>
                <SessionButton />
              </nav>
            </div>
          </header>
          
          {/* Shiny separator line */}
          <div className="relative">
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#F7D1D3] via-[#F5E6E8] to-[#F7D1D3] shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]"></div>
          </div>
          
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
          className="flex items-center space-x-2 cursor-pointer hover:bg-[#F7D1D3] p-2 rounded-full transition duration-300"
          onClick={() => signOut()}
        >
          <img
            src={session.user.image} 
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover border-2 border-[#F7D1D3] shadow-lg transform hover:scale-110 transition-all duration-300" // Zoom effect for avatar
          />
          <span className="text-[#7A3F6D]">{session.user.name}</span>
        </div>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="hover:text-[#FF3366] transition duration-300"
        >
          Sign In
        </button>
      )}
    </>
  );
}
