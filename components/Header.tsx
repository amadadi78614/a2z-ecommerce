"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, PhoneCall } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { usePathname } from "next/navigation";

export function Header() {
  const items = useCartStore((s) => s.items);
  const pathname = usePathname();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/repairs", label: "Repairs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-30">
      <div className="container flex items-center justify-between py-3 gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brandYellow/80 bg-black">
            <Image
              src="/logo.jpg"
              alt="A2Z logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="font-extrabold text-lg text-brandYellow tracking-tight">
              A2Z MOBILE
            </p>
            <p className="text-xs text-gray-200 uppercase tracking-[0.12em]">
              & COMPUTER SERVICES
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-brandYellow transition ${
                pathname === l.href ? "text-brandYellow" : "text-gray-200"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:0738551211"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-brandYellow"
          >
            <PhoneCall className="w-4 h-4" />
            073 855 1211
          </a>
          <Link
            href="/cart"
            className="relative rounded-full border border-brandYellow/50 px-3 py-1.5 flex items-center gap-2 text-xs font-semibold"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full bg-brandRed text-[10px] px-1.5 py-0.5 font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
