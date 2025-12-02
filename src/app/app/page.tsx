
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, BookCheck, Search, Star } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Book } from "./books/page";


async function getFeaturedBooks(): Promise<Book[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/books`, { cache: 'no-store' });
  if (!response.ok) {
    console.error("Failed to fetch books for homepage");
    return [];
  }
  const allBooks: Book[] = await response.json();
  // Return the first 3 books as featured, for example
  return allBooks.slice(0, 3);
}

export default async function MobileHome() {
    const featuredBooks = await getFeaturedBooks();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold text-primary">Hello, Student!</h1>
        <p className="text-muted-foreground">What would you like to read today?</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for books, authors..." className="pl-10" />
      </div>

      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Your Next Read Awaits</CardTitle>
          <CardDescription className="text-primary-foreground/80">Check out your active borrowed books and reservations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <BookCheck className="h-5 w-5"/>
                {/* This is still a placeholder, would require another API call */}
                <span>2 Books Borrowed</span>
            </div>
             <Button variant="secondary" size="sm" asChild>
              <Link href="/app/my-borrowed-books">View All <ArrowRight className="ml-1 h-4 w-4"/></Link>
            </Button>
          </div>
          <Button className="w-full" variant="secondary" asChild>
            <Link href="/app/books">
              Browse Full Catalog
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-2xl font-bold mb-4">Featured Books</h2>
        <div className="space-y-4">
            {featuredBooks.map(book => (
                <Link href={`/app/books/${book.id}`} key={book.id}>
                    <Card className="flex items-center gap-4 hover:bg-accent/50 transition-colors cursor-pointer p-3">
                        <Image 
                            src={book.imageUrl}
                            alt={`Cover of ${book.title}`}
                            width={60}
                            height={90}
                            className="rounded-md object-cover"
                            data-ai-hint={book.imageHint}
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold leading-tight">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                            <div className="flex items-center gap-1 mt-1 text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm text-muted-foreground">4.5</span>
                            </div>
                        </div>
                         <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </Card>
                </Link>
            ))}
            {featuredBooks.length === 0 && (
              <p className="text-muted-foreground text-center py-4">Could not load featured books.</p>
            )}
        </div>
      </div>
    </div>
  );
}
