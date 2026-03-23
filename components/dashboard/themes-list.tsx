"use client";

import { useState } from "react";
import { TrendingUp, Bookmark } from "lucide-react";

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
      return { dot: "bg-green-400", label: "EMERGING", pts: "+4pts", color: "text-green-400" };
    case "rising":
      return { dot: "bg-[rgb(127,200,255)]", label: "RISING", pts: "+7pts", color: "text-[rgb(127,200,255)]" };
    case "breakout":
    case "breaking":
      return { dot: "bg-orange-400", label: "BREAKOUT", pts: "+15pts", color: "text-orange-400" };
    case "stable":
      return { dot: "bg-gray-400", label: "STABLE", pts: "0pts", color: "text-gray-400" };
    case "declining":
      return { dot: "bg-red-400", label: "DECLINING", pts: "-3pts", color: "text-red-400" };
    default:
      return { dot: "bg-[rgb(127,200,255)]", label: type?.toUpperCase() ?? "UNKNOWN", pts: "", color: "text-[rgb(127,200,255)]" };
  }
}

function extractTags(theme: Theme): string[] {
  // Try to derive tags from citations titles or use a fallback from title words
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
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 hover:border-[rgb(127,200,255)]/30 transition-colors">
      {/* Top row: signal type badge + pts + bookmark */}
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
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground leading-snug">
        {theme.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {theme.summary}
      </p>

      {/* Expanded content */}
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
        </div>
      )}

      {/* Confidence bar + tags */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
        <span className="text-xs text-muted-foreground">Confidence</span>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-[rgb(127,200,255)]"
              style={{ width: `${theme.confidence_score}%` }}
            />
          </div>
          <span className="text-xs font-medium text-foreground">{theme.confidence_score}%</span>
        </div>
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Show details link */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-[rgb(127,200,255)] hover:underline text-left mt-1"
      >
        {expanded ? "Hide details" : `Show details · ${theme.signal_count} signal${theme.signal_count !== 1 ? "s" : ""}`}
      </button>
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
    <div className="mt-8">
      {/* Section header + filter tabs */}
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

      {/* 2-column grid */}
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


interface Theme {
  id: string;
  theme_id: string;
  title: string;
  summary: string;
  why_it_matters: string;
  what_you_can_do: string;
  signal_type: string;
  confidence_score: number;
  confidence_level: string;
  signal_count: number;
  citations?: { url: string; title: string }[];
}

interface ThemesListProps {
  themes: Theme[];
}

function getSignalTypeColor(type: string) {
  switch (type?.toLowerCase()) {
    case "emerging":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "rising":
      return "bg-blue-400/10 text-blue-400 border-blue-400/20";
    case "stable":
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    case "declining":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "breaking":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-accent/10 text-accent border-accent/20";
  }
}

function getSignalIcon(type: string) {
  switch (type?.toLowerCase()) {
    case "emerging":
    case "rising":
      return TrendingUp;
    case "declining":
      return TrendingDown;
    default:
      return Minus;
  }
}

function ThemeCard({ theme }: { theme: Theme }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const SignalIcon = getSignalIcon(theme.signal_type);

  return (
    <Card className="bg-card border-border transition-colors hover:border-accent/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge 
                variant="outline" 
                className={getSignalTypeColor(theme.signal_type)}
              >
                <SignalIcon className="mr-1 h-3 w-3" />
                {theme.signal_type}
              </Badge>
              <Badge variant="outline" className="border-border text-muted-foreground">
                {theme.confidence_score}% confidence
              </Badge>
              <Badge variant="outline" className="border-border text-muted-foreground">
                {theme.signal_count} signals
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold text-foreground">
              {theme.title}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {theme.summary}
        </p>

        {isExpanded && (
          <div className="mt-4 space-y-4 border-t border-border pt-4">
            {theme.why_it_matters && (
              <div>
                <h4 className="mb-1 text-sm font-medium text-accent">
                  Why It Matters
                </h4>
                <p className="text-sm text-muted-foreground">
                  {theme.why_it_matters}
                </p>
              </div>
            )}
            {theme.what_you_can_do && (
              <div>
                <h4 className="mb-1 text-sm font-medium text-accent">
                  What You Can Do
                </h4>
                <p className="text-sm text-muted-foreground">
                  {theme.what_you_can_do}
                </p>
              </div>
            )}
            {theme.citations && theme.citations.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-accent">
                  Sources
                </h4>
                <div className="flex flex-wrap gap-2">
                  {theme.citations.slice(0, 5).map((citation, idx) => (
                    <a
                      key={idx}
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-accent"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {citation.title || `Source ${idx + 1}`}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ThemesList({ themes }: ThemesListProps) {
  if (!themes || themes.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex h-48 items-center justify-center">
          <p className="text-muted-foreground">No themes available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">
        Active Themes ({themes.length})
      </h2>
      <div className="space-y-4">
        {themes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  );
}
