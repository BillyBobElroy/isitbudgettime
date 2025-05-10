"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import AdSlot from "@/components/Adslot";
import type { TooltipItem } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

type BillingFrequency = "monthly" | "yearly" | "weekly";

type Subscription = {
  name: string;
  amount: number;
  frequency: BillingFrequency;
};

export default function SubscriptionCostCalculatorPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { name: "", amount: 0, frequency: "monthly" },
  ]);
  const [highlightThreshold, setHighlightThreshold] = useState<number>(30);

  useEffect(() => {
    const rawSubs = localStorage.getItem("subscriptions");
    const rawThreshold = localStorage.getItem("highlightThreshold");
    try {
      if (rawSubs) {
        const parsedSubs = JSON.parse(rawSubs);
        if (Array.isArray(parsedSubs)) {
          const normalized = parsedSubs.map((sub) => ({
            name: sub.name ?? "",
            amount: typeof sub.amount === "number" ? sub.amount : 0,
            frequency: sub.frequency ?? "monthly",
          }));
          setSubscriptions(normalized);
        }
      }
      if (rawThreshold) {
        const parsedThreshold = parseFloat(rawThreshold);
        if (!isNaN(parsedThreshold)) setHighlightThreshold(parsedThreshold);
      }
    } catch {
      console.error("Failed to load from localStorage");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem("highlightThreshold", String(highlightThreshold));
  }, [highlightThreshold]);

  const addSubscription = () => {
    setSubscriptions([
      ...subscriptions,
      { name: "", amount: 0, frequency: "monthly" },
    ]);
  };

  const updateSubscription = (
    index: number,
    field: keyof Subscription,
    value: string
  ) => {
    const updated = [...subscriptions];
    if (field === "name") {
      updated[index].name = value;
    } else if (field === "amount") {
      updated[index].amount = parseFloat(value) || 0;
    } else if (field === "frequency") {
      updated[index].frequency = value as BillingFrequency;
    }
    setSubscriptions(updated);
  };

  const clearSubscriptions = () => {
    if (confirm("Clear all subscriptions?")) {
      localStorage.removeItem("subscriptions");
      setSubscriptions([{ name: "", amount: 0, frequency: "monthly" }]);
    }
  };

  const monthlyEquivalent = (sub: Subscription) => {
    if (sub.frequency === "monthly") return sub.amount;
    if (sub.frequency === "yearly") return sub.amount / 12;
    if (sub.frequency === "weekly") return sub.amount * 4.33;
    return 0;
  };

  const totalMonthly = subscriptions.reduce(
    (sum, sub) => sum + monthlyEquivalent(sub),
    0
  );
  const totalYearly = totalMonthly * 12;

  const chartColors = [
    "#4f46e5", "#16a34a", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6", "#ec4899", "#0ea5e9"
  ];

  const chartData = {
    labels: subscriptions.map((s) => s.name || "(Unnamed)"),
    datasets: [
      {
        label: "Monthly Cost ($)",
        data: subscriptions.map(monthlyEquivalent),
        backgroundColor: subscriptions.map((s, i) =>
          monthlyEquivalent(s) >= highlightThreshold
            ? "#facc15" // yellow
            : chartColors[i % chartColors.length]
        ),
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Subscription Breakdown",
        font: { size: 18 },
        color: "#111827",
        padding: { bottom: 10 },
      },
tooltip: {
  callbacks: {
    label: (ctx: TooltipItem<"bar">) => `$${(ctx.raw as number).toFixed(2)} / month`,
  },
},
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          color: "#374151",
        },
        title: {
          display: true,
          text: "Cost ($)",
          color: "#374151",
        },
      },
      x: {
        ticks: { color: "#374151" },
      },
    },
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Subscription Cost Calculator
      </h1>
      <p className="text-lg mb-8 max-w-2xl text-center text-gray-600">
        See how much you spend on subscriptions per month and per year.
        Track everything from Netflix to gym memberships easily.
      </p>

      {/* Threshold Input */}
      <div className="mb-6 w-full max-w-2xl text-right">
        <label className="text-sm font-medium mr-2">
          Expensive Threshold ($/mo)
        </label>
        <input
          type="number"
          className="w-24 border rounded px-2 py-1 text-sm"
          value={highlightThreshold}
          onChange={(e) =>
            setHighlightThreshold(parseFloat(e.target.value) || 0)
          }
        />
      </div>

      {/* Subscriptions Form */}
      <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8 space-y-6">
        {subscriptions.map((sub, idx) => {
          const monthly = monthlyEquivalent(sub);
          const isExpensive = monthly >= highlightThreshold;

          return (
            <div
              key={idx}
              className={`space-y-2 mb-4 border-b pb-4 ${
                isExpensive ? "bg-yellow-100 border-yellow-400" : ""
              }`}
            >
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Subscription Name (e.g., Netflix)"
                value={sub.name || ""}
                onChange={(e) => updateSubscription(idx, "name", e.target.value)}
              />
              <div className="flex gap-4">
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Cost"
                  value={isNaN(sub.amount) ? "" : sub.amount}
                  onChange={(e) => updateSubscription(idx, "amount", e.target.value)}
                />
                <select
                  value={sub.frequency}
                  onChange={(e) => updateSubscription(idx, "frequency", e.target.value)}
                  className="border rounded px-2 py-2"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              {isExpensive && (
                <p className="text-sm text-yellow-800 font-semibold">
                  ⚠️ Monthly equivalent is over ${highlightThreshold}/mo.
                  Consider reviewing.
                </p>
              )}
            </div>
          );
        })}

        <div className="flex gap-4">
          <button
            onClick={addSubscription}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Another Subscription
          </button>
          <button
            onClick={clearSubscriptions}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
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

      {/* Monthly Chart */}
      {subscriptions.length > 0 && (
        <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

            {/* SEO Block */}
      <section className="max-w-3xl text-gray-700 text-sm">
        <h2 className="text-2xl font-bold mb-4">Why Track Your Subscriptions?</h2>
        <p className="mb-2">
          Subscriptions can silently drain your finances over time. Tracking
          them ensures you are aware of recurring charges and helps you decide
          if you are getting your money’s worth.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          Tips to Save Money on Subscriptions
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cancel unused or duplicate subscriptions.</li>
          <li>Negotiate lower rates or look for bundle deals.</li>
          <li>Set reminders before renewal dates to reassess value.</li>
          <li>Consider sharing plans with family or friends.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">FAQs</h3>
        <p className="mb-2">
          <strong>What is a common hidden cost?</strong> Small $5–$15
          subscriptions (apps, streaming, newsletters) add up fast and often go
          unnoticed.
        </p>
        <p className="mb-2">
          <strong>How often should I review subscriptions?</strong> Ideally
          every 3–6 months to cancel what you do not use anymore.
        </p>
      </section>

      {/* AdSlot */}
      <section className="max-w-4xl mt-20">
        <AdSlot adClient="ca-pub-xxxxxxxxxxxxxxxx" adSlot="xxxxxxxxxx" />
      </section>
    </main>
  );
}
