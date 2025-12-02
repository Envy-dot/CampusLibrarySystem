import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "@/lib/session";
import { Calendar, CheckCircle, RefreshCw } from "lucide-react";
import { redirect } from "next/navigation";


type BorrowedBookHistory = {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  title: string;
  author: string;
};

async function getBorrowingHistory(userId: string): Promise<BorrowedBookHistory[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}/borrowed-books`, { cache: 'no-store'});
    if (!response.ok) {
        throw new Error("Failed to fetch borrowing history");
    }
    return response.json();
}

export default async function BorrowedBooksHistoryPage() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }

  const history = await getBorrowingHistory(session.userId as string);

  return (
    <div>
      <PageHeader
        title="Borrowing History"
        description="A record of all the books you've borrowed."
      />
      <div className="space-y-4">
        {history.length > 0 ? (
            history.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.author}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Borrowed: {item.borrowDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due: {item.dueDate}</span>
                </div>
                 {item.returnDate ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Returned: {item.returnDate}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-600">
                    <RefreshCw className="h-4 w-4" />
                    <span>Currently Borrowed</span>
                  </div>
                )}
              </CardContent>
            </Card>
            ))
        ) : (
            <p className="text-muted-foreground text-center py-8">You have no borrowing history.</p>
        )}
      </div>
    </div>
  );
}
