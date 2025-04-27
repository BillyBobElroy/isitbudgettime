"use client";

import { useEffect } from "react";

// Add safe type to window.adsbygoogle
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
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
