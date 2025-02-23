import { PrismaService } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const activePage = Number(request.nextUrl.searchParams.get("p"));
  const prisma = PrismaService.getInstance();

  if (activePage < 1) {
    return NextResponse.json(
      {
        errors: "Active Page must be more than or equal to 1",
      },
      { status: 400 }
    );
  }

  const res = await fetch(new URL(`/api/wish/total`, request.nextUrl.origin), {
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      {
        message: "",
      },
      { status: res.status }
    );
  }

  const { data: count } = await res.json();
  const totalPage = Math.ceil(count / 5.0);
  if (activePage > totalPage) {
    return NextResponse.json(
      {
        data: [],
      },
      { status: 200 }
    );
  }

  //   rumus skip = (activePage - 1) * jumlahDataPerHalaman
  const skip = (activePage - 1) * 5;
  const data = await prisma.wishes.findMany({
    skip,
    take: 5,
  });

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
}
