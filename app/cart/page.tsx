"use client";

import { useCartStore } from "@/lib/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQty, removeItem } = useCartStore();
  const subtotalCents = items.reduce(
    (sum, i) => sum + i.priceCents * i.quantity,
    0
  );
  const subtotal = (subtotalCents / 100).toFixed(2);

  return (
    <section className="container max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="glass bg-black/40 p-6 text-sm text-gray-200">
          Your cart is empty.{" "}
          <Link href="/shop" className="text-brandYellow underline">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="glass bg-black/40 p-4 flex items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    R{(item.priceCents / 100).toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQty(item.productId, Number(e.target.value))}
                    className="w-14 rounded-md bg-black/60 border border-white/20 text-xs px-1 py-1 text-center"
                  />
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-[11px] text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="glass bg-black/50 p-4 space-y-3 text-sm">
            <h2 className="font-semibold text-white">Order Summary</h2>
            <div className="flex justify-between text-xs text-gray-300">
              <span>Subtotal</span>
              <span>R{subtotal}</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Shipping will be calculated at checkout. Free delivery over R500.
            </p>
            <Link href="/checkout" className="btn-primary w-full text-center block">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
