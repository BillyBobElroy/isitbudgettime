"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [accepted, setAccepted] = useState<boolean>(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (cookieConsent === "accepted") {
      setAccepted(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-100 border-t border-blue-300 p-4 flex flex-col md:flex-row items-center justify-between text-sm text-blue-900 z-50">
      <p className="mb-2 md:mb-0 text-center md:text-left">
        We use cookies to personalize ads and improve your experience. By using our site, you agree to our{" "}
        <a href="/privacy-policy" className="underline hover:text-blue-700">Privacy Policy</a>.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2 md:mt-0 md:ml-4"
      >
        Accept
      </button>
    </div>
  );
}
