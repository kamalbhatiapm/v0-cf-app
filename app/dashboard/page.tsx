import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SignalStats } from "@/components/dashboard/signal-stats";
import { ThemesList } from "@/components/dashboard/themes-list";

export const dynamic = "force-dynamic";

async function getSignalData() {
  const supabase = await createClient();

  const { data: currentThemes } = await supabase
    .from("current_week_themes")
    .select("*")
    .order("confidence_score", { ascending: false });

  const { data: latestRun } = await supabase
    .from("pipeline_runs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return {
    themes: currentThemes || [],
    pipelineRun: latestRun,
  };
}

export default async function DashboardPage() {
  const { themes, pipelineRun } = await getSignalData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[rgb(127,200,255)] opacity-[0.06] blur-[120px]" />
      </div>

      <div className="px-6 py-8 max-w-[1400px] mx-auto">
        <DashboardHeader
          weekNumber={pipelineRun?.week_number}
          year={pipelineRun?.year}
        />
        <SignalStats pipelineRun={pipelineRun} />
        <ThemesList themes={themes} />
      </div>
    </div>
  );
}
