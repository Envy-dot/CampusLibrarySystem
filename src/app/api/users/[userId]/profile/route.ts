import { NextResponse } from 'next/server';
import { pool } from '@/lib/db-server';
import { RowDataPacket } from 'mysql2';
import { User } from '@/lib/data'; // We can reuse this type

interface UserFromDB extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'librarian' | 'admin';
  member_since: string;
  avatar_url: string;
  image_hint: string;
  status: 'active' | 'inactive';
}

interface UserStats extends RowDataPacket {
    borrowed_count: number;
    reserved_count: number;
}


export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const [userRows] = await pool.query<UserFromDB[]>(
      'SELECT id, name, email, role, member_since, avatar_url, image_hint, status FROM users WHERE id = ?',
      [userId]
    );

    if (userRows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const [statsRows] = await pool.query<UserStats[]>(
        `SELECT 
            (SELECT COUNT(*) FROM borrowed_books WHERE user_id = ? AND return_date IS NULL) as borrowed_count,
            (SELECT COUNT(*) FROM reservations WHERE user_id = ? AND status = 'active') as reserved_count
        `, [userId, userId]
    );

    const user = userRows[0];
    const stats = statsRows[0];

    const profileData = {
        id: user.id,
        name: user.name,
        email: user.email,
        memberSince: new Date(user.member_since).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        avatarUrl: user.avatar_url,
        imageHint: user.image_hint,
        borrowedCount: stats.borrowed_count,
        reservedCount: stats.reserved_count,
    }


    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
