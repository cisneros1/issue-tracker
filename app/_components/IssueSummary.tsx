import React from 'react';
import { Status } from "@/prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({open, inProgress, closed}: Props) => {

    const containers: {
        label: string;
        value: number;
        status: Status;
    }[] = [
        {label: 'Open Issues', value: open, status: 'OPEN'},
        {label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS'},
        {label: 'Closed Issues', value: closed, status: 'CLOSED'}
    ]

    return (
        <div className="flex gap-4">
            {containers.map((container) => (
                <Card key={container.label}>
                    <CardContent className="flex flex-col gap-1 p-4">
                        <Link
                            className="text-sm font-medium hover:underline"
                            href={"/issues/list?status=" + container.status}>
                            {container.label}
                        </Link>
                        <p className="text-xl font-bold">{container.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default IssueSummary;
