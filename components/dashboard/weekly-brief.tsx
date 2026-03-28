"use client";

import { FileText } from "lucide-react";
import { useState } from "react";

interface WeeklyBriefData {
  id: string;
  brief_id: string;
  title: string;
  content: string;
  key_takeaway: string;
  week_number: number;
  year: number;
  total_themes: number;
  total_signals_processed: number;
  pdf_url?: string;
  generated_at: string;
}

interface WeeklyBriefProps {
  brief?: WeeklyBriefData | null;
  themes?: any[];
}

function getSignalConfig(type: string) {
  switch (type?.toLowerCase()) {
    case "act":
      return { dot: "bg-orange-400", label: "ACT", color: "text-orange-400" };
    case "watch":
      return { dot: "bg-[rgb(127,200,255)]", label: "WATCH", color: "text-[rgb(127,200,255)]" };
    default:
      return { dot: "bg-[rgb(127,200,255)]", label: type?.toUpperCase() ?? "UNKNOWN", color: "text-[rgb(127,200,255)]" };
  }
}

export function WeeklyBrief({ brief, themes = [] }: WeeklyBriefProps) {
  if (!brief) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">No brief available yet.</p>
      </div>
    );
  }

  const dateRange = brief.week_number && brief.year 
    ? `Week of ${getWeekDateRange(brief.week_number, brief.year)}`
    : null;

  // Use the dedicated key_takeaway column, filter out markdown headers and metadata
  const keyTakeaway = brief.key_takeaway || brief.content
    ?.split("\n\n")
    .filter(p => !p.startsWith("#") && !p.startsWith("*") && !p.startsWith("---") && p.trim().length > 0)
    [0] || brief.content?.slice(0, 300);

  return (
    <div className="space-y-6">
      {/* Header - title only, no buttons */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-6 w-6 text-[rgb(127,200,255)]" />
          <h1 className="text-3xl font-bold text-foreground">Weekly Brief</h1>
        </div>
        {dateRange && <p className="text-muted-foreground text-sm">{dateRange}</p>}
      </div>

      {/* Key Takeaway Section */}
      <div className="border-l-4 border-l-[rgb(127,200,255)] border border-border bg-card p-5 rounded-r-lg">
        <p className="text-xs font-semibold tracking-widest text-[rgb(127,200,255)] mb-3 uppercase">
          Key Takeaway
        </p>
        <p className="text-sm text-foreground leading-relaxed mb-4">
          {keyTakeaway}
        </p>

        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>{brief.total_signals_processed} signals processed</span>
          <span>•</span>
          <span>{brief.total_themes} clusters generated</span>
        </div>
      </div>

      {/* Top Themes Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Top Themes This Week</h2>
        <div className="space-y-4">
          {themes.length > 0 ? (
            themes.slice(0, 4).map((theme) => (
              <ThemeBriefCard key={theme.id} theme={theme} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No themes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ThemeBriefCard({ theme }: { theme: any }) {
  const config = getSignalConfig(theme.signal_type);

  return (
    <div className="border border-border bg-card p-5 rounded-xl space-y-3 hover:border-[rgb(127,200,255)]/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`h-2 w-2 rounded-full ${config.dot}`} />
            <span className={`text-xs font-semibold tracking-widest uppercase ${config.color}`}>
              {config.label}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground leading-snug">
            {theme.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <div className="h-1.5 w-14 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full ${config.dot}`}
              style={{ width: `${theme.confidence_score}%` }}
            />
          </div>
          <span className="text-sm font-medium text-foreground">{theme.confidence_score}%</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {theme.summary}
      </p>

      {/* Why It Matters */}
      {theme.why_it_matters && (
        <div>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-1 uppercase">
            Why It Matters
          </p>
          <p className="text-sm text-muted-foreground">{theme.why_it_matters}</p>
        </div>
      )}

      {/* Platform Implications */}
      {theme.what_you_can_do && (
        <div>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-1 uppercase">
            Platform Implications
          </p>
          <p className="text-sm text-muted-foreground">{theme.what_you_can_do}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-muted-foreground pt-2 border-t border-border">
        Based on {theme.signal_count} supporting signal{theme.signal_count !== 1 ? "s" : ""} · Last updated{" "}
        {theme.processed_at ? new Date(theme.processed_at).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }) : "N/A"}
      </div>
    </div>
  );
}

function getWeekDateRange(weekNumber: number, year: number) {
  // Create a date for January 4th of the given year (always in week 1)
  const jan4 = new Date(year, 0, 4);
  // Get the Monday of the week containing January 4th
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
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(weekStart)}–${fmt(weekEnd)}, ${year}`;
}
