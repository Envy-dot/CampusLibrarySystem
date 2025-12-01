import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCheck, BookX, Search } from "lucide-react";

export default function BorrowReturnPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Borrow & Return" description="Process book checkouts and returns." />

      <Tabs defaultValue="borrow">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="borrow">
            <BookCheck className="mr-2 h-4 w-4" />
            Borrow
          </TabsTrigger>
          <TabsTrigger value="return">
            <BookX className="mr-2 h-4 w-4" />
            Return
          </TabsTrigger>
        </TabsList>
        <TabsContent value="borrow">
          <Card>
            <CardHeader>
              <CardTitle>Process Book Borrow</CardTitle>
              <CardDescription>Scan or enter the User ID and Book ISBN to process a checkout.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="user-id-borrow">User ID or Email</Label>
                        <div className="flex gap-2">
                            <Input id="user-id-borrow" placeholder="e.g. 12345 or student@example.com"/>
                            <Button variant="outline"> <Search className="h-4 w-4"/> </Button>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="book-isbn-borrow">Book ISBN or ID</Label>
                         <div className="flex gap-2">
                            <Input id="book-isbn-borrow" placeholder="e.g. 978-0321765723"/>
                            <Button variant="outline"> <Search className="h-4 w-4"/> </Button>
                        </div>
                    </div>
                </div>
                <Separator/>
                <div className="space-y-4">
                    <h3 className="font-semibold">Checkout Details</h3>
                    {/* Placeholder for user/book info */}
                     <div className="border rounded-lg p-4 bg-muted/50 space-y-2 text-sm">
                        <p><strong>User:</strong> Ihenacho Williams (ihewilliams@gmail.com)</p>
                        <p><strong>Book:</strong> The Architect of Knowledge</p>
                        <p className="font-semibold text-primary">Due Date: August 21, 2024</p>
                    </div>
                </div>
                 <Button className="w-full" size="lg">Confirm Borrow</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="return">
          <Card>
            <CardHeader>
              <CardTitle>Process Book Return</CardTitle>
              <CardDescription>Scan or enter the Book ISBN to process a return.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="book-isbn-return">Book ISBN or ID</Label>
                    <div className="flex gap-2">
                        <Input id="book-isbn-return" placeholder="e.g. 978-1491904244"/>
                        <Button variant="outline"> <Search className="h-4 w-4"/> </Button>
                    </div>
                </div>
                <Separator/>
                <div className="space-y-4">
                    <h3 className="font-semibold">Return Details</h3>
                    {/* Placeholder for return info */}
                    <div className="border rounded-lg p-4 bg-muted/50 space-y-2 text-sm">
                        <p><strong>Book:</strong> Echoes of the Past</p>
                        <p><strong>Borrowed By:</strong> Duru Jesse (duruarinze2006@gmail.com)</p>
                        <p><strong>Status:</strong> <span className="text-green-600 font-semibold">On Time</span></p>
                    </div>
                </div>
                 <Button className="w-full" size="lg">Confirm Return</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
