# ✅ Checklist Setup Strapi - Verifikasi

Gunakan checklist ini untuk memastikan setup Strapi Anda sudah benar dan lengkap.

## 📁 File yang Harus Ada

- [x] ✅ `lib/strapi.ts` - API Client untuk fetch data dari Strapi
- [x] ✅ `types/strapi.d.ts` - TypeScript type definitions
- [x] ✅ `next.config.ts` - Sudah dikonfigurasi untuk image optimization
- [x] ✅ `app/api/revalidate/route.ts` - Webhook endpoint untuk revalidation
- [ ] ⚠️ `.env.local` - **PERLU DIBUAT MANUAL** (copy dari `.env.local.example`)

## ⚙️ Konfigurasi yang Perlu Dicek

### 1. Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=
NEXT_PUBLIC_STRAPI_MEDIA_URL=
STRAPI_REVALIDATE_SECRET=
```

**Status:** ⚠️ File `.env.local` perlu dibuat manual
- Copy `.env.local.example` ke `.env.local`
- Isi dengan URL Strapi Anda

### 2. Next.js Config (`next.config.ts`)
- [x] ✅ Image optimization sudah dikonfigurasi
- [x] ✅ Remote patterns untuk localhost sudah ada
- [x] ✅ Support untuk AWS S3 sudah ada
- [ ] ⚠️ **PERLU TAMBAH** domain Strapi production (jika sudah ada)

### 3. Strapi API Client (`lib/strapi.ts`)
- [x] ✅ Function `fetchStrapi()` - untuk fetch data umum
- [x] ✅ Function `fetchStrapiEntry()` - untuk fetch single entry
- [x] ✅ Function `fetchStrapiEntries()` - untuk fetch multiple entries
- [x] ✅ Function `getStrapiMediaUrl()` - helper untuk URL media
- [x] ✅ Function `buildStrapiQuery()` - build query string
- [x] ✅ Function `populateDeep()` - helper untuk nested relations
- [x] ✅ Support untuk Strapi v4 dan v5
- [x] ✅ Support untuk caching dan revalidation
- [x] ✅ Error handling sudah ada

### 4. Type Definitions (`types/strapi.d.ts`)
- [x] ✅ Types untuk StrapiResponse
- [x] ✅ Types untuk StrapiEntity
- [x] ✅ Types untuk StrapiImage
- [x] ✅ Types untuk StrapiComponent

### 5. Revalidation API (`app/api/revalidate/route.ts`)
- [x] ✅ POST endpoint untuk webhook
- [x] ✅ GET endpoint untuk manual revalidation
- [x] ✅ Security dengan secret token
- [x] ✅ Error handling

## 🔧 Konfigurasi di Strapi (Perlu Dilakukan di Strapi Admin)

### 1. CORS Configuration
File: `config/middlewares.js` di Strapi
```javascript
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:3000', 'https://your-domain.com'],
    credentials: true,
  },
}
```
- [ ] ⚠️ **PERLU DIKONFIGURASI** di Strapi

### 2. API Permissions
Di Strapi Admin Panel:
- Settings > Users & Permissions Plugin > Roles > Public
- [ ] ⚠️ **PERLU DI-SET** untuk setiap Content-Type:
  - ✅ find (untuk list data)
  - ✅ findOne (untuk single data)

### 3. Webhook (Opsional)
Di Strapi Admin Panel:
- Settings > Webhooks > Add new webhook
- [ ] ⚠️ **OPSIONAL** - hanya jika ingin auto-revalidation
  - URL: `http://localhost:3000/api/revalidate`
  - Events: entry.create, entry.update, entry.delete
  - Headers: x-strapi-secret

## ✅ Status Setup

### Yang Sudah Benar ✅
1. ✅ File `lib/strapi.ts` sudah dibuat dengan lengkap
2. ✅ File `types/strapi.d.ts` sudah dibuat
3. ✅ File `app/api/revalidate/route.ts` sudah dibuat
4. ✅ `next.config.ts` sudah dikonfigurasi untuk images
5. ✅ Tidak ada error linting
6. ✅ Type safety sudah ada
7. ✅ Error handling sudah ada
8. ✅ Support untuk Strapi v4 dan v5

### Yang Perlu Dilakukan ⚠️
1. ⚠️ **BUAT FILE `.env.local`** - copy dari `.env.local.example` dan isi dengan URL Strapi
2. ⚠️ **KONFIGURASI CORS DI STRAPI** - update `config/middlewares.js`
3. ⚠️ **SET API PERMISSIONS DI STRAPI** - set permissions untuk Content-Type yang ingin diakses
4. ⚠️ **TAMBAH DOMAIN PRODUCTION** di `next.config.ts` (jika sudah ada)
5. ⚠️ **SETUP WEBHOOK** (opsional) - jika ingin auto-revalidation

## 🧪 Testing

Setelah semua file dibuat, test dengan:

```typescript
// Buat file: app/test-strapi/page.tsx
import { fetchStrapiEntries } from '@/lib/strapi';

export default async function TestStrapiPage() {
  try {
    const test = await fetchStrapiEntries('articles', {
      populate: '*',
    });
    
    return (
      <div className="container mx-auto p-8">
        <h1>✅ Strapi Connection Success!</h1>
        <pre>{JSON.stringify(test, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-red-600">❌ Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
}
```

Kunjungi: `http://localhost:3000/test-strapi`

## 📝 Kesimpulan

**Setup Strapi di Next.js sudah BENAR dan LENGKAP! ✅**

Yang perlu dilakukan selanjutnya:
1. Buat file `.env.local` dengan URL Strapi Anda
2. Konfigurasi CORS di Strapi
3. Set API permissions di Strapi
4. Test koneksi

Setup ini sudah mengikuti best practices dan siap digunakan! 🎉

