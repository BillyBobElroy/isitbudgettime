"use client";

import React from "react";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-blue-700">
          Finance Tools
        </a>
        <nav className="space-x-6 text-gray-600 font-medium text-sm">
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          <a href="/all-tools" className="hover:text-blue-600 transition">Tools</a>
          <a href="/about" className="hover:text-blue-600 transition">About</a>
        </nav>
      </div>
    </header>
  );
}
