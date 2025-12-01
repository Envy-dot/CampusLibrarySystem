import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { books, borrowedBooks, reservations } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BookCheck, Bookmark, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyBooksPage() {
    const userReservations = reservations.filter(r => r.userId === '1');
    const userBorrowed = borrowedBooks.filter(b => b.userId === '1' && !b.returnDate);

  return (
    <div className="space-y-8">
      <PageHeader title="My Books" description="Manage your reservations and borrowed items." />

      <section>
        <h2 className="font-headline text-xl font-bold mb-4 flex items-center gap-2"><Bookmark className="h-5 w-5 text-primary"/> Active Reservations</h2>
        <div className="space-y-4">
            {userReservations.filter(r => r.status === 'active').map(res => {
                const book = books.find(b => b.id === res.bookId);
                if (!book) return null;
                return (
                    <Card key={res.id}>
                        <CardHeader>
                            <div className="flex gap-4">
                                <Image src={book.imageUrl} alt={book.title} width={60} height={90} className="rounded-md object-cover" data-ai-hint={book.imageHint} />
                                <div>
                                    <CardTitle className="text-lg">{book.title}</CardTitle>
                                    <CardDescription>{book.author}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                             <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
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
            })}
             {userReservations.filter(r => r.status === 'active').length === 0 && (
                <p className="text-muted-foreground text-center py-4">You have no active reservations.</p>
            )}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="font-headline text-xl font-bold mb-4 flex items-center gap-2"><BookCheck className="h-5 w-5 text-primary"/> Currently Borrowed</h2>
        <div className="space-y-4">
            {userBorrowed.map(borrow => {
                const book = books.find(b => b.id === borrow.bookId);
                if (!book) return null;
                return (
                    <Link href={`/app/books/${book.id}`} key={borrow.id}>
                        <Card className="hover:bg-accent/50 transition-colors">
                            <CardHeader>
                                <div className="flex gap-4">
                                    <Image src={book.imageUrl} alt={book.title} width={60} height={90} className="rounded-md object-cover" data-ai-hint={book.imageHint} />
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
            })}
            {userBorrowed.length === 0 && (
                <p className="text-muted-foreground text-center py-4">You have no books currently borrowed.</p>
            )}
        </div>
      </section>

    </div>
  );
}
