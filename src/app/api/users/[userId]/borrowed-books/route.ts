import { NextResponse } from 'next/server';
import { pool } from '@/lib/db-server';
import { RowDataPacket } from 'mysql2';

interface BorrowedBookFromDB extends RowDataPacket {
  id: string;
  book_id: string;
  user_id: string;
  borrow_date: string;
  due_date: string;
  return_date: string | null;
  title: string;
  author: string;
  image_url: string;
  image_hint: string;
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const [rows] = await pool.query<BorrowedBookFromDB[]>(
      `SELECT bb.id, bb.book_id, bb.user_id, bb.borrow_date, bb.due_date, bb.return_date, b.title, b.author, b.image_url, b.image_hint
       FROM borrowed_books bb
       JOIN books b ON bb.book_id = b.id
       WHERE bb.user_id = ?
       ORDER BY bb.borrow_date DESC`,
      [userId]
    );

    const borrowedBooks = rows.map(row => ({
        id: row.id,
        bookId: row.book_id,
        userId: row.user_id,
        borrowDate: new Date(row.borrow_date).toLocaleDateString(),
        dueDate: new Date(row.due_date).toLocaleDateString(),
        returnDate: row.return_date ? new Date(row.return_date).toLocaleDateString() : null,
        title: row.title,
        author: row.author,
        imageUrl: row.image_url,
        imageHint: row.image_hint
    }));

    return NextResponse.json(borrowedBooks);
  } catch (error) {
    console.error('Failed to fetch borrowed books:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
