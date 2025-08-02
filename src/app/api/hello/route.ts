// src/app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from Next.js App Router API!" });
}

export async function POST() {
  return NextResponse.json({ error: "POST not allowed" }, { status: 405 });
}
