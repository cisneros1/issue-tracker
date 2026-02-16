"use client";

import {Skeleton} from "@/app/components";
import { Issue, User } from "@/prisma/client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

const UNASSIGNED_VALUE = "__unassigned__";

const AssigneeSelect = ({issue}: { issue: Issue }) => {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"], queryFn: () => axios.get("/api/users").then((res) => res.data),
        staleTime: 60 * 1000, //60s
        retry: 3,
    })

    if (isLoading) return <Skeleton />;

    if (error) return null;

    return (<>
        <Select
            defaultValue={issue.assignedToUserId ?? UNASSIGNED_VALUE}
            onValueChange={(value) => {
                const assignedToUserId = value === UNASSIGNED_VALUE ? null : value;
                return axios
                    .patch(`/api/issues/${issue.id}`, { assignedToUserId })
                    .catch(() => toast.error("Failed to assign user"));
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder="Assign..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Suggestions</SelectLabel>
                    <SelectItem value={UNASSIGNED_VALUE}>Unassigned</SelectItem>
                    {users?.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                            {user.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
        <Toaster/>
    </>);
};

export default AssigneeSelect;
