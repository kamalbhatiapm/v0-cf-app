import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SignalStats } from "@/components/dashboard/signal-stats";
import { WeeklyBrief } from "@/components/dashboard/weekly-brief";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

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

  const { data: latestBrief } = await supabase
    .from("weekly_briefs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Generate available weeks (current week + 3 previous weeks)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  // Calculate current ISO week number
  const jan4 = new Date(currentYear, 0, 4);
  const daysToMonday = jan4.getDay() === 0 ? 6 : jan4.getDay() - 1;
  const weekOneMonday = new Date(jan4);
  weekOneMonday.setDate(jan4.getDate() - daysToMonday);
  const daysSinceWeekOne = Math.floor((currentDate.getTime() - weekOneMonday.getTime()) / 86400000);
  const currentWeek = Math.floor(daysSinceWeekOne / 7) + 1;

  // Generate last 4 weeks
  const uniqueWeeks: { week_number: number; year: number }[] = [];
  for (let i = 0; i < 4; i++) {
    let weekNum = currentWeek - i;
    let year = currentYear;
    if (weekNum <= 0) {
      year = currentYear - 1;
      weekNum = 52 + weekNum;
    }
    uniqueWeeks.push({ week_number: weekNum, year });
  }

  return {
    themes: currentThemes || [],
    pipelineRun: latestRun,
    weeklyBrief: latestBrief,
    availableWeeks: uniqueWeeks,
  };
}

export default async function DashboardPage() {
  const { themes, pipelineRun, weeklyBrief, availableWeeks } = await getSignalData();

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
        <DashboardTabs
          themes={themes}
          weeklyBrief={weeklyBrief}
          availableWeeks={availableWeeks}
          currentWeek={pipelineRun?.week_number}
          currentYear={pipelineRun?.year}
        />
      </div>
    </div>
  );
}
