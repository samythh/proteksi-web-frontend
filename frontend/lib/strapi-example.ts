/**
 * Contoh penggunaan Strapi API Client
 * File ini hanya sebagai referensi, tidak digunakan dalam aplikasi
 */

import { fetchStrapi, fetchStrapiEntry, fetchStrapiEntries, getStrapiMediaUrl, populateDeep } from './strapi';

// Contoh 1: Fetch semua artikel
export async function getArticles() {
  const articles = await fetchStrapiEntries('articles', {
    populate: '*',
    sort: ['createdAt:desc'],
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });
  return articles;
}

// Contoh 2: Fetch single artikel dengan ID
export async function getArticle(id: number) {
  const article = await fetchStrapiEntry('articles', id, {
    populate: {
      image: true,
      author: {
        populate: ['avatar'],
      },
      category: true,
    },
  });
  return article;
}

// Contoh 3: Fetch dengan filter
export async function getPublishedArticles() {
  const articles = await fetchStrapiEntries('articles', {
    filters: {
      publishedAt: {
        $notNull: true,
      },
    },
    populate: '*',
    sort: ['createdAt:desc'],
  });
  return articles;
}

// Contoh 4: Fetch dengan populate nested relations
export async function getArticleWithDeepPopulate(id: number) {
  const article = await fetchStrapiEntry('articles', id, {
    populate: populateDeep(['image', 'author.avatar', 'category', 'tags']),
  });
  return article;
}

// Contoh 5: Menggunakan getStrapiMediaUrl untuk image
export function getArticleImageUrl(image: any) {
  if (!image?.data?.attributes?.url) return '';
  return getStrapiMediaUrl(image.data.attributes.url);
}

// Contoh 6: Fetch dengan custom query
export async function searchArticles(query: string) {
  const articles = await fetchStrapiEntries('articles', {
    filters: {
      $or: [
        {
          title: {
            $containsi: query,
          },
        },
        {
          content: {
            $containsi: query,
          },
        },
      ],
    },
    populate: '*',
  });
  return articles;
}

// Contoh 7: Fetch dengan locale (i18n)
export async function getLocalizedArticles(locale: string = 'id') {
  const articles = await fetchStrapiEntries('articles', {
    locale,
    populate: '*',
  });
  return articles;
}

