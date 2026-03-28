"use client";

interface DashboardHeaderProps {
  weekNumber?: number;
  year?: number;
}

function getWeekDateRange(weekNumber: number, year: number) {
  // Create a date for January 4th of the given year (always in week 1)
  const jan4 = new Date(year, 0, 4);
  // Get the Monday of the week containing January 4th
  const weekOneMonday = new Date(jan4);
  weekOneMonday.setDate(jan4.getDate() - jan4.getDay() + 1);
  
  // Calculate the Monday of the requested week
  const weekStart = new Date(weekOneMonday);
  weekStart.setDate(weekOneMonday.getDate() + (weekNumber - 1) * 7);
  
  // Calculate the Sunday of the requested week
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
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

