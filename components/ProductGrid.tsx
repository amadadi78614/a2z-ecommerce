import { Product } from "@prisma/client";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <p className="text-sm text-gray-300">
        No products found yet. Check back soon or visit our store for more options.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          slug={p.slug}
          name={p.name}
          priceCents={p.price}
          oldPriceCents={p.oldPriceCents ?? undefined}
          image={p.imageUrl!}
        />
      ))}
    </div>
  );
}
