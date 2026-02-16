import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button asChild>
      <Link href={`/issues/${issueId}/edit`}>
        <Pencil className="h-4 w-4" />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssueButton;
