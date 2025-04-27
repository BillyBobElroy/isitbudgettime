"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/Adslot"; 

type Bill = {
  name: string;
  dueDate: string;
  email: string;
  remindBeforeDays: number;
};

export default function BillReminderToolPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [newBill, setNewBill] = useState<Bill>({
    name: "",
    dueDate: "",
    email: "",
    remindBeforeDays: 3,
  });

  // Load saved bills from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bills");
    if (saved) {
      setBills(JSON.parse(saved));
    }
  }, []);

  const saveBill = () => {
    if (!newBill.name || !newBill.dueDate || !newBill.email) return;

    const updatedBills = [...bills, newBill];
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
    setNewBill({ name: "", dueDate: "", email: "", remindBeforeDays: 3 });
  };

  const deleteBill = (index: number) => {
    const updated = [...bills];
    updated.splice(index, 1);
    setBills(updated);
    localStorage.setItem("bills", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      {/* SEO */}
      <h1 className="text-4xl font-bold mb-4 text-center">Bill Reminder Tool</h1>
      <p className="text-lg mb-8 max-w-2xl text-center text-gray-600">
        Never miss a bill again. Set up reminders to email yourself before your bills are due.
      </p>

      {/* New Bill Form */}
      <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8 space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Bill Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Electricity Bill"
            value={newBill.name}
            onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Due Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={newBill.dueDate}
            onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Your Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="your@email.com"
            value={newBill.email}
            onChange={(e) => setNewBill({ ...newBill, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Remind Me (days before)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={newBill.remindBeforeDays}
            onChange={(e) => setNewBill({ ...newBill, remindBeforeDays: parseInt(e.target.value) || 1 })}
          />
        </div>

        <button
          onClick={saveBill}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Reminder
        </button>
      </div>

      {/* Saved Bills */}
      {bills.length > 0 && (
        <div className="w-full max-w-2xl bg-white shadow p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Saved Reminders</h2>
          <ul className="space-y-4">
            {bills.map((bill, idx) => (
              <li key={idx} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">{bill.name}</p>
                  <p>Due: {bill.dueDate}</p>
                  <p>Email: {bill.email}</p>
                  <p>Remind {bill.remindBeforeDays} day(s) before</p>
                </div>
                <button
                  onClick={() => deleteBill(idx)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SEO Block */}
      <section className="max-w-3xl text-gray-700 text-sm">
        <h2 className="text-2xl font-bold mb-4">Why Set Bill Reminders?</h2>
        <p className="mb-2">
          Missing bill payments can hurt your credit score, lead to late fees, and cause unnecessary stress. Setting reminders helps you stay on track and avoid surprises.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Tips for Managing Bills</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Set due dates on a calendar you check daily.</li>
          <li>Use automatic payments where possible — but still track them.</li>
          <li>Keep an emergency fund for unexpected bills.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">FAQs</h3>
        <p className="mb-2"><strong>Will this tool actually send emails?</strong> This version saves your reminders. Sending real emails would require EmailJS or a backend setup (optional future upgrade).</p>
        <p className="mb-2"><strong>Can I edit a saved reminder?</strong> Right now, you can delete and re-add. Editing feature could be added easily later if needed.</p>
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
