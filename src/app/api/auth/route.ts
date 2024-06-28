import { NextRequest, NextResponse } from "next/server";
import { SHA256 as sha256 } from "crypto-js";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Required attributes username & password" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user && user.password === sha256(password).toString())
      return NextResponse.json({ username: user.username }, { status: 200 });
    else
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );
  } catch (ex) {
    console.error(ex);
  }
}
