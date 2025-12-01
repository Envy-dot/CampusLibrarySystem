import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fines, books } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function FinePaymentsPage() {
    const userFines = fines.filter(f => f.userId === '1' || f.userId === '2'); // for demo
    const unpaidFines = userFines.filter(f => f.status === 'unpaid');
    const totalUnpaid = unpaidFines.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Fines & Payments" description="View and pay outstanding library fines." />
      
      {unpaidFines.length > 0 && (
        <Card className="bg-destructive/10 border-destructive">
            <CardHeader>
                <CardTitle>Outstanding Balance</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-destructive">${totalUnpaid.toFixed(2)}</p>
                <p className="text-destructive/80">You have {unpaidFines.length} unpaid fine(s).</p>
            </CardContent>
            <CardFooter>
                <Button variant="destructive" className="w-full">Pay All Now</Button>
            </CardFooter>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="font-headline text-lg font-semibold">Fine History</h3>
        {userFines.map(fine => {
            const book = books.find(b => b.id === fine.bookId);
            return(
                <Card key={fine.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div>
                                <CardTitle className="text-base">${fine.amount.toFixed(2)} - {fine.reason}</CardTitle>
                                <CardDescription>For: {book?.title || 'Unknown Book'}</CardDescription>
                             </div>
                             <Badge variant={fine.status === 'paid' ? 'default' : 'destructive'} className={cn(fine.status === 'paid' && 'bg-green-600')}>
                                {fine.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        <p>Date Issued: {fine.dateIssued}</p>
                    </CardContent>
                    {fine.status === 'unpaid' && (
                        <>
                        <Separator className="my-2"/>
                        <CardFooter className="p-4 pt-2">
                             <Button variant="secondary" size="sm" className="w-full">Pay ${fine.amount.toFixed(2)}</Button>
                        </CardFooter>
                        </>
                    )}
                </Card>
            )
        })}
        {userFines.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No fines to show. Keep up the good work!</p>
        )}
      </div>
    </div>
  );
}
