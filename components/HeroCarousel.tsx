"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    title: "Premium Phone Cases & Accessories",
    subtitle: "Protect your phone in style with rugged, silicone and designer cases.",
    ctaLabel: "Shop Phone Cases",
    href: "/shop?category=phone-cases"
  },
  {
    title: "Fast Repairs. Same-Day Service.",
    subtitle: "Screens, batteries, charging ports & more. Certified technicians on site.",
    ctaLabel: "Book a Repair",
    href: "/repairs"
  },
  {
    title: "Chargers, Cables & Power Banks",
    subtitle: "Keep your devices powered with trusted brands and fast-charging tech.",
    ctaLabel: "Shop Chargers",
    href: "/shop?category=chargers"
  },
  {
    title: "Weekly Deals up to 40% OFF",
    subtitle: "Limited-time specials on accessories, gadgets and more.",
    ctaLabel: "View All Deals",
    href: "/deals"
  }
];

export function HeroCarousel() {
  return (
    <section className="container mt-6">
      <motion.div
        className="glass relative overflow-hidden px-6 py-10 md:px-10 md:py-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brandRed/40 via-transparent to-brandYellow/30 pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1 space-y-4">
            <p className="badge-pill bg-black/40 border border-brandYellow/40">
              One-stop shop for devices, accessories & repairs
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              A2Z Mobile & Computer{" "}
              <span className="text-brandYellow">Services</span>
            </h1>
            <p className="text-sm md:text-base text-gray-200 max-w-xl">
              Shop electronics, book expert repairs and get your devices back in action fast.
              Nationwide delivery and same-day in-store service available.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">
                Shop Now
              </Link>
              <Link href="/repairs" className="btn-secondary">
                Book Repairs
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 text-xs sm:text-sm">
            {slides.map((slide) => (
              <Link
                key={slide.title}
                href={slide.href}
                className="glass bg-white/5 border-white/10 hover:border-brandYellow/70 hover:-translate-y-1 transition p-3 rounded-2xl"
              >
                <p className="font-semibold text-brandYellow mb-1">{slide.title}</p>
                <p className="text-gray-200 mb-2 line-clamp-3">{slide.subtitle}</p>
                <span className="text-[11px] font-semibold text-white/80 underline">
                  {slide.ctaLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
