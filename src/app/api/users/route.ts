import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// Re-using the User type shape but defining specifically for DB response
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

export async function GET() {
  try {
    const [rows] = await pool.query<UserFromDB[]>(
      'SELECT id, name, email, role, member_since, avatar_url, image_hint, status FROM users'
    );
    
    // Convert snake_case from DB to camelCase for the frontend
    const users = rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role,
      memberSince: new Date(row.member_since).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      avatarUrl: row.avatar_url,
      imageHint: row.image_hint,
      status: row.status
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users from database:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
