import { db } from '../src/db';
import { users, tickets } from '../src/db/schema';

async function wipe() {
  console.log('--- RESETTING DATABASE ---');
  try {
    await db.delete(tickets);
    await db.delete(users);

    const admin = await db.insert(users).values({
      email: 'admin@sipekal.id',
      password: 'admin',
      role: 'admin',
      nama_lengkap: 'Jules - Lead Architect',
      unit: 'IT & Facilities'
    }).returning();

    const tech1 = await db.insert(users).values({
      email: 'tech1@sipekal.id',
      password: 'tech',
      role: 'teknisi',
      nama_lengkap: 'Ahmad Teknik',
      unit: 'Teknisi Listrik'
    }).returning();

    const unitUser = await db.insert(users).values({
      email: 'user@sipekal.id',
      password: 'user',
      role: 'user',
      nama_lengkap: 'Ibu Siti',
      unit: 'IGD'
    }).returning();

    await db.insert(tickets).values([
      {
        ticket_number: 'TK-2026-0001',
        status: 'menunggu',
        pelapor_id: unitUser[0].id,
        judul: 'AC Mati di Ruang Melati',
        kategori: 'Elektrikal',
        lokasi: 'Gedung A - Lt. 2',
        prioritas: 'Tinggi',
        deskripsi: 'AC tidak dingin sama sekali, terdengar suara bising.'
      },
      {
        ticket_number: 'TK-2026-0002',
        status: 'diproses',
        pelapor_id: unitUser[0].id,
        teknisi_id: tech1[0].id,
        judul: 'Lampu Operasi Redup',
        kategori: 'Alat Medis',
        lokasi: 'OK Utama - Kamar 3',
        prioritas: 'Sangat Tinggi',
        deskripsi: 'Lampu sering berkedip dan intensitas cahaya menurun.'
      }
    ]);

    console.log('--- WIPE & SEED SUCCESS ---');
    process.exit(0);
  } catch (e) {
    console.error('Wipe failed:', e);
    process.exit(1);
  }
}

wipe();
