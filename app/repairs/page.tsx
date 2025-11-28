import { RepairForm } from "./RepairForm";

export default function RepairsPage() {
  return (
    <section className="container max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
        Expert Mobile & Computer Repairs
      </h1>
      <p className="text-sm text-gray-200 mb-4">
        Book a repair online and our technicians will confirm pricing and turnaround time.
        Same-day service available on most screen and battery replacements.
      </p>
      <RepairForm />
    </section>
  );
}
