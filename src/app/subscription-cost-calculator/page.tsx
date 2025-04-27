"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/Adslot";

type Subscription = {
  name: string;
  monthlyCost: number;
};

export default function SubscriptionCostCalculatorPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { name: "", monthlyCost: 0 },
  ]);

  const addSubscription = () => {
    setSubscriptions([...subscriptions, { name: "", monthlyCost: 0 }]);
  };

  const updateSubscription = (index: number, field: keyof Subscription, value: string) => {
    const updated = [...subscriptions];
    if (field === "name") {
      updated[index].name = value;
    } else if (field === "monthlyCost") {
      updated[index].monthlyCost = parseFloat(value) || 0;
    }
    setSubscriptions(updated);
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.monthlyCost, 0);
  const totalYearly = totalMonthly * 12;

  return (
    <>
      <Navbar />
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      {/* SEO */}
      <h1 className="text-4xl font-bold mb-4 text-center">Subscription Cost Calculator</h1>
      <p className="text-lg mb-8 max-w-2xl text-center text-gray-600">
        See how much you spend on subscriptions per month and per year. Track everything from Netflix to gym memberships easily.
      </p>

      {/* Subscriptions Form */}
      <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8 space-y-6">
        {subscriptions.map((sub, idx) => (
          <div key={idx} className="space-y-2 mb-4 border-b pb-4">
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Subscription Name (e.g., Netflix)"
              value={sub.name}
              onChange={(e) => updateSubscription(idx, "name", e.target.value)}
            />
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Monthly Cost ($)"
              value={sub.monthlyCost}
              onChange={(e) => updateSubscription(idx, "monthlyCost", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={addSubscription}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Another Subscription
        </button>
      </div>

      {/* Results */}
      {subscriptions.length > 0 && (
        <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <p className="text-lg mb-2">
            <strong>Total Monthly Cost:</strong> ${totalMonthly.toFixed(2)}
          </p>
          <p className="text-lg">
            <strong>Total Yearly Cost:</strong> ${totalYearly.toFixed(2)}
          </p>
        </div>
      )}

      {/* SEO Block */}
      <section className="max-w-3xl text-gray-700 text-sm">
        <h2 className="text-2xl font-bold mb-4">Why Track Your Subscriptions?</h2>
        <p className="mb-2">
          Subscriptions can silently drain your finances over time. Tracking them ensures you are aware of recurring charges and helps you decide if you're getting your money's worth.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Tips to Save Money on Subscriptions</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cancel unused or duplicate subscriptions.</li>
          <li>Negotiate lower rates or look for bundle deals.</li>
          <li>Set reminders before renewal dates to reassess value.</li>
          <li>Consider sharing plans with family or friends.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">FAQs</h3>
        <p className="mb-2"><strong>What is a common hidden cost?</strong> Small $5–$15 subscriptions (apps, streaming, newsletters) add up fast and often go unnoticed.</p>
        <p className="mb-2"><strong>How often should I review subscriptions?</strong> Ideally every 3–6 months to cancel what you do not use anymore.</p>
      </section>
      {/* AdSense Ad Slot */}
      <section className="max-w-4xl mt-20">
          <AdSlot adClient="ca-pub-xxxxxxxxxxxxxxxx" adSlot="xxxxxxxxxx" />
      </section>
    </main>
    <Footer />
    </>
  );
}
