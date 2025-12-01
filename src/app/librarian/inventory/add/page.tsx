import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from 'next/link';

export default function AddBookPage() {
  return (
    <div className="space-y-8">
        <div className="flex justify-start">
             <Button variant="outline" asChild>
                <Link href="/librarian/inventory"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Inventory</Link>
            </Button>
        </div>

      <PageHeader title="Add New Book" description="Fill in the details to add a new book to the catalog." />

        <form className="grid gap-8 md:grid-cols-3">
            <div className="grid gap-8 md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Book Details</CardTitle>
                        <CardDescription>Provide the main information about the book.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="e.g. The Great Gatsby" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="author">Author</Label>
                            <Input id="author" placeholder="e.g. F. Scott Fitzgerald" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="A brief summary of the book..." />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle>Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                         <div className="grid gap-2">
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input id="isbn" placeholder="978-3-16-148410-0" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="publication-year">Publication Year</Label>
                            <Input id="publication-year" type="number" placeholder="1925" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="genre">Genre</Label>
                            <Input id="genre" placeholder="e.g. Fiction, Novel" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-8 md:col-span-1">
                 <Card>
                    <CardHeader>
                        <CardTitle>Stock</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="total-copies">Total Copies</Label>
                            <Input id="total-copies" type="number" placeholder="10" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Book Cover</CardTitle>
                         <CardDescription>Upload an image for the book cover.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input type="file" />
                    </CardContent>
                </Card>
                <Button size="lg">
                    <Save className="mr-2 h-4 w-4"/>
                    Save Book
                </Button>
            </div>
        </form>
    </div>
  );
}
