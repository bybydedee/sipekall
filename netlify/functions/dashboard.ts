import { Handler } from '@netlify/functions';
import { db } from '../../src/db';
import { tickets } from '../../src/db/schema';
import { sql, eq, and, or } from 'drizzle-orm';
import { headers, verifyToken } from './utils';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  
  const user = verifyToken(event.headers.authorization);
  if (!user) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };

  try {
    let query = db.select({ 
      status: tickets.status,
      count: sql<number>`count(*)` 
    }).from(tickets);

    // If technician, only count their own tickets or unassigned tickets (menunggu)
    if (user.role === 'teknisi') {
      const stats = await db.select({
        status: tickets.status,
        count: sql<number>`count(*)`
      }).from(tickets)
      .where(or(eq(tickets.teknisi_id, user.id), eq(tickets.status, 'menunggu')))
      .groupBy(tickets.status);

      const result = {
        menunggu: 0,
        diproses: 0,
        selesai: 0
      };

      stats.forEach(s => {
        if (s.status === 'menunggu') result.menunggu = Number(s.count);
        if (s.status === 'diproses' || s.status === 'sedang_dikerjakan') result.diproses += Number(s.count);
        if (s.status === 'selesai' || s.status === 'selesai_teknisi') result.selesai += Number(s.count);
      });

      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    // Default (Admin/User)
    const stats = await db.select({
      status: tickets.status,
      count: sql<number>`count(*)`
    }).from(tickets)
    .groupBy(tickets.status);

    const result = {
      menunggu: 0,
      diproses: 0,
      selesai: 0
    };

    stats.forEach(s => {
      if (s.status === 'menunggu') result.menunggu = Number(s.count);
      if (s.status === 'diproses' || s.status === 'sedang_dikerjakan') result.diproses += Number(s.count);
      if (s.status === 'selesai' || s.status === 'selesai_teknisi') result.selesai += Number(s.count);
    });

    return { statusCode: 200, headers, body: JSON.stringify(result) };
  } catch (error: any) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
