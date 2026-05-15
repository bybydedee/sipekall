import { pgTable, serial, text, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: varchar('role', { length: 20 }).notNull(), // 'admin', 'teknisi', 'user'
  nama_lengkap: text('nama_lengkap').notNull(),
  unit: text('unit'),
  created_at: timestamp('created_at').defaultNow(),
});

export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  ticket_number: varchar('ticket_number', { length: 50 }).notNull().unique(),
  status: varchar('status', { length: 30 }).notNull(), // 'menunggu', 'ditugaskan', 'diproses', 'selesai_teknisi', 'tertutup'
  pelapor_id: integer('pelapor_id').references(() => users.id),
  teknisi_id: integer('teknisi_id').references(() => users.id),
  judul: text('judul').notNull(),
  kategori: text('kategori').notNull(),
  lokasi: text('lokasi').notNull(),
  prioritas: varchar('prioritas', { length: 20 }).notNull(),
  deskripsi: text('deskripsi'),
  catatan_perbaikan: text('catatan_perbaikan'),
  foto_kerusakan: text('foto_kerusakan'),
  foto_selesai: text('foto_selesai'),
  tgl_kejadian: timestamp('tgl_kejadian'),
  tgl_selesai: timestamp('tgl_selesai'),
  durasi_kerja: integer('durasi_kerja'), // in minutes
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
