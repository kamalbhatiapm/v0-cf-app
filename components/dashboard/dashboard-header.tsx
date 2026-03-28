"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface DashboardHeaderProps {
  weekNumber?: number;
  year?: number;
}

function getWeekDateRange(weekNumber: number, year: number) {
  // Create a date for January 4th of the given year (always in week 1)
  const jan4 = new Date(year, 0, 4);
  // Get the Monday of the week containing January 4th
  // Calculate days to subtract: if Sunday (0), subtract 6; otherwise subtract (dayOfWeek - 1)
  const daysToMonday = jan4.getDay() === 0 ? 6 : jan4.getDay() - 1;
  const weekOneMonday = new Date(jan4);
  weekOneMonday.setDate(jan4.getDate() - daysToMonday);
  
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
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </Link>
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

