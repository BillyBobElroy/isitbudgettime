import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/Adslot";

export const metadata = {
  title: "About Us | isitbudgettime Suite",
  description: "Learn more about the mission behind the isitbudgettime Suite — free, simple, private tools to help you manage your money smarter without complicated apps or subscriptions.",
};

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center p-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 text-blue-700">
            About isitbudgettime Suite
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We are here to help you manage your money smarter — with lightweight, privacy-first financial tools anyone can use, anytime, for free.
          </p>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl text-gray-700 text-base leading-relaxed space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p>
              Personal finance should be accessible, simple, and empowering. Too many budgeting apps today are bloated, expensive, or overcomplicated. We built the isitbudgettime Suite to offer clear, fast, effective tools that anyone — from students to retirees — can use immediately without friction or fear of privacy invasion.
            </p>
          </div>

          {/* How It Works */}
          <div>
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="mb-4">
              Each tool — whether it iss the Budget Planner, Savings Tracker, Debt Snowball Calculator, or Bill Reminder — works entirely within your browser. We use simple local storage to save your entries, meaning your data stays private and on your device.
            </p>
            <p>
              No accounts. No subscriptions. No hidden fees. Just instant, lightweight, easy-to-use financial calculators at your fingertips.
            </p>
          </div>

          {/* Core Values */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Simplicity:</strong> Designed to be intuitive, fast, and clutter-free.</li>
              <li><strong>Privacy:</strong> We respect your data. Everything is stored locally — not on servers.</li>
              <li><strong>Accessibility:</strong> Fully mobile-friendly and free forever.</li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <p><strong>Is everything really free?</strong> Yes. All tools are free with no hidden fees or upsells.</p>
              <p><strong>Will you add more tools?</strong> Yes! We plan to expand with more personal finance helpers over time based on user feedback.</p>
              <p><strong>Can I save my data across devices?</strong> Currently, data is saved locally per device. Future updates may allow optional backup/export options while preserving privacy.</p>
              <p><strong>Who created this?</strong> A small independent team passionate about making personal finance simpler for everyone.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <a
              href="/all-tools"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              🚀 Explore All Free Tools
            </a>
          </div>
        </section>
          {/* AdSense Ad Slot */}
          <section className="max-w-4xl mt-20">
            <AdSlot adClient="ca-pub-xxxxxxxxxxxxxxxx" adSlot="xxxxxxxxxx" />
          </section>
      </main>
    </>
  );
}
