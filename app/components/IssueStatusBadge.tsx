import { Status } from "@/prisma/client";
import { Badge } from "@/components/ui/badge";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; className: string }
> = {
  OPEN: { label: "Open", className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200" },
  IN_PROGRESS: { label: "In Progress", className: "bg-violet-100 text-violet-800 hover:bg-violet-100 border-violet-200" },
  CLOSED: { label: "Closed", className: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge variant="outline" className={statusMap[status].className}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
