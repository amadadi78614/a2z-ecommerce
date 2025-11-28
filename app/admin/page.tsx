import { prisma } from "@/lib/prisma";

export default async function AdminHome() {
  const [productCount, orderCount, repairCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.repairBooking.count()
  ]);

  return (
    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-200">
      <div className="glass bg-black/60 p-4">
        <p className="text-xs text-gray-400">Products</p>
        <p className="text-2xl font-bold text-brandYellow">{productCount}</p>
      </div>
      <div className="glass bg-black/60 p-4">
        <p className="text-xs text-gray-400">Orders</p>
        <p className="text-2xl font-bold text-brandYellow">{orderCount}</p>
      </div>
      <div className="glass bg-black/60 p-4">
        <p className="text-xs text-gray-400">Repair Bookings</p>
        <p className="text-2xl font-bold text-brandYellow">{repairCount}</p>
      </div>
    </div>
  );
}
