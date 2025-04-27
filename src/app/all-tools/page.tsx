import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/Adslot";

export const metadata = {
  title: "All Tools | isitbudgettime",
  description: "Browse all free personal finance tools including a budget planner, savings tracker, debt payoff calculator, subscription cost calculator, and bill reminder tool. Manage your money smarter today!",
};

export default function AllToolsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center p-8">
        {/* Page Title and Intro */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 text-blue-700">
            All Personal Finance Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore every tool available in the suite — designed to help you budget, save, manage debt, and organize your bills with ease.
          </p>
        </section>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full" id="tools">
          {[
            {
              href: "/budget-planner",
              icon: "📊",
              title: "Simple Budget Planner",
              desc: "Plan your monthly income vs expenses easily and stay financially confident.",
            },
            {
              href: "/savings-goal-tracker",
              icon: "💰",
              title: "Savings Goal Tracker",
              desc: "Visualize your progress toward vacations, emergency funds, and big goals.",
            },
            {
              href: "/debt-snowball-calculator",
              icon: "🏦",
              title: "Debt Snowball Calculator",
              desc: "Create a fast-track payoff strategy by targeting your smallest debts first.",
            },
            {
              href: "/subscription-cost-calculator",
              icon: "🎟️",
              title: "Subscription Cost Calculator",
              desc: "Track your monthly and yearly subscription expenses in one simple place.",
            },
            {
              href: "/bill-reminder-tool",
              icon: "⏰",
              title: "Bill Reminder Tool",
              desc: "Save email reminders to never miss another payment or due date again.",
            },
          ].map((tool, idx) => (
            <a
              key={idx}
              href={tool.href}
              className="flex flex-col gap-4 bg-white shadow-sm hover:shadow-md transition rounded-2xl p-6 border border-gray-200 hover:border-blue-400"
            >
              <div className="text-5xl">{tool.icon}</div>
              <h2 className="text-2xl font-bold text-blue-700">{tool.title}</h2>
              <p className="text-gray-600">{tool.desc}</p>
            </a>
          ))}
        </section>

        {/* SEO Rich Content Block */}
        <section className="max-w-4xl mt-20 text-gray-700 text-base leading-relaxed" id="about">
          <h2 className="text-3xl font-bold mb-6 text-center">How to Use These Tools</h2>
          <p className="mb-6">
            Each tool in the isitbudgettime suite is designed to work independently — no login required, no complicated setup. Simply pick the tool you need, enter your numbers, and get actionable results instantly.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-8">Benefits of Managing Your Finances</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gain better control over monthly spending and income.</li>
            <li>Stay motivated by tracking savings milestones visually.</li>
            <li>Pay off debt faster using smart, psychological strategies.</li>
            <li>Catch "subscription leaks" and reduce unnecessary expenses.</li>
            <li>Never miss bill due dates and avoid costly late fees.</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4 mt-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <p><strong>Are these tools really free?</strong> Yes — every tool is free to use with no sign-up required.</p>
            <p><strong>Is my data safe?</strong> Absolutely. Everything is stored locally in your browser. No data is uploaded to servers.</p>
            <p><strong>Can I use them on mobile?</strong> Yes! Every tool is fully responsive and mobile-friendly.</p>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 text-center">
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              ← Back to Home
            </a>
          </div>
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
