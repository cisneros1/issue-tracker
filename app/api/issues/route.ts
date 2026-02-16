import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {issueSchema} from "@/lib/validations";
import {z} from "zod";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description }
  });

  return NextResponse.json(newIssue, { status: 201 });
}
