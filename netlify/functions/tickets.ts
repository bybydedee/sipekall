import { Handler } from '@netlify/functions';
import { db } from '../../src/db';
import { tickets } from '../../src/db/schema';
import { eq, desc, or } from 'drizzle-orm';
import { headers, verifyToken } from './utils';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const user = verifyToken(event.headers.authorization);
  if (!user) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };

  const pathSegments = event.path.split('/').filter(Boolean);
  const idStr = pathSegments[pathSegments.length - 1];
  const ticketId = idStr && idStr !== 'tickets' ? parseInt(idStr) : null;

  try {
    if (event.httpMethod === 'GET') {
      if (ticketId) {
        const ticket = await db.select().from(tickets).where(eq(tickets.id, ticketId));
        return { statusCode: 200, headers, body: JSON.stringify(ticket[0] || null) };
      } else {
        let query;
        if (user.role === 'admin') {
          query = db.select().from(tickets).orderBy(desc(tickets.created_at));
        } else if (user.role === 'teknisi') {
          query = db.select().from(tickets).where(
            or(eq(tickets.teknisi_id, user.id), eq(tickets.status, 'menunggu'))
          ).orderBy(desc(tickets.created_at));
        } else {
          query = db.select().from(tickets).where(eq(tickets.pelapor_id, user.id)).orderBy(desc(tickets.created_at));
        }
        const allTickets = await query;
        return { statusCode: 200, headers, body: JSON.stringify(allTickets) };
      }
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const ticketNumber = `TK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTicket = await db.insert(tickets).values({
        ticket_number: ticketNumber,
        status: 'menunggu',
        pelapor_id: user.id,
        judul: body.judul,
        kategori: body.kategori,
        lokasi: body.lokasi,
        prioritas: body.prioritas,
        deskripsi: body.deskripsi,
        foto_kerusakan: body.foto_kerusakan || '',
        tgl_kejadian: body.tgl_kejadian ? new Date(body.tgl_kejadian) : new Date(),
      }).returning();
      return { statusCode: 201, headers, body: JSON.stringify(newTicket[0]) };
    }

    if (event.httpMethod === 'PUT') {
      if (!ticketId) return { statusCode: 400, headers, body: 'Missing ticket ID' };
      const body = JSON.parse(event.body || '{}');
      
      const updateData: any = {};
      if (body.status) updateData.status = body.status;
      if (body.teknisi_id) updateData.teknisi_id = body.teknisi_id;
      if (body.catatan_perbaikan) updateData.catatan_perbaikan = body.catatan_perbaikan;
      if (body.foto_selesai) updateData.foto_selesai = body.foto_selesai;
      
      if (body.status === 'selesai_teknisi') {
        updateData.tgl_selesai = new Date();
        if (body.durasi_kerja) updateData.durasi_kerja = body.durasi_kerja;
      }

      updateData.updated_at = new Date();
      
      const updatedTicket = await db.update(tickets).set(updateData).where(eq(tickets.id, ticketId)).returning();
      return { statusCode: 200, headers, body: JSON.stringify(updatedTicket[0]) };
    }

    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  } catch (error: any) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
