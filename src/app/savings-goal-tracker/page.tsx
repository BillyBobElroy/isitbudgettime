"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/Adslot";

export default function SavingsGoalTrackerPage() {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [currentSaved, setCurrentSaved] = useState<number>(0);

  const percentage = targetAmount > 0 ? Math.min((currentSaved / targetAmount) * 100, 100) : 0;
  const remaining = Math.max(targetAmount - currentSaved, 0);

  return (
    <>
      <Navbar />
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      {/* SEO */}
      <h1 className="text-4xl font-bold mb-4 text-center">Savings Goal Tracker</h1>
      <p className="text-lg mb-8 max-w-2xl text-center text-gray-600">
        Track your savings progress toward any goal — whether it is a new car, vacation, or emergency fund.
      </p>

      {/* Form */}
      <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8 space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Goal Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g., Vacation Fund"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Target Amount ($)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={targetAmount}
            onChange={(e) => setTargetAmount(parseFloat(e.target.value) || 0)}
            placeholder="e.g., 5000"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Current Saved ($)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={currentSaved}
            onChange={(e) => setCurrentSaved(parseFloat(e.target.value) || 0)}
            placeholder="e.g., 1500"
          />
        </div>
      </div>

      {/* Progress Display */}
      <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Progress</h2>

        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div
            className="bg-green-500 h-6 rounded-full text-center text-white text-sm leading-6 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          >
            {percentage.toFixed(1)}%
          </div>
        </div>

        <p className="text-lg text-gray-700">
          {goalName ? `Goal: ${goalName}` : "Set a goal to begin!"}
        </p>
        <p className="text-lg text-gray-700">
          {currentSaved.toLocaleString()} saved out of {targetAmount.toLocaleString()} — ${remaining.toLocaleString()} to go!
        </p>
      </div>

      {/* SEO Block */}
      <section className="max-w-3xl text-gray-700 text-sm">
        <h2 className="text-2xl font-bold mb-4">Why Track Your Savings?</h2>
        <p className="mb-2">
          Visualizing your savings progress keeps you motivated and focused. Whether you are building an emergency fund, saving for a big purchase, or planning for retirement, seeing your progress can help you stay committed to your goals.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Tips for Reaching Your Goal Faster</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Set a specific, measurable savings target.</li>
          <li>Automate your savings with recurring transfers.</li>
          <li>Track your progress regularly to stay on course.</li>
          <li>Celebrate small milestones to keep motivated.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">FAQs</h3>
        <p className="mb-2"><strong>What if I exceed my goal?</strong> Congratulations! You can either adjust your goal higher or start saving for another dream.</p>
        <p className="mb-2"><strong>Should I track multiple goals?</strong> It is often best to focus on one major goal at a time for maximum progress, but you can manage multiple with good organization.</p>
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
