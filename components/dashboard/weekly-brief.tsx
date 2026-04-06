"use client";

import { FileText, Download } from "lucide-react";
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
  const handleDownload = () => {
    if (!brief) return;

    const dateRange = brief.week_number && brief.year
      ? `Week of ${getWeekDateRange(brief.week_number, brief.year)}`
      : '';

    const keyTakeaway = brief.key_takeaway || brief.content
      ?.split("\n\n")
      .filter((p: string) => !p.startsWith("#") && !p.startsWith("*") && !p.startsWith("---") && p.trim().length > 0)
      [0] || '';

    const themesHtml = themes.slice(0, 4).map((theme) => {
      const isAct = theme.signal_type?.toLowerCase() === 'act';
      const signalColor = isAct ? '#fb923c' : 'rgb(127,200,255)';
      const label = theme.signal_type?.toUpperCase() ?? '';
      const confidencePct = `${theme.confidence_score}%`;

      return `
        <div style="border:1px solid #3a3a3a;background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:16px;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                <div style="width:8px;height:8px;border-radius:50%;background:${signalColor};"></div>
                <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:${signalColor};">${label}</span>
              </div>
              <h3 style="font-size:16px;font-weight:600;color:#f9f9f9;margin:0;">${theme.title}</h3>
            </div>
            <div style="text-align:right;min-width:60px;">
              <div style="font-size:13px;font-weight:600;color:#f9f9f9;">${confidencePct}</div>
              <div style="height:4px;width:56px;background:#2a2a2a;border-radius:2px;margin-top:4px;">
                <div style="height:4px;width:${confidencePct};background:${signalColor};border-radius:2px;"></div>
              </div>
            </div>
          </div>
          <p style="font-size:13px;color:#aaa;line-height:1.6;margin:0 0 12px 0;">${theme.summary || ''}</p>
          ${theme.why_it_matters ? `
            <div style="margin-bottom:10px;">
              <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;color:#666;text-transform:uppercase;margin:0 0 4px 0;">Why It Matters</p>
              <p style="font-size:13px;color:#aaa;margin:0;">${theme.why_it_matters}</p>
            </div>` : ''}
          ${theme.what_you_can_do ? `
            <div style="margin-bottom:10px;">
              <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;color:#666;text-transform:uppercase;margin:0 0 4px 0;">Platform Implications</p>
              <p style="font-size:13px;color:#aaa;margin:0;">${theme.what_you_can_do}</p>
            </div>` : ''}
          <div style="font-size:11px;color:#555;border-top:1px solid #2a2a2a;padding-top:10px;margin-top:10px;">
            Based on ${theme.signal_count} supporting signal${theme.signal_count !== 1 ? 's' : ''}
          </div>
        </div>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Weekly Brief — ${dateRange}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Geist', system-ui, sans-serif; background: #141414; color: #f9f9f9; padding: 48px; max-width: 860px; margin: 0 auto; }
    @media print { body { padding: 32px; } }
  </style>
</head>
<body>
  <!-- Header -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
    <div style="display:flex;align-items:center;gap:10px;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgb(127,200,255)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      <h1 style="font-size:28px;font-weight:700;color:#f9f9f9;">Weekly Brief</h1>
    </div>
    <span style="font-size:12px;color:#666;">Generated ${new Date(brief.generated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
  </div>
  <p style="font-size:13px;color:#7f8ea0;margin-bottom:32px;">${dateRange}</p>

  <!-- Key Takeaway -->
  <div style="border-left:4px solid rgb(127,200,255);border:1px solid #2a2a2a;border-left:4px solid rgb(127,200,255);background:#1a1a1a;padding:20px 24px;border-radius:0 10px 10px 0;margin-bottom:32px;">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.12em;color:rgb(127,200,255);text-transform:uppercase;margin-bottom:10px;">Key Takeaway</p>
    <p style="font-size:14px;color:#f9f9f9;line-height:1.7;margin-bottom:14px;">${keyTakeaway}</p>
    <div style="display:flex;gap:16px;font-size:12px;color:#666;">
      <span>${brief.total_signals_processed} signals processed</span>
      <span>•</span>
      <span>${brief.total_themes} clusters generated</span>
    </div>
  </div>

  <!-- Themes -->
  <h2 style="font-size:18px;font-weight:600;color:#f9f9f9;margin-bottom:16px;">Top Themes This Week</h2>
  ${themesHtml}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `weekly-brief-week-${brief.week_number}-${brief.year}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

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
      {/* Header with download button */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-6 w-6 text-[rgb(127,200,255)]" />
            <h1 className="text-3xl font-bold text-foreground">Weekly Brief</h1>
          </div>
          {dateRange && <p className="text-muted-foreground text-sm">{dateRange}</p>}
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent/10 hover:border-accent transition-colors text-sm font-medium"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
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
