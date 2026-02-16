import IssueChart from "@/app/_components/IssueChart";
import IssueSummary from "@/app/_components/IssueSummary";
import prisma from "@/prisma/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Metadata } from "next";
import LatestIssues from "./_components/LatestIssues";

export const dynamic = "force-dynamic";

function isConnectionError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  const name = error instanceof Error ? error.name : "";
  return (
    name === "DriverAdapterError" ||
    message.includes("pool timeout") ||
    message.includes("ECONNREFUSED") ||
    message.includes("connect ETIMEDOUT")
  );
}

export default async function Home() {
  let open: number;
  let inProgress: number;
  let closed: number;

  try {
    open = await prisma.issue.count({ where: { status: "OPEN" } });
    inProgress = await prisma.issue.count({
      where: { status: "IN_PROGRESS" },
    });
    closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  } catch (error) {
    if (isConnectionError(error)) {
      return (
        <Alert variant="destructive">
          <AlertTitle className="font-bold">Database unavailable</AlertTitle>
          <AlertDescription>
            Cannot connect to the database. Check that:
            <ul className="mt-2 ml-5 list-disc">
              <li>PostgreSQL is running</li>
              <li>
                <code>DATABASE_URL</code> in <code>.env</code> is correct (host,
                port, user, password, database)
              </li>
              <li>Firewall or network allows the connection</li>
            </ul>
          </AlertDescription>
        </Alert>
      );
    }
    throw error;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </div>
      <LatestIssues />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker Dashboard',
  description: 'View, manage, and assign issues to your team members',
}
