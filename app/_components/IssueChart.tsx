'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueChart = ({open, inProgress, closed} : Props) => {

    const data = [
        {label: "Open", value: open},
        {label: "In Progress", value: inProgress},
        {label: "Closed", value: closed}
    ]

    return (
        <Card>
            <CardContent className="pt-6">
                <ResponsiveContainer width={"100%"} height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey={"label"} />
                        <YAxis />
                        <Bar dataKey={"value"} barSize={60} className="fill-primary" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default IssueChart;
