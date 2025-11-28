import { prisma } from "@/lib/prisma";
import { ProductGrid } from "@/components/ProductGrid";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="container">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Shop All Products</h1>
      <p className="text-sm text-gray-300 mb-4">
        Browse mobile accessories, chargers, power banks, computer accessories and more.
      </p>
      <ProductGrid products={products} />
    </section>
  );
}
