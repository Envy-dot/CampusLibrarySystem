import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// Define a type for the book data matching your database schema
// Note the camelCase conversion from snake_case columns
export interface BookFromDB extends RowDataPacket {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publication_year: number;
  genre: string;
  copies: number;
  available: number;
  image_url: string;
  description: string;
  image_hint: string;
}

export async function GET() {
  try {
    // The query selects columns with snake_case names, which is common in SQL.
    const [rows] = await pool.query<BookFromDB[]>(
      'SELECT id, title, author, isbn, publication_year, genre, copies, available, image_url, description, image_hint FROM books'
    );
    
    // We map over the rows to convert snake_case (e.g., publication_year) 
    // to camelCase (e.g., publicationYear) for our frontend.
    const books = rows.map(row => ({
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
    }));

    return NextResponse.json(books);
  } catch (error) {
    console.error('Failed to fetch books from database:', error);
    // In a production app, you might want more robust error logging.
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

const BookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    isbn: z.string().min(10, "ISBN must be at least 10 characters"),
    publicationYear: z.coerce.number().int().min(1000, "Invalid year"),
    genre: z.string().min(1, "Genre is required"),
    copies: z.coerce.number().int().min(1, "Must have at least one copy"),
    description: z.string().optional(),
    imageUrl: z.string().url("Invalid image URL").optional(),
});


export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsedData = BookSchema.parse(json);

    const { title, author, isbn, publicationYear, genre, copies, description } = parsedData;
    
    // In a real app, image upload would be handled differently.
    // For now, we'll use a placeholder.
    const imageUrl = parsedData.imageUrl || `https://picsum.photos/seed/${uuidv4()}/400/600`;
    const imageHint = "book cover";

    const [result] = await pool.execute(
      `INSERT INTO books (id, title, author, isbn, publication_year, genre, copies, available, description, image_url, image_hint)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [uuidv4(), title, author, isbn, publicationYear, genre, copies, copies, description, imageUrl, imageHint]
    );

    return NextResponse.json({ message: 'Book added successfully', data: result }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Failed to add book to database:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
