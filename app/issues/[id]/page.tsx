import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import AssigneeSelect from "./AssigneeSelect";
import {cache} from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) => {
  return prisma.issue.findUnique({
    where: { id: issueId },
  });
});

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const issue = await fetchUser(parseInt(id));

  if (!issue) notFound();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
      <div className="md:col-span-4">
        <IssueDetails issue={issue} />
      </div>
      {session && (
        <div>
          <div className="flex flex-col gap-4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchUser(parseInt(id));

  return {
    title: issue?.title,
    description: issue?.description,
  };
}

export default IssueDetailPage;
