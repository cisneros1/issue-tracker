import {patchIssueSchema} from "@/lib/validations";
import prisma from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session)
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(z.treeifyError(validation.error), {status: 400});

    const {assignedToUserId, title, description} = body

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: {id: assignedToUserId}
        });

        if (!user)
            return NextResponse.json({error: 'Invalid user'}, {status: 400});
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });
    if (!issue)
        return NextResponse.json({error: 'Invalid issue'}, {status: 404});

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title,
            description,
            assignedToUserId,
        }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session)
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });

    if (!issue)
        return NextResponse.json({error: 'Invalid issue'}, {status: 404});

    await prisma.issue.delete({
        where: {id: issue.id}
    });

    return NextResponse.json({});
}
