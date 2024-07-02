'use client'

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

// avoids LazyLoading
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false, // Tells Next.js to render this component client-side only
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
