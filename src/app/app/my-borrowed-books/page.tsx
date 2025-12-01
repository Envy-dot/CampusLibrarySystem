import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { books, borrowedBooks } from "@/lib/data";
import { Calendar, CheckCircle, RefreshCw } from "lucide-react";

export default function BorrowedBooksHistoryPage() {
  const history = borrowedBooks.filter(b => b.userId === '1');

  return (
    <div>
      <PageHeader
        title="Borrowing History"
        description="A record of all the books you've borrowed."
      />
      <div className="space-y-4">
        {history.map((item) => {
          const book = books.find((b) => b.id === item.bookId);
          if (!book) return null;
          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-base">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
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
          );
        })}
      </div>
    </div>
  );
}
