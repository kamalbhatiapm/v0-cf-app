"use client";

import { RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  weekNumber?: number;
  year?: number;
}

function getWeekDateRange(weekNumber: number, year: number) {
  const jan1 = new Date(year, 0, 1);
  const daysOffset = (weekNumber - 1) * 7;
  const weekStart = new Date(jan1.getTime() + daysOffset * 86400000);
  const weekEnd = new Date(weekStart.getTime() + 6 * 86400000);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return `${fmt(weekStart)}–${fmt(weekEnd)}, ${year}`;
}

export function DashboardHeader({ weekNumber, year }: DashboardHeaderProps) {
  const router = useRouter();
  const dateRange =
    weekNumber && year ? getWeekDateRange(weekNumber, year) : null;

  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Signal Intelligence
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Clear signals. Faster decisions.
          {dateRange ? ` Week of ${dateRange}.` : ""}
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[rgb(127,200,255)] animate-pulse" />
          <span className="text-xs text-[rgb(127,200,255)]">Live Data</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border text-muted-foreground hover:text-foreground"
          onClick={() => router.refresh()}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
        <Button
          size="sm"
          className="gap-2 bg-[rgb(127,200,255)] text-background hover:bg-[rgb(100,180,240)] font-medium"
        >
          <Zap className="h-4 w-4" />
          Run Pipeline
        </Button>
      </div>
    </div>
  );
}
