import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const distPath = path.join(
      process.cwd(),
      "node_modules",
      "garmin-auth",
      "dist"
    );

    const files = fs.readdirSync(distPath);

    return NextResponse.json({
      ok: true,
      distPath,
      files,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
