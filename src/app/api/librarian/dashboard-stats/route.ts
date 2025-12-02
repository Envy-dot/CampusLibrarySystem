
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db-server';
import { RowDataPacket } from 'mysql2';

interface DashboardStats extends RowDataPacket {
  total_books: number;
  borrowed_books: number;
  overdue_books: number;
  active_members: number;
}

export async function GET() {
    try {
        const [rows] = await pool.query<DashboardStats[]>(`
            SELECT
                (SELECT COUNT(*) FROM books) as total_books,
                (SELECT COUNT(*) FROM borrowed_books WHERE return_date IS NULL) as borrowed_books,
                (SELECT COUNT(*) FROM borrowed_books WHERE due_date < CURDATE() AND return_date IS NULL) as overdue_books,
                (SELECT COUNT(*) FROM users WHERE role = 'student' AND status = 'active') as active_members
        `);
        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
