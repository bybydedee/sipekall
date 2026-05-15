import { Handler } from '@netlify/functions';
import { db } from '../../src/db';
import { users } from '../../src/db/schema';
import { eq } from 'drizzle-orm';
import { headers, generateToken } from './utils';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { email, password } = JSON.parse(event.body || '{}');

    if (!email || !password) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email and password required' }) };
    }

    const userRecord = await db.select().from(users).where(eq(users.email, email));

    if (userRecord.length === 0 || userRecord[0].password !== password) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }

    const user = userRecord[0];
    const token = generateToken({ id: user.id, role: user.role, email: user.email });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        token,
        user: { id: user.id, email: user.email, role: user.role, nama_lengkap: user.nama_lengkap }
      }),
    };
  } catch (error: any) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};