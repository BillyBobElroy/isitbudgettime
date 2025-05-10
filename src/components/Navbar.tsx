"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-700">
          isitbudgettime
        </Link>
        <nav className="space-x-6 text-gray-600 font-medium text-sm">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/all-tools" className="hover:text-blue-600 transition">Tools</Link>
          <Link href="/blog" className="hover:text-blue-600 transition">Blog</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
        </nav>
      </div>
    </header>
  );
}
