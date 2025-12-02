
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, BookmarkPlus, Calendar, CheckCircle, Info, Layers, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "../page";

async function getBook(id: string): Promise<Book | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/books/${id}`, { cache: 'no-store' });
    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        throw new Error("Failed to fetch book");
    }
    return response.json();
}


export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  if (!book) {
    notFound();
  }

  return (
    <div className="space-y-6">
       <Link href="/app/books" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
      </Link>
      <div className="space-y-4">
        <div className="relative">
            <Image
                src={book.imageUrl}
                alt={`Cover of ${book.title}`}
                width={400}
                height={600}
                className="w-full rounded-lg object-cover aspect-[2/3]"
                data-ai-hint={book.imageHint}
            />
        </div>
        <div className="flex flex-col items-start gap-2">
            <Badge variant="secondary">{book.genre}</Badge>
            <h1 className="font-headline text-3xl font-bold">{book.title}</h1>
            <p className="text-lg text-muted-foreground">{book.author}</p>
        </div>
      </div>
      
      <Button asChild size="lg" className="w-full" disabled={book.available === 0}>
        <Link href={`/app/books/${book.id}/reserve`}>
          <BookmarkPlus className="mr-2 h-5 w-5" />
          {book.available > 0 ? 'Reserve Now' : 'Currently Unavailable'}
        </Link>
      </Button>

      <Card>
        <CardHeader>
            <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
            <div className="flex items-start justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><Info className="h-4 w-4" /> ISBN</span>
                <span className="font-mono">{book.isbn}</span>
            </div>
             <div className="flex items-start justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" /> Published</span>
                <span>{book.publicationYear}</span>
            </div>
             <div className="flex items-start justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><Layers className="h-4 w-4" /> Copies</span>
                <span>{book.copies} total</span>
            </div>
            <div className="flex items-start justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                    {book.available > 0 ? <CheckCircle className="h-4 w-4 text-green-600"/> : <XCircle className="h-4 w-4 text-red-600"/>}
                     Availability
                </span>
                <span className={book.available > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {book.available} available
                </span>
            </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-xl font-semibold mb-2">Description</h2>
        <p className="text-muted-foreground">{book.description}</p>
      </div>

    </div>
  );
}

