import { PrismaService } from "@/lib/prisma";
import { validate } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const prisma = PrismaService.getInstance();

  const wishes = await prisma.wishes.findMany();

  return NextResponse.json(
    {
      data: wishes,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const prisma = PrismaService.getInstance();
  const data = await request.json();
  const schema = z.object({
    name: z.string().min(1).max(50),
    wish: z.string().min(1),
  });

  const validatedData = validate(data, schema);

  const wish = await prisma.wishes.create({
    data: validatedData,
  });

  return NextResponse.json(
    {
      data: wish,
    },
    { status: 200 }
  );
}
