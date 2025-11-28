import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true }
  });

  return (
    <div className="space-y-3 text-xs text-gray-200">
      <h2 className="text-sm font-semibold text-white">Orders</h2>
      <div className="overflow-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[11px] text-gray-400 uppercase">
              <th className="py-2 pr-4">Order</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Total</th>
              <th className="py-2 pr-4">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o: any) => (
              <tr key={o.id} className="border-b border-white/5">
                <td className="py-2 pr-4">{o.id}</td>
                <td className="py-2 pr-4">{o.status}</td>
                <td className="py-2 pr-4">R{(o.totalCents / 100).toFixed(2)}</td>
                <td className="py-2 pr-4">{o.items.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
