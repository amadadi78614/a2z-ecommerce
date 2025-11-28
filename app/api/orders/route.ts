import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { customer, address, items, paymentProvider } = body as any;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items" }, { status: 400 });
  }

  const totalCents = items.reduce(
    (sum: number, i: any) => sum + i.priceCents * i.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      totalCents,
      paymentProvider,
      status: "PENDING",
      shippingAddress: {
        create: {
          line1: address.line1,
          line2: address.line2 ?? "",
          suburb: address.suburb,
          city: address.city,
          province: address.province,
          postalCode: address.postalCode
        }
      },
      items: {
        create: items.map((i: any) => ({
          productId: i.productId,
          quantity: i.quantity,
          priceCents: i.priceCents
        }))
      }
    },
    include: { items: true }
  });

  let redirectUrl: string | null = null;

  if (paymentProvider === "payfast") {
    // Construct a PayFast payment URL
    const pfBase = process.env.NEXT_PUBLIC_PAYFAST_BASE_URL ?? "https://sandbox.payfast.co.za/eng/process";
    const merchantId = process.env.PAYFAST_MERCHANT_ID ?? "10000100";
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY ?? "46f0cd694581a";

    const returnUrl =
      process.env.NEXT_PUBLIC_SITE_URL + "/checkout/success?orderId=" + order.id;
    const cancelUrl =
      process.env.NEXT_PUBLIC_SITE_URL + "/checkout/cancel?orderId=" + order.id;
    const notifyUrl =
      process.env.NEXT_PUBLIC_SITE_URL + "/api/payfast/notify";

    const params = new URLSearchParams({
      merchant_id: merchantId,
      merchant_key: merchantKey,
      amount: (order.totalCents / 100).toFixed(2),
      item_name: `A2Z Order ${order.id}`,
      email_confirmation: "1",
      confirmation_address: customer.email ?? "",
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl
    });

    redirectUrl = pfBase + "?" + params.toString();
  } else if (paymentProvider === "ozow") {
    // For Ozow, typically you create a checkout request server-side and redirect.
    // Implement according to Ozow docs using your API key & site code.
    redirectUrl = "/ozow-placeholder?orderId=" + order.id;
  }

  return NextResponse.json({ orderId: order.id, redirectUrl });
}
