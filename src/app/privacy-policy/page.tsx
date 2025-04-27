import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/Adslot";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Personal Finance Mini Tools Suite",
  description: "Read the Privacy Policy for the Personal Finance Mini Tools Suite. Your privacy is important to us. We respect your data and ensure full transparency.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white flex flex-col items-center p-8">
        <section className="max-w-4xl text-gray-700 text-base leading-relaxed space-y-8">
          <h1 className="text-4xl font-bold mb-6 text-blue-700 text-center">Privacy Policy</h1>

          <p>
            isitbudgettime (we, our, us) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <p>
            We do not collect any personal information directly. All data you enter into our tools (e.g., budget entries, savings goals) is stored locally in your browser via localStorage. We do not upload, access, or store your data on any server.
          </p>

          <h2 className="text-2xl font-semibold">Third-Party Ads</h2>
          <p>
            We may use Google AdSense to display advertisements. AdSense may collect anonymized data (e.g., cookies) to personalize ads. You can learn more about how Google uses data by visiting their <a href="https://policies.google.com/technologies/ads" target="_blank" className="text-blue-600 underline">Advertising Policy</a>.
          </p>

          <h2 className="text-2xl font-semibold">Cookies</h2>
          <p>
            Cookies may be used to personalize ad experiences. You can adjust your browser settings to decline cookies if you prefer.
          </p>

          <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. Updates will be posted on this page with a new effective date.
          </p>

          <h2 className="text-2xl font-semibold">Contact</h2>
          <p>
            For questions about this Privacy Policy, please contact us via the <a href="/about" className="text-blue-600 underline">About</a> page.
          </p>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              ← Back to Home
            </Link>
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
