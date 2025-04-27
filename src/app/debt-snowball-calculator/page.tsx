"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/Adslot";

type Debt = {
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
};

export default function DebtSnowballCalculatorPage() {
  const [debts, setDebts] = useState<Debt[]>([
    { name: "", balance: 0, minPayment: 0, interestRate: 0 },
  ]);

  const addDebt = () => {
    setDebts([...debts, { name: "", balance: 0, minPayment: 0, interestRate: 0 }]);
  };

  const updateDebt = (index: number, field: keyof Debt, value: string) => {
    const updated = [...debts];
    if (field === "name") {
        updated[index].name = value;
      } else if (field === "balance") {
        updated[index].balance = parseFloat(value) || 0;
      } else if (field === "minPayment") {
        updated[index].minPayment = parseFloat(value) || 0;
      } else if (field === "interestRate") {
        updated[index].interestRate = parseFloat(value) || 0;
      }      
    setDebts(updated);
  };

  const sortedDebts = debts
    .filter((d) => d.name && d.balance > 0)
    .sort((a, b) => a.balance - b.balance);

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);

  const estimatedMonths = (debt: Debt) => {
    if (debt.minPayment <= 0) return Infinity;
    return Math.ceil(debt.balance / debt.minPayment);
  };

  return (
    <>
      <Navbar />
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      {/* SEO */}
      <h1 className="text-4xl font-bold mb-4 text-center">Debt Snowball Calculator</h1>
      <p className="text-lg mb-8 max-w-2xl text-center text-gray-600">
        List your debts to see a recommended payoff order using the snowball method — start with the smallest balances first!
      </p>

      {/* Debts Form */}
      <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8 space-y-6">
        {debts.map((debt, idx) => (
          <div key={idx} className="space-y-2 mb-4 border-b pb-4">
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Debt Name (e.g., Credit Card)"
              value={debt.name}
              onChange={(e) => updateDebt(idx, "name", e.target.value)}
            />
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Balance ($)"
              value={debt.balance}
              onChange={(e) => updateDebt(idx, "balance", e.target.value)}
            />
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Minimum Payment ($)"
              value={debt.minPayment}
              onChange={(e) => updateDebt(idx, "minPayment", e.target.value)}
            />
            <input
              type="number"
              step="0.01"
              className="w-full border rounded px-3 py-2"
              placeholder="Interest Rate (%)"
              value={debt.interestRate}
              onChange={(e) => updateDebt(idx, "interestRate", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={addDebt}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Another Debt
        </button>
      </div>

      {/* Snowball Results */}
      {sortedDebts.length > 0 && (
        <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Payoff Plan (Smallest Balance First)</h2>
          <ul className="space-y-4">
            {sortedDebts.map((debt, idx) => (
              <li key={idx} className="border p-4 rounded">
                <p className="font-semibold">{debt.name}</p>
                <p>Balance: ${debt.balance.toLocaleString()}</p>
                <p>Minimum Payment: ${debt.minPayment.toLocaleString()}</p>
                <p>Interest Rate: {debt.interestRate}%</p>
                <p className="mt-1 text-sm text-gray-600">
                  Estimated Months to Payoff: {estimatedMonths(debt) === Infinity ? "-" : estimatedMonths(debt)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <p><strong>Total Debt:</strong> ${totalDebt.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* SEO Block */}
      <section className="max-w-3xl text-gray-700 text-sm">
        <h2 className="text-2xl font-bold mb-4">What is the Debt Snowball Method?</h2>
        <p className="mb-2">
          The debt snowball method focuses on paying off debts from the smallest balance to the largest. You gain momentum and motivation with every debt you eliminate!
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Steps to Follow</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Make minimum payments on all debts.</li>
          <li>Put any extra money toward the debt with the smallest balance.</li>
          <li>Once a debt is paid off, roll that payment into the next smallest debt.</li>
          <li>Repeat until you're debt-free!</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">FAQs</h3>
        <p className="mb-2"><strong>Why focus on the smallest balance?</strong> Paying off smaller debts first gives you quick wins and motivation to keep going.</p>
        <p className="mb-2"><strong>Is this better than paying highest interest first?</strong> Mathematically, highest interest first saves more money, but snowball wins psychologically by building momentum.</p>
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