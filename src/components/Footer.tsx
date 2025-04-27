"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-20 py-6 text-center text-gray-400 text-xs">
      © {new Date().getFullYear()} isitbudgettime.com. All rights reserved.
    <div className="mt-2 space-x-4">
        <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
      <a href="/terms-and-conditions" className="hover:underline">Terms</a>
    </div>
    </footer>
  );
}
