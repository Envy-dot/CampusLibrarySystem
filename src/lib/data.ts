export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  genre: string;
  copies: number;
  available: number;
  imageUrl: string;
  description: string;
  imageHint: string;
};

export const books: Book[] = [
  { id: '1', title: 'The Architect of Knowledge', author: 'Alex Reed', isbn: '978-0321765723', publicationYear: 2021, genre: 'Sci-Fi', copies: 5, available: 2, imageUrl: 'https://picsum.photos/seed/book1/400/600', imageHint: 'book cover', description: 'In a world where knowledge is currency, a young architect discovers a plot to control the flow of information.' },
  { id: '2', title: 'Echoes of the Past', author: 'Jane Doe', isbn: '978-1491904244', publicationYear: 2019, genre: 'Mystery', copies: 3, available: 3, imageUrl: 'https://picsum.photos/seed/book2/400/600', imageHint: 'book pattern', description: 'A detective haunted by her past must solve a series of crimes that mirror a case from decades ago.' },
  { id: '3', title: 'The Silent Forest', author: 'Peter Jones', isbn: '978-0134494166', publicationYear: 2022, genre: 'Fantasy', copies: 8, available: 5, imageUrl: 'https://picsum.photos/seed/book3/400/600', imageHint: 'book minimalist', description: 'An ancient forest holds a secret power, and a young elf is the only one who can protect it from encroaching darkness.' },
  { id: '4', title: 'Metropolis of Dreams', author: 'Susan Carter', isbn: '978-0596517748', publicationYear: 2020, genre: 'Urban Fantasy', copies: 4, available: 1, imageUrl: 'https://picsum.photos/seed/book4/400/600', imageHint: 'book fantasy', description: 'Magic and technology collide in a bustling metropolis, where a street magician stumbles upon a conspiracy.' },
  { id: '5', title: 'Celestial Navigation', author: 'Mark Williams', isbn: '978-1449331818', publicationYear: 2018, genre: 'Hard Sci-Fi', copies: 2, available: 0, imageUrl: 'https://picsum.photos/seed/book5/400/600', imageHint: 'book city', description: 'The crew of the starship "Odyssey" must navigate by the stars after their advanced systems fail in deep space.' },
  { id: '6', title: 'The Last Alchemist', author: 'Emily White', isbn: '978-0470084716', publicationYear: 2023, genre: 'Historical Fiction', copies: 10, available: 10, imageUrl: 'https://picsum.photos/seed/book6/400/600', imageHint: 'book illustration', description: 'In 17th century Prague, the last true alchemist races to create the Philosopher\'s Stone before his enemies close in.' },
  { id: '7', title: 'Code of the Sea', author: 'David Chen', isbn: '978-0321765724', publicationYear: 2020, genre: 'Adventure', copies: 6, available: 4, imageUrl: 'https://picsum.photos/seed/book7/400/600', imageHint: 'book map', description: 'A swashbuckling tale of pirates, treasure, and a mysterious code that leads to untold riches.' },
  { id: '8', title: 'Quantum Entanglement', author: 'Dr. Evelyn Reed', isbn: '978-1491904245', publicationYear: 2021, genre: 'Science', copies: 3, available: 1, imageUrl: 'https://picsum.photos/seed/book8/400/600', imageHint: 'book spaceship', description: 'A non-fiction exploration of the bizarre and fascinating world of quantum physics.' },
  { id: '9', title: 'The Gilded Cage', author: 'Maria Garcia', isbn: '978-0134494167', publicationYear: 2019, genre: 'Thriller', copies: 7, available: 7, imageUrl: 'https://picsum.photos/seed/book9/400/600', imageHint: 'book dark', description: 'A psychological thriller about a woman who discovers her perfect life is a carefully constructed lie.' },
  { id: '10', title: 'Whispers of the Machine', author: 'Leo Petrov', isbn: '978-0596517749', publicationYear: 2022, genre: 'Cyberpunk', copies: 5, available: 3, imageUrl: 'https://picsum.photos/seed/book10/400/600', imageHint: 'book animals', description: 'In a neon-drenched future, a detective with cybernetic implants hunts a rogue AI.' },
];

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
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'student', memberSince: '2022-08-15', avatarUrl: 'https://picsum.photos/seed/avatar1/200/200', imageHint: 'person portrait', status: 'active' },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', role: 'student', memberSince: '2021-09-01', avatarUrl: 'https://picsum.photos/seed/avatar2/200/200', imageHint: 'woman portrait', status: 'active' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'librarian', memberSince: '2020-05-20', avatarUrl: 'https://picsum.photos/seed/avatar3/200/200', imageHint: 'man portrait', status: 'active' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'admin', memberSince: '2019-01-10', avatarUrl: 'https://picsum.photos/seed/avatar4/200/200', imageHint: 'person glasses', status: 'active' },
  { id: '5', name: 'Eve Adams', email: 'eve@example.com', role: 'student', memberSince: '2023-02-18', avatarUrl: 'https://picsum.photos/seed/avatar5/200/200', imageHint: 'woman smiling', status: 'inactive' },
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
