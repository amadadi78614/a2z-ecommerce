import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-3 text-xs text-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Products</h2>
        <p className="text-[11px] text-gray-400">
          (Implement create/edit/delete using separate pages or modals)
        </p>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[11px] text-gray-400 uppercase">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Stock</th>
              <th className="py-2 pr-4">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} className="border-b border-white/5">
                <td className="py-2 pr-4">{p.name}</td>
                <td className="py-2 pr-4">R{(p.priceCents / 100).toFixed(2)}</td>
                <td className="py-2 pr-4">{p.stock}</td>
                <td className="py-2 pr-4">{p.categoryId ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
