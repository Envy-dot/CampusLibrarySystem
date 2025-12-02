import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, Check } from "lucide-react";
import { Book } from "../../page";
import { getServerSession } from "@/lib/session";

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

async function getUserProfile(userId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}/profile`, { cache: 'no-store' });
    if (!response.ok) return null;
    return response.json();
}

export default async function ReserveBookPage({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session?.userId) {
    redirect('/login');
  }

  const [book, user] = await Promise.all([
    getBook(params.id),
    getUserProfile(session.userId as string)
  ]);

  if (!book) {
    notFound();
  }

  if (book.available === 0) {
    // In a real app, you'd show a message. For now, redirect.
    redirect(`/app/books/${params.id}`);
  }
  
  // Create a placeholder date for pickup deadline
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 2);


  return (
    <div className="space-y-6">
        <Link href={`/app/books/${params.id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Details
      </Link>
      <PageHeader title="Confirm Reservation" description="Please confirm the details below to reserve your book." />

      <Card>
        <CardHeader className="flex flex-row items-start gap-4">
          <Image
            src={book.imageUrl}
            alt={book.title}
            width={80}
            height={120}
            className="rounded-md object-cover"
            data-ai-hint={book.imageHint}
          />
          <div>
            <Badge>{book.genre}</Badge>
            <CardTitle className="mt-1 text-xl">{book.title}</CardTitle>
            <CardDescription>{book.author}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You are about to reserve a copy of this book. Once reserved, you will have 
            <strong> 48 hours</strong> to pick it up from the library front desk.
          </p>
          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="font-semibold mb-2">Reservation Details</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">User:</span>
              <span>{user?.name} (Student)</span>
            </div>
             <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pickup Deadline:</span>
              <span>{deadline.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
            </div>
          </div>
          <Button size="lg" className="w-full">
            <Check className="mr-2 h-5 w-5" />
            Confirm Reservation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
