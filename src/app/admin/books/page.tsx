import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { books } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

// This is largely the same as the librarian inventory, but in a real app would have more advanced features (e.g. bulk delete, etc.)
export default function BookManagementPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Book Management" description="Oversee the entire library book catalog.">
        <Button asChild>
          <Link href="/librarian/inventory/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Book
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by title, author, or ISBN..." className="pl-10" />
                </div>
                 <Button variant="outline">Filter</Button>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map(book => (
                        <TableRow key={book.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Image 
                                    src={book.imageUrl}
                                    alt={book.title}
                                    width={64}
                                    height={64}
                                    className="aspect-square rounded-md object-cover"
                                    data-ai-hint={book.imageHint}
                                />
                            </TableCell>
                            <TableCell className="font-medium">{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                             <TableCell className="font-mono text-xs">{book.isbn}</TableCell>
                            <TableCell>{book.available} / {book.copies}</TableCell>
                             <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>View Stats</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
