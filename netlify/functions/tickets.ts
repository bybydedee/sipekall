import { Handler } from '@netlify/functions';
import { db } from '../../src/db';
import { tickets, users } from '../../src/db/schema';
import { eq, desc } from 'drizzle-orm';
import { headers, verifyToken } from './utils';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const user = verifyToken(event.headers.authorization);
  if (!user) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  const pathSegments = event.path.split('/').filter(Boolean);
  const idStr = pathSegments[pathSegments.length - 1];
  const ticketId = idStr && idStr !== 'tickets' ? parseInt(idStr) : null;

  try {
    if (event.httpMethod === 'GET') {
      if (ticketId) {
        // Get single ticket
        const ticket = await db.select().from(tickets).where(eq(tickets.id, ticketId));
        return { statusCode: 200, headers, body: JSON.stringify(ticket[0] || null) };
      } else {
        // List tickets based on role
        let query = db.select().from(tickets).orderBy(desc(tickets.created_at));
        // Add minimal filtering for demonstration, can be expanded
        const allTickets = await query;
        return { statusCode: 200, headers, body: JSON.stringify(allTickets) };
      }
    }

    if (event.httpMethod === 'POST') {
      // Create new ticket
      const body = JSON.parse(event.body || '{}');
      const newTicket = await db.insert(tickets).values({
        ticket_number: `TK${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'menunggu',
        pelapor_id: user.id,
        judul: body.judul,
        kategori: body.kategori,
        lokasi: body.lokasi,
        prioritas: body.prioritas,
        deskripsi: body.deskripsi,
        foto_kerusakan: body.foto_kerusakan,
        tgl_kejadian: new Date(body.tgl_kejadian),
      }).returning();
      return { statusCode: 201, headers, body: JSON.stringify(newTicket[0]) };
    }

    if (event.httpMethod === 'PUT') {
      if (!ticketId) return { statusCode: 400, headers, body: 'Missing ticket ID' };
      const body = JSON.parse(event.body || '{}');
      const updatedTicket = await db.update(tickets).set(body).where(eq(tickets.id, ticketId)).returning();
      return { statusCode: 200, headers, body: JSON.stringify(updatedTicket[0]) };
    }

    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  } catch (error: any) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};