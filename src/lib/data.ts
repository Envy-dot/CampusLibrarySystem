
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

export const users: User[] = [
  { id: '1', name: 'Duru Jesse', email: 'duruarinze2006@gmail.com', role: 'student', memberSince: '2022-08-15', avatarUrl: 'https://picsum.photos/seed/avatar1/200/200', imageHint: 'person portrait', status: 'active' },
  { id: '2', name: 'Masade Paul', email: 'masadepaul@gmail.com', role: 'student', memberSince: '2021-09-01', avatarUrl: 'https://picsum.photos/seed/avatar2/200/200', imageHint: 'woman portrait', status: 'active' },
  { id: '3', name: 'Erilim Kosisochukwu', email: 'erkosi@gmail.com', role: 'librarian', memberSince: '2020-05-20', avatarUrl: 'https://picsum.photos/seed/avatar3/200/200', imageHint: 'man portrait', status: 'active' },
  { id: '4', name: 'Ikechukwu Victor', email: 'ikvictor@gmail.com', role: 'admin', memberSince: '2019-01-10', avatarUrl: 'https://picsum.photos/seed/avatar4/200/200', imageHint: 'person glasses', status: 'active' },
  { id: '5', name: 'Fregene David', email: 'fregs@gmail.com', role: 'student', memberSince: '2023-02-18', avatarUrl: 'https://picsum.photos/seed/avatar5/200/200', imageHint: 'woman smiling', status: 'inactive' },
  { id: '6', name: 'Frank Miller', email: 'frank@example.com', role: 'librarian', memberSince: '2022-11-30', avatarUrl: 'https://picsum.photos/seed/avatar6/200/200', imageHint: 'man serious', status: 'active' },
];

export type Reservation = {
  id: string;
  bookId: string;
  userId: string;
  reservationDate: string;
  status: 'active' | 'fulfilled' | 'cancelled';
};

export const reservations: Reservation[] = [
    { id: '1', bookId: '1', userId: '1', reservationDate: '2024-07-20', status: 'active' },
    { id: '2', bookId: '4', userId: '1', reservationDate: '2024-07-18', status: 'fulfilled' },
];

export type BorrowedBook = {
    id: string;
    bookId: string;
    userId: string;
    borrowDate: string;
    dueDate: string;
    returnDate: string | null;
}

export const borrowedBooks: BorrowedBook[] = [
    { id: '1', bookId: '2', userId: '1', borrowDate: '2024-07-05', dueDate: '2024-07-26', returnDate: null },
    { id: '2', bookId: '3', userId: '1', borrowDate: '2024-06-10', dueDate: '2024-07-01', returnDate: '2024-06-30' },
];

export type Fine = {
    id: string;
    userId: string;
    bookId: string;
    amount: number;
    reason: string;
    dateIssued: string;
    status: 'paid' | 'unpaid';
}

export const fines: Fine[] = [
    { id: '1', userId: '2', bookId: '5', amount: 5.50, reason: 'Overdue return', dateIssued: '2024-07-15', status: 'unpaid'},
    { id: '2', userId: '1', bookId: '3', amount: 2.00, reason: 'Late return', dateIssued: '2024-07-02', status: 'paid'},
]
