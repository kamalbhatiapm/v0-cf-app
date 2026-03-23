"use client";

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
  const dateRange =
    weekNumber && year ? getWeekDateRange(weekNumber, year) : null;

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Signal Intelligence
      </h1>
      <p className="mt-1 text-muted-foreground text-sm">
        Clear signals. Faster decisions.
        {dateRange ? ` Week of ${dateRange}.` : ""}
      </p>
    </div>
  );
}

