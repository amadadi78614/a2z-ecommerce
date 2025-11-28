"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cartStore";

type Props = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  oldPriceCents?: number | null;
  image?: string;
};

export function ProductCard({ id, slug, name, priceCents, oldPriceCents, image }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const price = (priceCents / 100).toFixed(2);
  const oldPrice = oldPriceCents ? (oldPriceCents / 100).toFixed(2) : null;

  return (
    <div className="glass bg-black/40 p-3 flex flex-col gap-3">
      <Link href={`/products/${slug}`} className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-black/60">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover hover:scale-105 transition" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
            Image coming soon
          </div>
        )}
      </Link>
      <div className="space-y-1 flex-1">
        <Link href={`/products/${slug}`} className="text-sm font-semibold text-white line-clamp-2">
          {name}
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-brandYellow text-sm">R{price}</span>
          {oldPrice && (
            <span className="text-[11px] text-gray-400 line-through">R{oldPrice}</span>
          )}
        </div>
      </div>
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
        className="btn-primary w-full text-center text-xs"
      >
        Add to Cart
      </button>
    </div>
  );
}
