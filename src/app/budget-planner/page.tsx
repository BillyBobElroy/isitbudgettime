"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/Adslot"; 

export default function BudgetPlannerPage() {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<{ name: string; amount: number }[]>([
    { name: "", amount: 0 },
  ]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = income - totalExpenses;

  const addExpense = () => {
    setExpenses([...expenses, { name: "", amount: 0 }]);
  };

  const updateExpense = (index: number, field: "name" | "amount", value: string) => {
    const updated = [...expenses];
    if (field === "amount") {
      updated[index][field] = parseFloat(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setExpenses(updated);
  };

  return (
    <>
      <Navbar />
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      {/* SEO */}
      <h1 className="text-4xl font-bold mb-4 text-center">Simple Budget Planner</h1>
      <p className="text-lg mb-8 max-w-2xl text-center text-gray-600">
        Plan your monthly budget easily. Enter your income and expenses to see how much you have left.
      </p>

      {/* Income Input */}
      <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8">
        <label className="block mb-2 font-semibold">Monthly Income ($)</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2 mb-6"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
          placeholder="e.g., 3000"
        />

        {/* Expenses List */}
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>
        {expenses.map((expense, idx) => (
          <div key={idx} className="flex gap-4 mb-4">
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              placeholder="Expense Name"
              value={expense.name}
              onChange={(e) => updateExpense(idx, "name", e.target.value)}
            />
            <input
              type="number"
              className="w-32 border rounded px-3 py-2"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) => updateExpense(idx, "amount", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={addExpense}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Expense
        </button>

        {/* Budget Results */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold mb-2">Summary</h3>
          <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
          <p>
            <strong>Remaining Income:</strong>{" "}
            <span className={remaining >= 0 ? "text-green-600" : "text-red-600"}>
              ${remaining.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* SEO Block */}
      <section className="max-w-3xl text-gray-700 text-sm">
        <h2 className="text-2xl font-bold mb-4">How to Use This Budget Planner</h2>
        <p className="mb-2">
          Start by entering your total monthly income. Then, list all your regular expenses such as rent, utilities, subscriptions, groceries, and entertainment. As you add expenses, the tool will automatically calculate your total expenses and the amount of money you have left over.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Why Budgeting Matters</h3>
        <p className="mb-2">
          Budgeting helps you stay in control of your money, prepare for unexpected costs, reduce financial stress, and reach your savings goals faster.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">FAQs</h3>
        <p className="mb-2"><strong>What is the 50/30/20 rule?</strong> It is a popular budgeting method: 50% of income for needs, 30% for wants, and 20% for savings.</p>
        <p className="mb-2"><strong>Should I include subscriptions?</strong> Yes! Small monthly subscriptions add up quickly over the year.</p>
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
