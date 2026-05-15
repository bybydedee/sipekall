import { Handler } from '@netlify/functions';
import { db } from '../../src/db';
import { tickets, users } from '../../src/db/schema';
import { sql } from 'drizzle-orm';
import { headers, verifyToken } from './utils';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  
  const user = verifyToken(event.headers.authorization);
  if (!user) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };

  try {
    const totalCount = await db.select({ count: sql`count(*)` }).from(tickets);
    const completedCount = await db.select({ count: sql`count(*)` }).from(tickets).where(sql`status = 'selesai_teknisi' OR status = 'tertutup'`);
    const overdueCount = await db.select({ count: sql`count(*)` }).from(tickets).where(sql`status = 'menunggu' AND created_at < NOW() - INTERVAL '1 day'`);
    const byCategory = await db.select({
      kategori: tickets.kategori,
      count: sql`count(*)`
    }).from(tickets).groupBy(tickets.kategori);

    const stats = {
      total: Number(totalCount[0].count),
      completed: Number(completedCount[0].count),
      overdue: Number(overdueCount[0].count),
      byCategory
    };

    return { statusCode: 200, headers, body: JSON.stringify(stats) };
  } catch (error: any) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};