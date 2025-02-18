import { PrismaService } from "@/lib/prisma";
import { validate } from "@/lib/zod";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const code = (await params).code;

  const prisma: PrismaClient = PrismaService.getInstance();
  const guest = await prisma.guests.findFirst({
    where: {
      code: code,
    },
  });

  if (!guest) {
    return NextResponse.json(
      {
        errors: "No guest found with this code",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      data: {
        name: guest.name,
        personInvited: guest.personInvited,
        personAttended: guest.personAttended,
        isAlreadyFilled: guest.isAlreadyFilled,
      },
    },
    { status: 200 }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const prisma = PrismaService.getInstance();
  const data: { personAttended: number } = await request.json();
  const schema = z
    .object({
      personAttended: z.number(),
    })
    .required();

  const validatedData = validate(data, schema);

  const oldGuest = await prisma.guests.findUnique({
    where: {
      code: (await params).code,
    },
  });

  if (!oldGuest) {
    return NextResponse.json(
      {
        errors: "No person with this code",
      },
      { status: 404 }
    );
  }

  if (validatedData.personAttended > oldGuest.personInvited) {
    return NextResponse.json(
      {
        errors: "Person attended can not be more than person invited",
      },
      { status: 400 }
    );
  }

  if (oldGuest.isAlreadyFilled == true) {
    return NextResponse.json(
      {
        errors: "Cannot change data anymore",
      },
      { status: 403 }
    );
  }

  const guest = await prisma.guests.update({
    where: {
      code: (await params).code,
    },
    data: {
      personAttended: validatedData.personAttended,
      isAlreadyFilled: true,
    },
  });

  return NextResponse.json(
    {
      data: {
        name: guest.name,
        personAttended: guest.personAttended,
        isAlreadyFilled: guest.isAlreadyFilled,
      },
    },
    { status: 200 }
  );
}
