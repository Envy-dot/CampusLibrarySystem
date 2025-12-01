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

const recentActivity = [
    { type: 'return', user: 'Alice Johnson', book: 'Echoes of the Past', time: '2m ago' },
    { type: 'borrow', user: 'Bob Williams', book: 'The Silent Forest', time: '15m ago' },
    { type: 'fine', user: 'Eve Adams', amount: '$2.50', time: '1h ago' },
    { type: 'add', book: 'Quantum Entanglement', time: '3h ago' },
]

export default function LibrarianDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="Welcome back, Librarian!">
        <Button asChild>
            <Link href="/librarian/inventory/add"><PlusCircle className="mr-2 h-4 w-4"/>Add New Book</Link>
        </Button>
      </PageHeader>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+20 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Borrowed</CardTitle>
            <BookCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+52 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <BookX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12</div>
            <p className="text-xs text-muted-foreground">Action required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+12 since yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of the latest library events.</CardDescription>
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
