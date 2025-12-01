"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Download, Library } from "lucide-react";
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const borrowingByGenreData = [
    { name: 'Sci-Fi', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Mystery', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Fantasy', value: 250, fill: 'hsl(var(--chart-3))' },
    { name: 'Adventure', value: 200, fill: 'hsl(var(--chart-4))' },
    { name: 'Other', value: 150, fill: 'hsl(var(--chart-5))' },
];

const peakHoursData = [
    { hour: '9am', visits: 30 }, { hour: '10am', visits: 45 }, { hour: '11am', visits: 60 },
    { hour: '12pm', visits: 80 }, { hour: '1pm', visits: 95 }, { hour: '2pm', visits: 70 },
    { hour: '3pm', visits: 85 }, { hour: '4pm', visits: 65 }, { hour: '5pm', visits: 50 },
];
const peakHoursConfig = { visits: { label: "Visits", color: "hsl(var(--primary))" } };


export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Reports" description="Generate and view system reports.">
        <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export All</Button>
      </PageHeader>
      
      <div className="grid gap-8 md:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle>Borrowing by Genre</CardTitle>
                <CardDescription>Most popular genres based on checkouts this year.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={borrowingByGenreData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                 </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Peak Library Hours</CardTitle>
                <CardDescription>Busiest times for student visits and checkouts.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={peakHoursConfig} className="h-[300px] w-full">
                    <BarChart data={peakHoursData}>
                        <Bar dataKey="visits" radius={4} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
