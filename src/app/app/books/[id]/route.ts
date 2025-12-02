
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { BookFromDB } from '../route';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const [rows] = await pool.query<BookFromDB[]>(
      'SELECT id, title, author, isbn, publication_year, genre, copies, available, image_url, description, image_hint FROM books WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const row = rows[0];
    const book = {
      id: row.id,
      title: row.title,
      author: row.author,
      isbn: row.isbn,
      publicationYear: row.publication_year,
      genre: row.genre,
      copies: row.copies,
      available: row.available,
      imageUrl: row.image_url,
      description: row.description,
      imageHint: row.image_hint
    };

    return NextResponse.json(book);
  } catch (error) {
    console.error('Failed to fetch book from database:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
