import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";


export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const user = await prisma.user.updateMany({
      where: {
        id: params.userId,
      },
      data: {
        name
      }
    });
  
    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId) {
      return new NextResponse("user id is required", { status: 400 });
    }
    const user = await prisma.user.deleteMany({
      where: {
        id: params.userId,
      }
    });
  
    return NextResponse.json(user);
  } catch (error) {
    console.log('[user_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};