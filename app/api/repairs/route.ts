import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    deviceType,
    brand,
    model,
    issue,
    name,
    phone,
    email
  } = body as any;

  if (!deviceType || !brand || !model || !issue || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const booking = await prisma.repairBooking.create({
    data: {
      deviceType,
      brand,
      model,
      issue,
      photos: []
    }
  });

  // TODO: send email / SMS notification here

  return NextResponse.json({ id: booking.id });
}
