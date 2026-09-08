import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = getDb();

    const rows = await sql`
      SELECT platform, status, auth_type, connected_at
      FROM platform_credentials
      ORDER BY platform
    `;

    return NextResponse.json({
      ok: true,
      rows,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
