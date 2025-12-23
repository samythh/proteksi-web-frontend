// app/api/strapi/[...path]/route.ts
import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  // 1. Tangkap path (misal: ['beritas'])
  const path = params.path.join("/"); // jadi "beritas"

  // 2. Tangkap query params (misal: ?populate=*)
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();

  // 3. Susun URL Strapi tujuan
  // Hasil: http://localhost:1337/api/beritas?populate=*
  const targetUrl = `${STRAPI_URL}/api/${path}${
    queryString ? `?${queryString}` : ""
  }`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "Content-Type": "application/json",
        // Token aman di server, tidak bocor ke client
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      cache: "no-store", // Bisa diubah sesuai kebutuhan caching
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
