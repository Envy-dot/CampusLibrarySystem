
'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Book, BookCheck, BookX, PlusCircle, Users } from "lucide-react";
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


const recentActivity = [
    { type: 'return', user: 'Alice Johnson', book: 'Echoes of the Past', time: '2m ago' },
    { type: 'borrow', user: 'Bob Williams', book: 'The Silent Forest', time: '15m ago' },
    { type: 'fine', user: 'Eve Adams', amount: '$2.50', time: '1h ago' },
    { type: 'add', book: 'Quantum Entanglement', time: '3h ago' },
]

type DashboardStats = {
  total_books: number;
  borrowed_books: number;
  overdue_books: number;
  active_members: number;
}


function StatsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                    <Book className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-1/3 mt-1" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Books Borrowed</CardTitle>
                    <BookCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-2/3 mt-1" />
                </CardContent>
            </Card>
            <Card>
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
                    <BookX className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                     <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-1/2 mt-1" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-1/2 mt-1" />
                </CardContent>
            </Card>
        </div>
    )
}

export default function LibrarianDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboardStats() {
        try {
            setLoading(true);
            const response = await fetch('/api/librarian/dashboard-stats');
            if (!response.ok) {
                throw new Error("Failed to fetch dashboard stats");
            }
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error(error);
            // Optionally set an error state here
        } finally {
            setLoading(false);
        }
    }
    getDashboardStats();
  }, []);


  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="Welcome back, Librarian!">
        <Button asChild>
            <Link href="/librarian/inventory/add"><PlusCircle className="mr-2 h-4 w-4"/>Add New Book</Link>
        </Button>
      </PageHeader>
      
      {loading || !stats ? <StatsSkeleton /> : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.total_books}</div>
                <p className="text-xs text-muted-foreground">in catalog</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Books Borrowed</CardTitle>
                <BookCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.borrowed_books}</div>
                <p className="text-xs text-muted-foreground">currently checked out</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
                <BookX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">{stats.overdue_books}</div>
                <p className="text-xs text-muted-foreground">Action required</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.active_members}</div>
                <p className="text-xs text-muted-foreground">student accounts</p>
            </CardContent>
            </Card>
        </div>
      )}


      <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of the latest library events. (Placeholder)</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentActivity.map((activity, i) => (
                        <TableRow key={i}>
                            <TableCell><span className="font-medium capitalize">{activity.type}</span></TableCell>
                            <TableCell>
                                {activity.type === 'borrow' && `${activity.user} borrowed "${activity.book}"`}
                                {activity.type === 'return' && `${activity.user} returned "${activity.book}"`}
                                {activity.type === 'fine' && `Fine of ${activity.amount} issued to ${activity.user}`}
                                {activity.type === 'add' && `New book added: "${activity.book}"`}
                            </TableCell>
                            <TableCell className="text-right">{activity.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
