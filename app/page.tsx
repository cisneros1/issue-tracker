import IssueChart from "@/app/IssueChart";
import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/client";
import {Flex, Grid} from "@radix-ui/themes";
import {Metadata} from "next";
import LatestIssues from "./LatestIssues";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Flex direction={"column"} gap={"4"}>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker Dashboard',
  description: 'View, manage, and assign issues to your team members',
}
