
export type UserRole = 'student' | 'librarian' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  memberSince: string;
  avatarUrl: string;
  imageHint: string;
  status: 'active' | 'inactive';
};

export type Reservation = {
  id: string;
  bookId: string;
  userId: string;
  reservationDate: string;
  status: 'active' | 'fulfilled' | 'cancelled';
};

export type BorrowedBook = {
    id: string;
    bookId: string;
    userId: string;
    borrowDate: string;
    dueDate: string;
    returnDate: string | null;
}

export type Fine = {
    id: string;
    userId: string;
    bookId: string;
    amount: number;
    reason: string;
    dateIssued: string;
    status: 'paid' | 'unpaid';
}
