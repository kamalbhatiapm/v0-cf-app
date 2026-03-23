"use client";

import { useState } from "react";
import { TrendingUp, ChevronDown } from "lucide-react";

interface Theme {
  id: string;
  title: string;
  summary: string;
  why_it_matters?: string;
  what_you_can_do?: string;
  signal_type: string;
  confidence_score: number;
  signal_count: number;
  citations?: { url: string; title: string }[];
}

interface ThemesListProps {
  themes: Theme[];
}

const FILTER_TABS = ["All Themes", "Breakout", "Rising", "Emerging", "Stable", "Declining"];

function getSignalConfig(type: string) {
  switch (type?.toLowerCase()) {
    case "emerging":
      return { dot: "bg-green-400", label: "EMERGING", pts: "+4pts" };
    case "rising":
      return { dot: "bg-[rgb(127,200,255)]", label: "RISING", pts: "+7pts" };
    case "breakout":
    case "breaking":
      return { dot: "bg-orange-400", label: "BREAKOUT", pts: "+15pts" };
    case "stable":
      return { dot: "bg-gray-400", label: "STABLE", pts: "0pts" };
    case "declining":
      return { dot: "bg-red-400", label: "DECLINING", pts: "-3pts" };
    default:
      return { dot: "bg-[rgb(127,200,255)]", label: type?.toUpperCase() ?? "UNKNOWN", pts: "" };
  }
}

function extractTags(theme: Theme): string[] {
  if (theme.citations && theme.citations.length > 0) {
    return theme.citations.slice(0, 4).map((c) => c.title?.split(" ")[0]).filter(Boolean) as string[];
  }
  return theme.title.split(" ").filter((w) => w.length > 4).slice(0, 4);
}

function ThemeCard({ theme }: { theme: Theme }) {
  const [expanded, setExpanded] = useState(false);
  const config = getSignalConfig(theme.signal_type);
  const tags = extractTags(theme);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`rounded-xl border bg-card p-5 flex flex-col gap-3 cursor-pointer transition-all duration-300 ease-out
        ${expanded
          ? "border-[rgb(127,200,255)]/70 shadow-[0_0_28px_rgba(127,200,255,0.18)]"
          : "border-border hover:border-[rgb(127,200,255)]/60 hover:shadow-[0_0_24px_rgba(127,200,255,0.15)] hover:scale-[1.02] hover:-translate-y-0.5"
        }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${config.dot}`} />
            <span className="text-xs font-semibold tracking-wider text-muted-foreground">
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-orange-400 font-medium">
            <TrendingUp className="h-3 w-3" />
            <span>{config.pts}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {theme.signal_count} signal{theme.signal_count !== 1 ? "s" : ""}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground leading-snug">{theme.title}</h3>

      <p className="text-sm text-muted-foreground leading-relaxed">{theme.summary}</p>

      {expanded && (
        <div className="space-y-3 border-t border-border pt-3">
          {theme.why_it_matters && (
            <div>
              <p className="text-xs font-semibold text-[rgb(127,200,255)] mb-1">Why It Matters</p>
              <p className="text-sm text-muted-foreground">{theme.why_it_matters}</p>
            </div>
          )}
          {theme.what_you_can_do && (
            <div>
              <p className="text-xs font-semibold text-[rgb(127,200,255)] mb-1">What You Can Do</p>
              <p className="text-sm text-muted-foreground">{theme.what_you_can_do}</p>
            </div>
          )}
          {theme.citations && theme.citations.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[rgb(127,200,255)] mb-2">Sources</p>
              <ul className="space-y-1">
                {theme.citations.map((citation, idx) => (
                  <li key={idx}>
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-[rgb(127,200,255)] hover:underline transition-colors"
                    >
                      {citation.title || citation.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
        <span className="text-xs text-muted-foreground">Confidence</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-28 rounded-full bg-white/10 border border-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[rgb(127,200,255)]"
              style={{ width: `${theme.confidence_score}%` }}
            />
          </div>
          <span className="text-xs font-medium text-foreground">{theme.confidence_score}%</span>
        </div>
        {tags.map((tag, idx) => (
          <span
            key={`${tag}-${idx}`}
            className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ThemesList({ themes }: ThemesListProps) {
  const [activeFilter, setActiveFilter] = useState("All Themes");

  const filtered = themes.filter((t) => {
    if (activeFilter === "All Themes") return true;
    const type = t.signal_type?.toLowerCase();
    const filter = activeFilter.toLowerCase();
    if (filter === "breakout") return type === "breakout" || type === "breaking";
    return type === filter;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-xl font-semibold text-foreground">Active Themes</h2>
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === tab
                  ? "bg-[rgb(127,200,255)] text-background"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-[rgb(127,200,255)]/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card flex items-center justify-center h-48">
          <p className="text-muted-foreground text-sm">No themes found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
}
