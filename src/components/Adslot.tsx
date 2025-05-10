"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: { push: (options: object) => void };
  }
}

type AdSlotProps = {
  adClient: string;
  adSlot: string;
};

export default function AdSlot({ adClient, adSlot }: AdSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-4"
      role="region"
      aria-label="Advertisement"
    >
      <span className="sr-only">Advertisement</span>
      <ins
        className="adsbygoogle block text-center"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
