"use client";

import { useEffect, useState } from "react";
import AdSlot from "@/components/Adslot";

// ✅ Define types
type Expense = { name: string; amount: number };
type Budget = {
  id: string;
  name: string;
  income: number;
  expenses: Expense[];
  created: string;
  modified: string;
};

export default function BudgetPlannerPage() {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([{ name: "", amount: 0 }]);
  const [savedBudgets, setSavedBudgets] = useState<Budget[]>([]);
  const [currentId, setCurrentId] = useState<string>("");

  // Load all saved budgets on mount
  useEffect(() => {
    const raw = localStorage.getItem("budgets");
    if (raw) {
      try {
        const parsed: Budget[] = JSON.parse(raw);
        setSavedBudgets(parsed);
        if (parsed.length > 0) {
          loadBudget(parsed[0]);
        }
      } catch {
        console.error("Failed to parse saved budgets");
      }
    }
  }, []);

  // Auto-save on every change
  useEffect(() => {
    if (!currentId) return;
    const updated = savedBudgets.map((b) =>
      b.id === currentId
        ? { ...b, income, expenses, modified: new Date().toISOString() }
        : b
    );
    localStorage.setItem("budgets", JSON.stringify(updated));
    setSavedBudgets(updated);
  }, [income, expenses, currentId, savedBudgets]);

  const loadBudget = (budget: Budget) => {
    setCurrentId(budget.id);
    setIncome(budget.income);
    setExpenses(budget.expenses);
  };

  const saveAsNewBudget = () => {
    const name = prompt("Enter a name for this budget:");
    if (!name) return;
    const id = crypto.randomUUID();
    const newBudget: Budget = {
      id,
      name,
      income,
      expenses,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    };
    const updated = [newBudget, ...savedBudgets];
    localStorage.setItem("budgets", JSON.stringify(updated));
    setSavedBudgets(updated);
    setCurrentId(id);
    alert(`✅ Budget saved as '${name}'`);
  };

  const renameBudget = () => {
    const newName = prompt("Enter a new name:");
    if (!newName || !currentId) return;
    const updated = savedBudgets.map((b) =>
      b.id === currentId ? { ...b, name: newName } : b
    );
    localStorage.setItem("budgets", JSON.stringify(updated));
    setSavedBudgets(updated);
  };

  const deleteBudget = () => {
    if (!currentId) return;
    const updated = savedBudgets.filter((b) => b.id !== currentId);
    localStorage.setItem("budgets", JSON.stringify(updated));
    setSavedBudgets(updated);
    if (updated.length > 0) {
      loadBudget(updated[0]);
    } else {
      setIncome(0);
      setExpenses([{ name: "", amount: 0 }]);
      setCurrentId("");
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = income - totalExpenses;

  const addExpense = () => {
    setExpenses([...expenses, { name: "", amount: 0 }]);
  };

  const updateExpense = (index: number, field: "name" | "amount", value: string) => {
    const updated = [...expenses];
    updated[index] = {
      ...updated[index],
      [field]: field === "amount" ? parseFloat(value) || 0 : value,
    };
    setExpenses(updated);
  };

  const generateCSV = () => {
    const header = "Expense,Amount\n";
    const rows = expenses.map((e) => `${e.name},${e.amount}`).join("\n");
    const summary = `\nTotal Expenses,${totalExpenses}\nRemaining,${remaining}`;
    return header + rows + summary;
  };

  const generateText = () => {
    const lines = expenses.map((e) => `- ${e.name}: $${e.amount.toFixed(2)}`);
    lines.push(`\nTotal Expenses: $${totalExpenses.toFixed(2)}`);
    lines.push(`Remaining Income: $${remaining.toFixed(2)}`);
    return `Budget Summary:\n\n${lines.join("\n")}`;
  };

  const download = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center">Simple Budget Planner</h1>

      {savedBudgets.length > 0 && (
        <div className="mb-6 w-full max-w-2xl">
          <label className="block text-sm font-semibold mb-1">Select Saved Budget</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={currentId}
            onChange={(e) => {
              const budget = savedBudgets.find((b) => b.id === e.target.value);
              if (budget) loadBudget(budget);
            }}
          >
            {savedBudgets.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} {b.modified ? ` - Last updated ${new Date(b.modified).toLocaleDateString()}` : ""}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-2">
            <button onClick={renameBudget} className="text-blue-600 text-sm underline">Rename</button>
            <button onClick={deleteBudget} className="text-red-600 text-sm underline">Delete</button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8">
        <label className="block mb-2 font-semibold">Monthly Income ($)</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2 mb-6"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
          placeholder="e.g., 3000"
        />

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

        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold mb-2">Summary</h3>
          <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
          <p>
            <strong>Remaining Income:</strong>{" "}
            <span className={remaining >= 0 ? "text-green-600" : "text-red-600"}>
              ${remaining.toFixed(2)}
            </span>
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => download("budget.csv", generateCSV(), "text/csv")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Export as CSV
            </button>
            <button
              onClick={() => download("budget.txt", generateText(), "text/plain")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Export as Text
            </button>
            <button
              onClick={saveAsNewBudget}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Budget
            </button>
            <button
              onClick={deleteBudget}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Saved Budget
            </button>
          </div>
        </div>
      </div>

      {/* SEO / Help Section */}
      <section className="max-w-3xl text-gray-700 text-sm">
        <h2 className="text-2xl font-bold mb-4">How to Use This Budget Planner</h2>
        <p className="mb-2">
          Start by entering your total monthly income. Then, list all your regular expenses such as rent, utilities,
          subscriptions, groceries, and entertainment. As you add expenses, the tool will automatically calculate your
          total expenses and the amount of money you have left over.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Why Budgeting Matters</h3>
        <p className="mb-2">
          Budgeting helps you stay in control of your money, prepare for unexpected costs, reduce financial stress,
          and reach your savings goals faster.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">FAQs</h3>
        <p className="mb-2"><strong>What is the 50/30/20 rule?</strong> It’s a popular budgeting method: 50% of income for needs, 30% for wants, and 20% for savings.</p>
        <p className="mb-2"><strong>Should I include subscriptions?</strong> Yes! Small monthly subscriptions add up quickly over the year.</p>
      </section>

      <section className="max-w-4xl mt-20">
        <AdSlot adClient="ca-pub-xxxxxxxxxxxxxxxx" adSlot="xxxxxxxxxx" />
      </section>
    </main>
  );
}
