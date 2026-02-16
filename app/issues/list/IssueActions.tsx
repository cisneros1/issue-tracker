import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
    return (
        <div className="flex mb-5 justify-between">
            <IssueStatusFilter />
            <Button asChild>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    );
};

export default IssueActions;
