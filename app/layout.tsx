import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal AI Marketing Assistant",
  description: "AI-powered marketing reports, website audits, and competitor research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        {/* Navigation Bar */}
        <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">AI Marketer</span>
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
