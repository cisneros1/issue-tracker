import {IssueStatusBadge} from "@/app/components";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Issue } from "@/prisma/client";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <h1 className="text-2xl font-bold">{issue.title}</h1>
      <div className="flex space-x-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <p className="text-sm text-muted-foreground">{issue.createdAt.toDateString()}</p>
      </div>
      <Card className="mt-4">
        <CardContent className="prose max-w-full pt-6">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </CardContent>
      </Card>
    </>
  );
};

export default IssueDetails;
