# Rencana Implementasi: Personal AI Marketing Assistant

Aplikasi ini akan dibangun sebagai MVP (Minimum Viable Product) tanpa sistem otentikasi di awal, difokuskan pada fungsionalitas inti: menghasilkan marketing report berbasis AI, melakukan audit website, dan meriset kompetitor.

Teknologi: Next.js (App Router), TypeScript, Tailwind CSS, Supabase, Anthropic API (Claude), dan Playwright.

## User Review Required

> [!IMPORTANT]
> Mohon tinjau rencana implementasi bertahap ini. Sesuai instruksi Anda, tidak ada kode yang ditulis atau command yang dijalankan sampai Anda menyetujui rencana ini. Fokus saat ini adalah MVP dan tanpa sistem otentikasi (auth).

## Open Questions

> [!WARNING]
> Sebelum kita memulai eksekusi (Fase 1), ada beberapa hal yang perlu dipastikan:
> 1. **Next.js Router**: Apakah Anda setuju menggunakan **App Router** (`app/` directory) untuk proyek Next.js ini?
> 2. **Playwright Execution**: Playwright biasanya berat jika dijalankan langsung di API Route Next.js (terutama Vercel serverless). Apakah kita akan merencanakan Playwright berjalan secara lokal/Node script untuk MVP ini, atau tetap dicoba via API Route lokal?
> 3. **Anthropic Model**: Apakah kita akan default menggunakan `claude-3-5-sonnet-latest` untuk agen-agennya?

---

## Proposed Changes (Fase Implementasi)

Sesuai dengan instruksi Anda, ini adalah urutan pengerjaan. Setiap fase akan dikerjakan satu per satu. Sebelum menulis kode di tiap fase, saya akan menjelaskan file apa saja yang akan dibuat/diubah.

### Fase 1: Next.js App Dasar
Setup fondasi aplikasi dengan antarmuka yang clean.
#### [NEW] `package.json`
#### [NEW] `tailwind.config.ts`
#### [NEW] `app/layout.tsx`
#### [NEW] `app/page.tsx`

### Fase 2: Form Input Produk
Membuat antarmuka untuk menerima detail produk.
#### [NEW] `components/ProductForm.tsx` (Form untuk nama produk, deskripsi, target audiens)
#### [MODIFY] `app/page.tsx` (Mengintegrasikan ProductForm)

### Fase 3: AI Generate Marketing Report
Integrasi awal dengan Anthropic API untuk laporan tunggal.
#### [NEW] `lib/anthropic.ts` (Konfigurasi client AI)
#### [NEW] `app/api/generate-report/route.ts` (Endpoint API untuk AI)
#### [NEW] `components/ReportView.tsx` (Menampilkan hasil dari AI)

### Fase 4: Multi-agent Marketing Specialist
Memecah satu prompt besar menjadi beberapa agen spesialis untuk hasil yang lebih dalam.
#### [NEW] `lib/agents/seoAgent.ts`
#### [NEW] `lib/agents/socialMediaAgent.ts`
#### [NEW] `lib/agents/contentAgent.ts`
#### [MODIFY] `app/api/generate-report/route.ts` (Orkestrasi eksekusi agen secara paralel)

### Fase 5: Supabase Report Storage
Menyimpan hasil laporan agen ke database.
#### [NEW] `lib/supabase.ts` (Client Supabase)
#### [MODIFY] `app/api/generate-report/route.ts` (Menyisipkan logika insert ke DB setelah laporan selesai)
*(Tabel `reports` akan perlu dibuat di dashboard Supabase)*

### Fase 6: Dashboard Report History
Melihat daftar laporan yang pernah dibuat.
#### [NEW] `app/dashboard/page.tsx` (Halaman daftar riwayat)
#### [NEW] `app/dashboard/report/[id]/page.tsx` (Detail laporan spesifik dari DB)
#### [NEW] `components/ReportCard.tsx`

### Fase 7: Playwright Website Audit
Kemampuan AI untuk membaca URL dan memberikan audit.
#### [NEW] `lib/playwright.ts` (Script scraping/ekstraksi DOM)
#### [NEW] `app/api/audit/route.ts`
#### [NEW] `components/AuditForm.tsx`

### Fase 8: Competitor Research
Agen untuk membandingkan produk pengguna dengan kompetitor dari URL/pencarian.
#### [NEW] `lib/agents/competitorAgent.ts`
#### [NEW] `app/api/competitor/route.ts`

### Fase 9: Report Dashboard Visual
Memoles UI/UX hasil laporan (chart, tabel, markdown parsing yang rapi).
#### [NEW] `components/ui/MarkdownRenderer.tsx`
#### [MODIFY] `app/dashboard/report/[id]/page.tsx` (Membuat UI lebih premium)

### Fase 10: CLI Autonomous
Membuat skrip Node.js terpisah yang bisa dijalankan di terminal untuk riset mandiri.
#### [NEW] `scripts/autonomous-agent.ts`

---

## Verification Plan

### Manual Verification
Di setiap akhir fase, kita akan memverifikasi:
- **Fase 1-2**: Form merender dengan baik di browser lokal.
- **Fase 3-4**: API merespons dengan struktur JSON/Teks yang sesuai tanpa error dari Anthropic.
- **Fase 5-6**: Data berhasil masuk ke dashboard Supabase dan dirender ulang di halaman riwayat Next.js.
- **Fase 7-8**: Skrip Playwright bisa meluncurkan Chromium secara lokal dan mengambil title/meta tag/konten teks target.
- **Fase 10**: Skrip CLI bisa berjalan dari terminal `ts-node scripts/autonomous-agent.ts` tanpa perlu browser terbuka.
