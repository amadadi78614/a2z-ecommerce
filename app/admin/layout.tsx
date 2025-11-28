import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <Link href="/" className="text-xs text-brandYellow underline">
          Back to store
        </Link>
      </div>
      <nav className="flex flex-wrap gap-3 text-xs">
        <Link href="/admin" className="badge-pill hover:bg-brandYellow/30">
          Overview
        </Link>
        <Link href="/admin/products" className="badge-pill hover:bg-brandYellow/30">
          Products
        </Link>
        <Link href="/admin/orders" className="badge-pill hover:bg-brandYellow/30">
          Orders
        </Link>
        <Link href="/admin/repairs" className="badge-pill hover:bg-brandYellow/30">
          Repairs
        </Link>
      </nav>
      <div className="glass bg-black/50 p-4">{children}</div>
    </div>
  );
}
