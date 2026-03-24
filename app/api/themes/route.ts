import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const week = searchParams.get("week");
  const year = searchParams.get("year");

  if (!week || !year) {
    return NextResponse.json({ error: "Missing week or year" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: themes, error } = await supabase
    .from("themes")
    .select("*")
    .eq("week_number", parseInt(week))
    .eq("year", parseInt(year))
    .order("confidence_score", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ themes: themes || [] });
}
