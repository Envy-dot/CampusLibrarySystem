import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
    return null;
  }
}

export async function createSession(userId: string, userRole: string) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, userRole, expires });

  cookies().set('session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

// Function to be used in Server Components, Pages, and Route Handlers
export async function getServerSession() {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);
  return session;
}

// Function to be used in Middleware
export async function getSessionFromRequest(request: NextRequest) {
    const cookie = request.cookies.get('session')?.value;
    const session = await decrypt(cookie);
    return session;
}


export async function deleteSession() {
  cookies().delete('session');
}

// This function is intended to be called from a client-side context,
// but it's defined in a server-only module.
// To use it on the client, you need an API route.
// We have an API route at `src/app/api/session/route.ts` to expose the session data.
// We will replace the direct getSession call in client components
// with a fetch to an API route that securely provides the session.
export async function getClientSession() {
    const res = await fetch('/api/session');
    if (!res.ok) {
        console.error('Failed to fetch session');
        return null;
    }
    try {
        const data = await res.json();
        // The API route returns { session: { ... } }
        return data.session;
    } catch (e) {
        console.error('Failed to parse session', e);
        return null;
    }
}
