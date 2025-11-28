"use client";

import { FormEvent, useState } from "react";
import { useCartStore } from "@/lib/cartStore";

export default function CheckoutPage() {
  const { items, clear } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const body = {
      customer: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone")
      },
      address: {
        line1: formData.get("line1"),
        line2: formData.get("line2"),
        suburb: formData.get("suburb"),
        city: formData.get("city"),
        province: formData.get("province"),
        postalCode: formData.get("postalCode")
      },
      paymentProvider: formData.get("paymentProvider"),
      items
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error("Failed to create order");
      const data = await res.json();

      clear();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Order placed successfully!");
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="container max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Checkout</h1>
        <p className="text-sm text-gray-200">
          Your cart is empty. Add some products before checking out.
        </p>
      </section>
    );
  }

  return (
    <section className="container max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Checkout</h1>
      <form
        onSubmit={handleSubmit}
        className="glass bg-black/40 p-6 space-y-5 text-sm"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold text-white mb-2">Contact Information</h2>
            <div className="space-y-2">
              <input required name="name" placeholder="Full name" className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs" />
              <input required type="email" name="email" placeholder="Email address" className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs" />
              <input required name="phone" placeholder="Phone number" className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs" />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-2">Shipping Address</h2>
            <div className="space-y-2">
              <input required name="line1" placeholder="Address line 1" className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs" />
              <input name="line2" placeholder="Address line 2" className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs" />
              <input required name="suburb" placeholder="Suburb" className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs" />
              <input required name="city" placeholder="City" className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs" />
              <input required name="province" placeholder="Province" className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs" />
              <input required name="postalCode" placeholder="Postal code" className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-white mb-2">Payment Method</h2>
          <select
            name="paymentProvider"
            className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs"
            defaultValue="payfast"
          >
            <option value="payfast">PayFast (Card/EFT/SnapScan)</option>
            <option value="ozow">Ozow (Instant EFT)</option>
            <option value="eft">Manual EFT</option>
            <option value="cod">Cash on delivery (extra fee)</option>
          </select>
          <p className="text-[11px] text-gray-400 mt-1">
            Online payments are processed securely via PayFast or Ozow.
          </p>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary text-sm disabled:opacity-60"
        >
          {loading ? "Processing..." : "Complete Purchase"}
        </button>
      </form>
    </section>
  );
}
