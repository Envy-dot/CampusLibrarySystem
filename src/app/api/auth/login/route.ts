import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db-server';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/session';

interface UserFromDB extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'librarian' | 'admin';
  password_hash: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const [rows] = await pool.query<UserFromDB[]>(
      'SELECT id, name, email, role, password_hash FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    
    // Create the session for the authenticated user
    await createSession(user.id, user.role);

    // Return the user's role so the client can redirect correctly
    return NextResponse.json({ success: true, role: user.role }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
