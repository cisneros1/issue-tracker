import {Skeleton} from "@/app/components";
import { Card, CardContent } from "@/components/ui/card";

const LoadingIssueDetailPage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <div className="flex space-x-3 my-2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </div>
      <Card className="mt-4">
        <CardContent className="prose pt-6">
          <Skeleton count={3} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingIssueDetailPage;
