import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="container py-8 text-sm text-gray-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-semibold text-white">A2Z Mobile & Computer Services</p>
          <p className="text-xs text-gray-400">
            Electronics • Laptop & PC Repairs • CCTV • Passport Services
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/privacy" className="hover:text-brandYellow">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-brandYellow">
            Terms & Conditions
          </Link>
          <span className="text-gray-500">© {new Date().getFullYear()} A2Z. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
