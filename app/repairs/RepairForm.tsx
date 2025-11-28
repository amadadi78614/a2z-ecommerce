"use client";

import { FormEvent, useState } from "react";

export function RepairForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const body = {
      deviceType: formData.get("deviceType"),
      brand: formData.get("brand"),
      model: formData.get("model"),
      issue: formData.get("issue"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email")
    };

    try {
      const res = await fetch("/api/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("Failed to submit repair booking");
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass bg-black/40 p-6 space-y-4 text-sm"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Device Type</label>
          <select
            name="deviceType"
            className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs"
            required
          >
            <option value="">Select device</option>
            <option value="phone">Phone</option>
            <option value="tablet">Tablet</option>
            <option value="laptop">Laptop</option>
            <option value="desktop">Desktop PC</option>
            <option value="cctv">CCTV / DVR</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Brand</label>
          <input
            required
            name="brand"
            placeholder="Samsung, Apple, HP..."
            className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Model</label>
          <input
            required
            name="model"
            placeholder="e.g. iPhone 13, HP 250 G8"
            className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Issue Description</label>
          <input
            required
            name="issue"
            placeholder="Cracked screen, not charging, water damage..."
            className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Name</label>
          <input
            required
            name="name"
            className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Phone</label>
          <input
            required
            name="phone"
            className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            className="w-full rounded-md bg-black/60 border border-white/20 px-3 py-2 text-xs"
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
      {success && (
        <p className="text-xs text-successGreen">
          Thank you! We&apos;ve received your request and will contact you shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-secondary text-sm disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Request Repair Quote"}
      </button>
    </form>
  );
}
