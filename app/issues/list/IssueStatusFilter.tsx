"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {useRouter, useSearchParams} from "next/navigation";
import React from "react";

const ALL_STATUS_VALUE = "__all__";

const statuses: { label: string; value: string }[] = [
  { label: "All", value: ALL_STATUS_VALUE },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status");
  const defaultValue = currentStatus && statuses.some((s) => s.value === currentStatus)
    ? currentStatus
    : ALL_STATUS_VALUE;

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => {
        const params = new URLSearchParams();
        if (value !== ALL_STATUS_VALUE) params.append("status", value);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.toString() ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter By" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status, index) => (
          <SelectItem key={index} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default IssueStatusFilter;
