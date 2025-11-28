"use client";

import { useCartStore } from "@/lib/cartStore";

type Props = {
  id: string;
  name: string;
  priceCents: number;
  image?: string;
};

export function AddToCartButton({ id, name, priceCents, image }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() =>
        addItem(
          {
            productId: id,
            name,
            priceCents,
            image
          },
          1
        )
      }
      className="btn-primary text-sm"
    >
      Add to Cart
    </button>
  );
}
