/**
 * Strapi API Client
 * Utility functions untuk fetch data dari Strapi CMS
 */

// Strapi Configuration
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const STRAPI_MEDIA_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || STRAPI_API_URL;

// Helper untuk mendapatkan base URL
export function getStrapiUrl(path: string = ''): string {
  return `${STRAPI_API_URL}${path}`;
}

// Types untuk Strapi Response
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail?: {
          url: string;
          width: number;
          height: number;
        };
        small?: {
          url: string;
          width: number;
          height: number;
        };
        medium?: {
          url: string;
          width: number;
          height: number;
        };
        large?: {
          url: string;
          width: number;
          height: number;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
}

/**
 * Get full URL untuk Strapi media/image
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${STRAPI_MEDIA_URL}${url}`;
}

/**
 * Build query string untuk Strapi API
 */
interface StrapiQueryOptions {
  populate?: string | string[] | object;
  filters?: object;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  locale?: string;
}

export function buildStrapiQuery(options: StrapiQueryOptions = {}): string {
  const params = new URLSearchParams();

  // Populate
  if (options.populate) {
    if (typeof options.populate === 'string') {
      params.append('populate', options.populate);
    } else if (Array.isArray(options.populate)) {
      params.append('populate', options.populate.join(','));
    } else {
      params.append('populate', JSON.stringify(options.populate));
    }
  } else {
    // Default populate all
    params.append('populate', '*');
  }

  // Filters
  if (options.filters) {
    params.append('filters', JSON.stringify(options.filters));
  }

  // Sort
  if (options.sort) {
    if (Array.isArray(options.sort)) {
      params.append('sort', options.sort.join(','));
    } else {
      params.append('sort', options.sort);
    }
  }

  // Pagination
  if (options.pagination) {
    if (options.pagination.page !== undefined) {
      params.append('pagination[page]', options.pagination.page.toString());
    }
    if (options.pagination.pageSize !== undefined) {
      params.append('pagination[pageSize]', options.pagination.pageSize.toString());
    }
    if (options.pagination.start !== undefined) {
      params.append('pagination[start]', options.pagination.start.toString());
    }
    if (options.pagination.limit !== undefined) {
      params.append('pagination[limit]', options.pagination.limit.toString());
    }
  }

  // Fields
  if (options.fields && options.fields.length > 0) {
    params.append('fields', options.fields.join(','));
  }

  // Locale
  if (options.locale) {
    params.append('locale', options.locale);
  }

  return params.toString();
}

/**
 * Fetch data dari Strapi API
 */
export async function fetchStrapi<T>(
  endpoint: string,
  options: StrapiQueryOptions & {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: HeadersInit;
    cache?: RequestCache;
    next?: { revalidate?: number };
  } = {}
): Promise<StrapiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
    cache = 'default',
    next,
    ...queryOptions
  } = options;

  const queryString = buildStrapiQuery(queryOptions);
  // Support untuk Strapi v4 dan v5
  const apiPath = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
  const url = `${STRAPI_API_URL}${apiPath}${queryString ? `?${queryString}` : ''}`;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  // Add API token if available
  if (STRAPI_API_TOKEN) {
    requestHeaders['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: requestHeaders,
    cache,
    ...(next && { next }),
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Fetch single entry dari Strapi
 */
export async function fetchStrapiEntry<T>(
  endpoint: string,
  id: number | string,
  options: Omit<StrapiQueryOptions, 'pagination'> = {}
): Promise<StrapiEntity<T>> {
  const response = await fetchStrapi<StrapiEntity<T>>(`${endpoint}/${id}`, options);
  return response.data;
}

/**
 * Fetch multiple entries dari Strapi
 */
export async function fetchStrapiEntries<T>(
  endpoint: string,
  options: StrapiQueryOptions = {}
): Promise<StrapiEntity<T>[]> {
  const response = await fetchStrapi<StrapiEntity<T>[]>(endpoint, options);
  return Array.isArray(response.data) ? response.data : [];
}

/**
 * Helper untuk populate nested relations
 */
export function populateDeep(fields: string[]): object {
  const populate: any = {};
  
  fields.forEach((field) => {
    const parts = field.split('.');
    let current = populate;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        current[part] = true;
      } else {
        if (!current[part]) {
          current[part] = { populate: {} };
        }
        current = current[part].populate;
      }
    }
  });
  
  return populate;
}

