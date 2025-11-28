import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * PayFast ITN handler.
 * In production you MUST:
 * - Validate source IP
 * - Validate checksum
 * - Validate amount & merchant details
 * - Mark order as PAID only after full validation
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const pfPaymentId = formData.get("pf_payment_id")?.toString();
  const orderId = formData.get("m_payment_id")?.toString();
  const paymentStatus = formData.get("payment_status")?.toString();

  if (!orderId) return NextResponse.json({ ok: true });

  if (paymentStatus === "COMPLETE") {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "PAID", paymentRef: pfPaymentId ?? "" }
    });
  }

  return NextResponse.json({ ok: true });
}
