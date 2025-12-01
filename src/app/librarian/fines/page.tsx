import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fines, users, books } from "@/lib/data";
import { MoreHorizontal, Search } from "lucide-react";

export default function FineTrackingPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Fine Tracking" description="Monitor and manage all library fines." />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by user or book..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date Issued</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fines.map(fine => {
                const user = users.find(u => u.id === fine.userId);
                const book = books.find(b => b.id === fine.bookId);
                return (
                  <TableRow key={fine.id}>
                    <TableCell className="font-medium">{user?.name || 'Unknown User'}</TableCell>
                    <TableCell>{book?.title || 'Unknown Book'}</TableCell>
                    <TableCell>${fine.amount.toFixed(2)}</TableCell>
                    <TableCell>{fine.dateIssued}</TableCell>
                    <TableCell>
                      <Badge variant={fine.status === 'paid' ? 'default' : 'destructive'}>{fine.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
