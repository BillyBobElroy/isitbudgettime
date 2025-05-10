"use client";

import React, { useState, useEffect } from "react";
import AdSlot from "@/components/Adslot";

export default function EmergencyFundCalculator() {
  const [inputs, setInputs] = useState({
    rent: "",
    utilities: "",
    groceries: "",
    insurance: "",
    other: "",
    months: "3",
  });

  // Load saved values from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("emergencyFundInputs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed === "object" && parsed !== null) {
          setInputs((prev) => ({ ...prev, ...parsed }));
        }
      } catch {
        console.error("Failed to parse emergency fund data");
      }
    }
  }, []);

  // Save to localStorage whenever inputs change
  useEffect(() => {
    localStorage.setItem("emergencyFundInputs", JSON.stringify(inputs));
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const monthlyTotal =
    Number(inputs.rent) +
    Number(inputs.utilities) +
    Number(inputs.groceries) +
    Number(inputs.insurance) +
    Number(inputs.other);

  const fundGoal = monthlyTotal * Number(inputs.months);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Emergency Fund Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate how much you should save to cover essential expenses in case of job loss or emergencies.
      </p>

      <form className="grid gap-4">
        {[
          { label: "Rent / Mortgage", name: "rent" },
          { label: "Utilities", name: "utilities" },
          { label: "Groceries", name: "groceries" },
          { label: "Insurance", name: "insurance" },
          { label: "Other Essentials", name: "other" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type="number"
              name={name}
              value={inputs[name as keyof typeof inputs]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="$0"
              min="0"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Months of Coverage</label>
          <select
            name="months"
            value={inputs.months}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            {[3, 4, 5, 6, 9, 12].map((m) => (
              <option key={m} value={m}>
                {m} months
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-lg">
          <strong>Monthly Essentials Total:</strong> ${monthlyTotal.toFixed(2)}
        </p>
        <p className="text-lg">
          <strong>Recommended Emergency Fund:</strong> ${fundGoal.toFixed(2)}
        </p>
      </div>

      <div className="my-8">
        <AdSlot adClient="ca-pub-xxxxxxxxxxxxxxxx" adSlot="yyyyyyyyyy" />
      </div>

      <section className="text-gray-700 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold mb-2">Why Build an Emergency Fund?</h2>
        <p className="mb-2">
          An emergency fund helps protect you from unexpected financial shocks like job loss, car repairs, or medical bills. Most experts recommend saving 3–6 months of essential living expenses.
        </p>
        <p>
          Use this tool regularly to adjust your fund target based on changes to your budget or cost of living.
        </p>
      </section>
    </main>
  );
}
