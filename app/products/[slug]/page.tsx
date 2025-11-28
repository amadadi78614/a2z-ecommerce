import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";

type Props = {
  params: { slug: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug }
  });

  if (!product) return notFound();

  const price = (product.priceCents / 100).toFixed(2);
  const oldPrice = product.oldPriceCents
    ? (product.oldPriceCents / 100).toFixed(2)
    : null;

  return (
    <section className="container grid gap-8 md:grid-cols-2 mt-4">
      <div className="glass bg-black/50 p-4">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/70">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
              Image coming soon
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{product.name}</h1>
          <p className="text-xs text-gray-400 mt-1">Brand: {product.brand ?? "A2Z"}</p>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-brandYellow">R{price}</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">R{oldPrice}</span>
          )}
        </div>
        <p className="text-sm text-gray-200 whitespace-pre-line">
          {product.description}
        </p>
        <p className="text-xs text-successGreen">
          Stock: {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
        </p>
        <AddToCartButton
          id={product.id}
          name={product.name}
          priceCents={product.priceCents}
          image={product.images[0]}
        />
      </div>
    </section>
  );
}
