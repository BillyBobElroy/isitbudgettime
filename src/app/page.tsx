import React from "react";
import CookieBanner from "@/components/CookieBanner";
import AdSlot from "@/components/Adslot"; 

export const metadata = {
  title: "isitbudgettime Suite | Free Budget, Savings, Debt, and Bill Tools",
  description: "Use our free personal finance mini tools to manage your budget, savings goals, debt repayment, subscription costs, and bill reminders. Simple and privacy-friendly!",
  keywords: "budget planner, savings goal tracker, debt snowball calculator, subscription cost calculator, bill reminder tool, personal finance tools, free money tools",
  openGraph: {
    title: "isitbudgettime Suite",
    description: "Simple, free tools to help you manage your budget, savings, debt, subscriptions, and bills — all in one place.",
    url: "https://your-site-url.com/",
    siteName: "isitbudgettime Suite",
    images: [
      {
        url: "https://your-site-url.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Personal Finance Tools Suite",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "isitbudgettime Suite",
    description: "Simple, free tools to manage your money smarter: budget planner, savings tracker, debt payoff calculator, and more.",
    images: ["https://your-site-url.com/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center p-8">
        {/* Hero Section */}
<section className="w-full max-w-7xl text-center py-24 px-4">
  <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-700 leading-tight">
    Take Control of Your Finances <br className="hidden md:inline" />
    with Free, Powerful Tools
  </h1>
  <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
    Build budgets, save for goals, crush your debts, and never miss a bill — all with simple, private, easy-to-use tools.
  </p>

  <div className="flex flex-col md:flex-row gap-4 justify-center">
    <a
      href="/all-tools"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
    >
      🚀 Get Started Free
    </a>
  </div>
</section>

        {/* Featured Tools */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full" id="tools">
          {[
            {
              href: "/budget-planner",
              icon: "📊",
              title: "Budget Planner",
              desc: "Plan your income and expenses fast.",
            },
            {
              href: "/savings-goal-tracker",
              icon: "💰",
              title: "Savings Tracker",
              desc: "Visualize your financial goals easily.",
            },
            {
              href: "/debt-snowball-calculator",
              icon: "🏦",
              title: "Debt Snowball Calculator",
              desc: "Pay off your smallest debts first and gain momentum.",
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

          {/* AdSense Ad Slot */}
          <section className="max-w-4xl mt-20">
            <AdSlot adClient="ca-pub-xxxxxxxxxxxxxxxx" adSlot="xxxxxxxxxx" />
          </section>

        {/* About / SEO Section */}
        <section className="max-w-4xl mt-20 text-gray-700 text-base leading-relaxed" id="about">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Our Tools?</h2>
          <p className="mb-6">
            Financial tools do not have to be complicated. Our suite gives you fast, private, powerful solutions for budgeting, saving, and debt management — without login walls or bloated apps.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-8">Built for Simplicity</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>No sign-ups required. 100% privacy-focused.</li>
            <li>Mobile-friendly and lightweight.</li>
            <li>Instant insights — no waiting or confusing dashboards.</li>
            <li>Free forever. No hidden fees or upsells.</li>
          </ul>

          <div className="text-center mt-12">
            <a
              href="/all-tools"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              🌟 See All Free Tools
            </a>
          </div>
        </section>
      </main>
      <CookieBanner />
    </>
  );
}
