import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface ReservationFromDB extends RowDataPacket {
  id: string;
  book_id: string;
  user_id: string;
  reservation_date: string;
  status: 'active' | 'fulfilled' | 'cancelled';
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
    const [rows] = await pool.query<ReservationFromDB[]>(
      `SELECT r.id, r.book_id, r.user_id, r.reservation_date, r.status, b.title, b.author, b.image_url, b.image_hint
       FROM reservations r
       JOIN books b ON r.book_id = b.id
       WHERE r.user_id = ? AND r.status = 'active'
       ORDER BY r.reservation_date DESC`,
      [userId]
    );

    const reservations = rows.map(row => ({
      id: row.id,
      bookId: row.book_id,
      userId: row.user_id,
      reservationDate: new Date(row.reservation_date).toLocaleDateString(),
      status: row.status,
      book: {
          title: row.title,
          author: row.author,
          imageUrl: row.image_url,
          imageHint: row.image_hint,
      }
    }));

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Failed to fetch reservations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
