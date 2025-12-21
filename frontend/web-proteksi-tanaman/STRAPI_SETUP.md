# Setup Strapi + Next.js

Dokumentasi ini menjelaskan konfigurasi Strapi dengan Next.js yang sudah di-setup di project ini.

## ✅ Komponen yang Sudah Dikonfigurasi

### 1. Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
NEXT_PUBLIC_STRAPI_MEDIA_URL=http://localhost:1337
STRAPI_REVALIDATE_SECRET=your-secret-here
```

**Catatan:** 
- Copy `.env.local.example` ke `.env.local` dan isi dengan nilai yang sesuai
- `NEXT_PUBLIC_STRAPI_API_URL` harus di-set karena digunakan di client-side
- `STRAPI_API_TOKEN` opsional, hanya diperlukan untuk protected endpoints
- `STRAPI_REVALIDATE_SECRET` untuk security webhook revalidation

### 2. Strapi API Client (`lib/strapi.ts`)
Utility functions untuk fetch data dari Strapi:
- ✅ `fetchStrapi()` - Fetch data dengan query options
- ✅ `fetchStrapiEntry()` - Fetch single entry
- ✅ `fetchStrapiEntries()` - Fetch multiple entries
- ✅ `getStrapiMediaUrl()` - Helper untuk URL media/image
- ✅ `buildStrapiQuery()` - Build query string
- ✅ `populateDeep()` - Helper untuk populate nested relations
- ✅ Support untuk Strapi v4 dan v5
- ✅ Support untuk ISR (Incremental Static Regeneration)
- ✅ Support untuk caching dan revalidation

### 3. Image Optimization (`next.config.ts`)
- ✅ Konfigurasi remote patterns untuk Strapi images
- ✅ Support untuk localhost dan production domains
- ✅ Support untuk AWS S3 dan cloud storage lainnya

### 4. Type Definitions (`types/strapi.d.ts`)
- ✅ TypeScript types untuk Strapi responses
- ✅ Types untuk images, components, dan entities

### 5. Revalidation API Route (`app/api/revalidate/route.ts`)
- ✅ Webhook endpoint untuk revalidate cache
- ✅ Support untuk manual revalidation
- ✅ Security dengan secret token

## 📋 Perbandingan dengan Setup Umum

### ✅ Yang Sudah Sesuai:
1. **Environment Variables** - ✅ Sudah ada
2. **API Client Functions** - ✅ Sudah ada dengan fitur lengkap
3. **Image Optimization** - ✅ Sudah dikonfigurasi
4. **Type Safety** - ✅ TypeScript types sudah ada
5. **Revalidation** - ✅ API route untuk webhook sudah ada
6. **Error Handling** - ✅ Sudah ada try-catch dan error messages
7. **Caching Support** - ✅ Support untuk Next.js caching strategies

### 🔧 Fitur Tambahan yang Sudah Ditambahkan:
1. **Support Strapi v4 & v5** - Endpoint handling yang fleksibel
2. **Deep Populate Helper** - Memudahkan populate nested relations
3. **Flexible Query Builder** - Support berbagai query options
4. **Media URL Helper** - Otomatis handle relative/absolute URLs
5. **Revalidation Webhook** - Auto-revalidate saat content di-update

## 🚀 Cara Menggunakan

### 1. Setup Environment Variables
```bash
# Copy file example
cp .env.local.example .env.local

# Edit .env.local dengan nilai Strapi Anda
```

### 2. Fetch Data di Server Component
```typescript
// app/berita/page.tsx
import { fetchStrapiEntries, getStrapiMediaUrl } from '@/lib/strapi';

export default async function BeritaPage() {
  const articles = await fetchStrapiEntries('articles', {
    populate: '*',
    sort: ['createdAt:desc'],
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.attributes.title}</h2>
          {article.attributes.image?.data && (
            <img 
              src={getStrapiMediaUrl(article.attributes.image.data.attributes.url)}
              alt={article.attributes.image.data.attributes.alternativeText || ''}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

### 3. Fetch Single Entry
```typescript
import { fetchStrapiEntry } from '@/lib/strapi';

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await fetchStrapiEntry('articles', params.id, {
    populate: {
      image: true,
      author: {
        populate: ['avatar'],
      },
    },
  });

  return <div>{/* Render article */}</div>;
}
```

### 4. Menggunakan Next.js Image Component
```typescript
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/strapi';

<Image
  src={getStrapiMediaUrl(image.data.attributes.url)}
  alt={image.data.attributes.alternativeText || ''}
  width={image.data.attributes.width}
  height={image.data.attributes.height}
/>
```

### 5. Setup Webhook di Strapi
1. Buka Strapi Admin Panel
2. Settings > Webhooks
3. Add new webhook:
   - **Name**: Next.js Revalidate
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Events**: 
     - ✅ entry.create
     - ✅ entry.update
     - ✅ entry.delete
   - **Headers**: 
     - Key: `x-strapi-secret`
     - Value: (sama dengan `STRAPI_REVALIDATE_SECRET` di `.env.local`)

## 🔍 Testing Setup

### Test API Connection
```typescript
// Test di server component atau API route
import { fetchStrapiEntries } from '@/lib/strapi';

const test = await fetchStrapiEntries('articles', {
  populate: '*',
});
console.log('Strapi connection:', test);
```

### Test Revalidation
```bash
# Manual revalidation
curl -X GET "http://localhost:3000/api/revalidate?path=/berita"
```

## 📝 Catatan Penting

1. **Strapi v4 vs v5**: Setup ini support kedua versi. Pastikan endpoint di Strapi sesuai dengan versi yang digunakan.

2. **CORS**: Pastikan Strapi mengizinkan request dari domain Next.js Anda:
   ```javascript
   // config/middlewares.js (Strapi)
   module.exports = [
     'strapi::logger',
     'strapi::errors',
     {
       name: 'strapi::security',
       config: {
         contentSecurityPolicy: {
           useDefaults: true,
           directives: {
             'connect-src': ["'self'", 'https:'],
             'img-src': ["'self'", 'data:', 'blob:', 'https:'],
             'media-src': ["'self'", 'data:', 'blob:', 'https:'],
             upgradeInsecureRequests: null,
           },
         },
       },
     },
     {
       name: 'strapi::cors',
       config: {
         origin: ['http://localhost:3000', 'https://your-domain.com'],
         credentials: true,
       },
     },
   ];
   ```

3. **API Permissions**: Di Strapi, pastikan Content-Type permissions di-set ke "find" dan "findOne" untuk public access.

4. **Production**: 
   - Update `next.config.ts` dengan domain Strapi production
   - Update `.env.local` dengan production URLs
   - Pastikan `STRAPI_REVALIDATE_SECRET` menggunakan strong random string

## 🆘 Troubleshooting

### Error: "Strapi API error: 401"
- Pastikan `STRAPI_API_TOKEN` sudah di-set jika endpoint memerlukan authentication
- Atau pastikan Content-Type permissions di Strapi sudah public

### Error: "Failed to fetch from Strapi"
- Pastikan Strapi server berjalan
- Pastikan `NEXT_PUBLIC_STRAPI_API_URL` benar
- Check CORS settings di Strapi

### Images tidak muncul
- Pastikan `next.config.ts` sudah dikonfigurasi dengan domain Strapi
- Pastikan menggunakan `getStrapiMediaUrl()` untuk URL images
- Check Strapi media library permissions

## 📚 Referensi

- [Strapi Documentation](https://docs.strapi.io/)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

