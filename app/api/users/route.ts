import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Param prevents caching
export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(users);
}