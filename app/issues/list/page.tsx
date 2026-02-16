import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, {columnNames, IssueQuery} from "./IssueTable";
import {Metadata} from "next/types";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedParams.status)
    ? resolvedParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(resolvedParams.orderBy)
    ? { [resolvedParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(resolvedParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div className="flex flex-col gap-3">
      <IssueActions />
      <IssueTable searchParams={resolvedParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issues list",
  description: "View a list of issues and their statuses",
};

export default IssuesPage;
