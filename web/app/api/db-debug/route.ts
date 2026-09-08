import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = getDb();

    const rows = await sql`
      SELECT
        current_database() AS database,
        current_schema() AS schema,
        inet_server_addr()::text AS server_ip
    `;

    return NextResponse.json({
      ok: true,
      database: rows[0]?.database ?? null,
      schema: rows[0]?.schema ?? null,
      server_ip: rows[0]?.server_ip ?? null,
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
