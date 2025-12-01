import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { books, Book } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/app/books/${book.id}`}>
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
        <div className="relative">
          <Image
            src={book.imageUrl}
            alt={`Cover of ${book.title}`}
            width={400}
            height={250}
            className="w-full object-cover aspect-[4/3]"
            data-ai-hint={book.imageHint}
          />
          {book.available > 0 ? (
            <Badge variant="default" className="absolute top-2 right-2 bg-green-600">Available</Badge>
          ) : (
            <Badge variant="destructive" className="absolute top-2 right-2">Unavailable</Badge>
          )}
        </div>
        <CardHeader>
          <CardTitle className="text-base font-bold leading-tight line-clamp-2">{book.title}</CardTitle>
          <CardDescription className="text-sm">{book.author}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm text-muted-foreground">4.5</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function BookCatalogPage() {
  return (
    <div>
      <PageHeader title="Book Catalog" description="Browse and search our collection." />

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search catalog..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-5 w-5" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
