import { prisma } from "@/lib/prisma";
import ShopClient from "@/components/ShopClient";

export default async function HomePage() {
  // Fetch data on the server
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900">
          A2Z Mobile & Electronics
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          The best deals on Smartphones, Laptops, Electronics, and repairs in South Africa.
        </p>
      </div>

      {/* Hand over to the interactive component */}
      <ShopClient initialProducts={products} categories={categories} />
    </div>
  );
}