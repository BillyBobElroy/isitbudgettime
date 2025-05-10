import AdSlot from "@/components/Adslot"; 
import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | Personal Finance Mini Tools Suite",
  description: "Read the Terms and Conditions for using the Personal Finance Mini Tools Suite website and services.",
};

export default function TermsPage() {
  return (
    <>

      <main className="min-h-screen bg-white flex flex-col items-center p-8">
        <section className="max-w-4xl text-gray-700 text-base leading-relaxed space-y-8">
          <h1 className="text-4xl font-bold mb-6 text-blue-700 text-center">Terms and Conditions</h1>

          <p>
            Welcome to isitbudgettime! By using our website, you agree to the following Terms and Conditions. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold">Use of the Site</h2>
          <p>
            Our tools are intended for personal, non-commercial use. You agree to use the site responsibly and not to misuse the tools or attempt to interfere with their operation.
          </p>

          <h2 className="text-2xl font-semibold">Privacy</h2>
          <p>
            Please refer to our <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a> for information about how we handle your data.
          </p>

          <h2 className="text-2xl font-semibold">Third-Party Links</h2>
          <p>
            We may include links to third-party websites or ads. We are not responsible for the content, policies, or practices of third parties.
          </p>

          <h2 className="text-2xl font-semibold">Disclaimer</h2>
          <p>
            While we aim to provide accurate and helpful tools, Personal Finance Mini Tools Suite makes no warranties about the accuracy, reliability, or completeness of any content or calculations. Use our tools at your own risk.
          </p>

          <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
          <p>
            We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the site or tools.
          </p>

          <h2 className="text-2xl font-semibold">Changes to These Terms</h2>
          <p>
            We reserve the right to update these Terms and Conditions at any time. Continued use of the site after changes constitutes acceptance of the new terms.
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

    </>
  );
}
