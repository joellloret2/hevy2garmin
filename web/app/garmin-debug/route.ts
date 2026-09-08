import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const packagePath = path.dirname(
      require.resolve("garmin-auth")
    );

    const files = fs.readdirSync(packagePath);

    return NextResponse.json({
      ok: true,
      packagePath,
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
