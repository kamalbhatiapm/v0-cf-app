import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SignalStats } from "@/components/dashboard/signal-stats";
import { ThemesList } from "@/components/dashboard/themes-list";
import { WeeklyBrief } from "@/components/dashboard/weekly-brief";
import { Header } from "@/components/header";

export const dynamic = "force-dynamic";

async function getSignalData() {
  const supabase = await createClient();

  // Fetch current week themes
  const { data: currentThemes, error: themesError } = await supabase
    .from("current_week_themes")
    .select("*")
    .order("confidence_score", { ascending: false });

  // Fetch latest pipeline run for stats
  const { data: latestRun, error: runError } = await supabase
    .from("pipeline_runs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Fetch latest weekly brief
  const { data: latestBrief, error: briefError } = await supabase
    .from("weekly_briefs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return {
    themes: currentThemes || [],
    pipelineRun: latestRun,
    weeklyBrief: latestBrief,
  };
}

export default async function DashboardPage() {
  const { themes, pipelineRun, weeklyBrief } = await getSignalData();

  return (
    <div className="min-h-screen bg-background relative">
      {/* LangChain-style radial glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[rgb(127,200,255)] opacity-[0.06] blur-[120px]" />
      </div>
      
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <DashboardHeader 
          weekNumber={pipelineRun?.week_number} 
          year={pipelineRun?.year} 
        />
        
        <SignalStats pipelineRun={pipelineRun} />
        
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ThemesList themes={themes} />
          </div>
          <div className="lg:col-span-1">
            <WeeklyBrief brief={weeklyBrief} />
          </div>
        </div>
      </main>
    </div>
  );
}
