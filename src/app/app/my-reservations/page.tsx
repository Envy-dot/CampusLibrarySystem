import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import { BookCheck, Bookmark, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Reservation = {
  id: string;
  bookId: string;
  reservationDate: string;
  status: 'active' | 'fulfilled' | 'cancelled';
  book: {
    title: string;
    author: string;
    imageUrl: string;
    imageHint: string;
  }
}

type BorrowedBook = {
    id: string;
    bookId: string;
    dueDate: string;
    borrowDate: string;
    title: string;
    author: string;
    imageUrl: string; 
    imageHint: string;
};

// We will combine two API calls here
async function getMyBooksData(userId: string) {
    const [reservationsRes, borrowedRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}/reservations`, { cache: 'no-store'}),
        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}/borrowed-books`, { cache: 'no-store'})
    ]);

    if (!reservationsRes.ok || !borrowedRes.ok) {
        throw new Error("Failed to fetch user book data");
    }

    const reservations = await reservationsRes.json();
    const allBorrowed = await borrowedRes.json();
    
    // We only want to show currently borrowed books, not full history
    const currentlyBorrowed = allBorrowed.filter((b: any) => !b.returnDate);
    
    return { reservations, currentlyBorrowed };
}


export default async function MyBooksPage() {
    const session = await getServerSession();
    if (!session) {
      redirect('/login');
    }

    const { reservations, currentlyBorrowed } = await getMyBooksData(session.userId as string);

  return (
    <div className="space-y-8">
      <PageHeader title="My Books" description="Manage your reservations and borrowed items." />

      <section>
        <h2 className="font-headline text-xl font-bold mb-4 flex items-center gap-2"><Bookmark className="h-5 w-5 text-primary"/> Active Reservations</h2>
        <div className="space-y-4">
            {reservations.length > 0 ? reservations.map((res: Reservation) => {
                return (
                    <Card key={res.id}>
                        <CardHeader>
                            <div className="flex gap-4">
                                <Image src={res.book.imageUrl} alt={res.book.title} width={60} height={90} className="rounded-md object-cover" data-ai-hint={res.book.imageHint} />
                                <div>
                                    <CardTitle className="text-lg">{res.book.title}</CardTitle>
                                    <CardDescription>{res.book.author}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                             <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                {/* This should be a calculated field in a real app */}
                                <span>Pickup by: July 28, 2024, 4:00 PM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={res.status === 'active' ? 'default' : 'secondary'} className={cn(res.status === 'active' && "bg-amber-500")}>
                                    {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                                </Badge>
                                <span>- Reserved on {res.reservationDate}</span>
                            </div>
                        </CardContent>
                    </Card>
                )
            }) : (
                <p className="text-muted-foreground text-center py-4">You have no active reservations.</p>
            )}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="font-headline text-xl font-bold mb-4 flex items-center gap-2"><BookCheck className="h-5 w-5 text-primary"/> Currently Borrowed</h2>
        <div className="space-y-4">
            {currentlyBorrowed.length > 0 ? currentlyBorrowed.map((borrow: BorrowedBook) => {
                 const book = { ...borrow }; // The data is already joined in the API
                return (
                    <Link href={`/app/books/${book.bookId}`} key={borrow.id}>
                        <Card className="hover:bg-accent/50 transition-colors">
                            <CardHeader>
                                <div className="flex gap-4">
                                     <Image src={book.imageUrl} alt={book.title} width={60} height={90} className="rounded-md object-cover" data-ai-hint={book.imageHint}/>
                                    <div>
                                        <CardTitle className="text-lg">{book.title}</CardTitle>
                                        <CardDescription>{book.author}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <div className="flex items-center gap-2 text-red-600 font-semibold">
                                    <Calendar className="h-4 w-4" />
                                    <span>Due on: {borrow.dueDate}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Borrowed on {borrow.borrowDate}</p>
                            </CardContent>
                        </Card>
                    </Link>
                )
            }) : (
                <p className="text-muted-foreground text-center py-4">You have no books currently borrowed.</p>
            )}
        </div>
      </section>

    </div>
  );
}
