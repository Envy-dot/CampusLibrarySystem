import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface FineFromDB extends RowDataPacket {
  id: string;
  book_id: string;
  user_id: string;
  amount: number;
  reason: string;
  date_issued: string;
  status: 'paid' | 'unpaid';
  book_title: string | null;
  user_name: string | null;
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    let query: string;
    let queryParams: string[] = [];

    if (userId === 'all') {
        // Fetch all fines and join user and book names
        query = `SELECT f.id, f.book_id, f.user_id, f.amount, f.reason, f.date_issued, f.status, b.title as book_title, u.name as user_name
                 FROM fines f
                 LEFT JOIN books b ON f.book_id = b.id
                 LEFT JOIN users u ON f.user_id = u.id
                 ORDER BY f.date_issued DESC`;
    } else {
        // Fetch fines for a specific user
        query = `SELECT f.id, f.book_id, f.user_id, f.amount, f.reason, f.date_issued, f.status, b.title as book_title
                 FROM fines f
                 LEFT JOIN books b ON f.book_id = b.id
                 WHERE f.user_id = ?
                 ORDER BY f.date_issued DESC`;
        queryParams.push(userId);
    }

    const [rows] = await pool.query<FineFromDB[]>(query, queryParams);

    const fines = rows.map(row => ({
      id: row.id,
      bookId: row.book_id,
      userId: row.user_id,
      amount: row.amount,
      reason: row.reason,
      dateIssued: new Date(row.date_issued).toLocaleDateString(),
      status: row.status,
      bookTitle: row.book_title,
      userName: row.user_name,
    }));

    return NextResponse.json(fines);
  } catch (error) {
    console.error('Failed to fetch fines:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
