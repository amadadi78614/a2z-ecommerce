import { prisma } from "@/lib/prisma";

export default async function AdminRepairsPage() {
  const repairs = await prisma.repairBooking.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-3 text-xs text-gray-200">
      <h2 className="text-sm font-semibold text-white">Repair Bookings</h2>
      <div className="overflow-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[11px] text-gray-400 uppercase">
              <th className="py-2 pr-4">Device</th>
              <th className="py-2 pr-4">Brand/Model</th>
              <th className="py-2 pr-4">Issue</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((r) => (
              <tr key={r.id} className="border-b border-white/5">
                <td className="py-2 pr-4">{r.deviceType}</td>
                <td className="py-2 pr-4">
                  {r.brand} {r.model}
                </td>
                <td className="py-2 pr-4">{r.issue}</td>
                <td className="py-2 pr-4">{r.status}</td>
                <td className="py-2 pr-4">
                  {r.createdAt.toISOString().slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
