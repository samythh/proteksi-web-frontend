import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route untuk revalidate cache ketika Strapi content di-update
 * Setup webhook di Strapi: Settings > Webhooks > Add new webhook
 * URL: https://your-domain.com/api/revalidate
 * Events: entry.create, entry.update, entry.delete
 */
export async function POST(request: NextRequest) {
  try {
    // Verifikasi secret token (opsional, untuk security)
    const secret = request.headers.get('x-strapi-secret');
    const expectedSecret = process.env.STRAPI_REVALIDATE_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { model, event } = body;

    // Revalidate berdasarkan model yang di-update
    if (model) {
      // Revalidate semua pages yang menggunakan model tersebut
      // Contoh: jika article di-update, revalidate halaman artikel
      try {
        // Revalidate homepage
        await fetch(`${request.nextUrl.origin}/`, {
          method: 'GET',
          headers: {
            'x-revalidate': 'true',
          },
        });

        // Revalidate berdasarkan model
        if (model === 'article' || model === 'berita') {
          // Revalidate articles page
          await fetch(`${request.nextUrl.origin}/berita`, {
            method: 'GET',
            headers: {
              'x-revalidate': 'true',
            },
          });
        }

        return NextResponse.json({
          revalidated: true,
          now: Date.now(),
          model,
          event,
        });
      } catch (err) {
        console.error('Error revalidating:', err);
        return NextResponse.json(
          { message: 'Error revalidating', error: err },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: 'No model specified' }, { status: 400 });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error },
      { status: 500 }
    );
  }
}

// GET method untuk manual revalidation (testing)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');

  if (!path) {
    return NextResponse.json(
      { message: 'Path is required' },
      { status: 400 }
    );
  }

  try {
    // Revalidate specific path
    await fetch(`${request.nextUrl.origin}${path}`, {
      method: 'GET',
      headers: {
        'x-revalidate': 'true',
      },
    });

    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error },
      { status: 500 }
    );
  }
}

