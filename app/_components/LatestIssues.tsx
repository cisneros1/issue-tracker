import prisma from "@/prisma/client";
import type { Issue, User } from "@/prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import React from "react";
import Link from "next/link";
import { IssueStatusBadge } from "@/app/components";

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
            assignedToUser: true,
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Latest Issues</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        {issues.map((issue: Issue & { assignedToUser: User | null }) => (
                            <TableRow key={issue.id}>
                                <TableCell>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col items-start gap-2">
                                            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                            <IssueStatusBadge status={issue.status}/>
                                        </div>
                                        {issue.assignedToUser && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={issue.assignedToUser.image!} />
                                                <AvatarFallback>?</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default LatestIssues;
