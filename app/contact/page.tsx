export default function ContactPage() {
  return (
    <section className="container max-w-3xl space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Contact Us</h1>
      <p className="text-sm text-gray-200">
        Need help with an order or repair? Reach out and our team will get back to you.
      </p>
      <div className="glass bg-black/40 p-6 text-sm space-y-3">
        <p><span className="font-semibold text-white">Phone:</span> 073 855 1211</p>
        <p><span className="font-semibold text-white">WhatsApp:</span> Tap the call button on mobile</p>
        <p><span className="font-semibold text-white">Email:</span> info@example.com</p>
        <p className="text-xs text-gray-400">
          Replace the contact details and map with your actual shop information.
        </p>
      </div>
    </section>
  );
}
