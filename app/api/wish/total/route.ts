import { PrismaService } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = PrismaService.getInstance();

  const data = await prisma.wishes.count();

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
}
