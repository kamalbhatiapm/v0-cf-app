"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ThemesList } from "@/components/dashboard/themes-list";
import { WeeklyBrief } from "@/components/dashboard/weekly-brief";

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

interface WeeklyBriefData {
  id: string;
  brief_id: string;
  title: string;
  content: string;
  key_takeaway?: string;
  week_number: number;
  year: number;
  total_themes: number;
  total_signals_processed: number;
  pdf_url?: string;
  generated_at: string;
}

interface WeekOption {
  week_number: number;
  year: number;
}

interface DashboardTabsProps {
  themes: Theme[];
  weeklyBrief?: WeeklyBriefData | null;
  availableWeeks: WeekOption[];
  currentWeek?: number;
  currentYear?: number;
}

function getWeekLabel(week: number, year: number) {
  const jan1 = new Date(year, 0, 1);
  const daysOffset = (week - 1) * 7;
  const weekStart = new Date(jan1.getTime() + daysOffset * 86400000);
  const weekEnd = new Date(weekStart.getTime() + 6 * 86400000);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(weekStart)}–${fmt(weekEnd)}`;
}

type Tab = "themes" | "brief";

export function DashboardTabs({
  themes: initialThemes,
  weeklyBrief,
  availableWeeks,
  currentWeek,
  currentYear,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("themes");
  const [selectedWeek, setSelectedWeek] = useState<string>(
    currentWeek && currentYear ? `${currentYear}-${currentWeek}` : ""
  );
  const [themes, setThemes] = useState<Theme[]>(initialThemes);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isCurrentWeek =
    selectedWeek === `${currentYear}-${currentWeek}` || selectedWeek === "";

  useEffect(() => {
    if (isCurrentWeek) {
      setThemes(initialThemes);
      return;
    }
    const parts = selectedWeek.split("-");
    const year = parts[0];
    const week = parts[1];
    setLoading(true);
    fetch(`/api/themes?week=${week}&year=${year}`)
      .then((r) => r.json())
      .then((data) => {
        console.log("[v0] Fetched themes for week:", week, "year:", year, "count:", data.themes?.length);
        setThemes(data.themes || []);
      })
      .catch((err) => {
        console.log("[v0] Error fetching themes:", err);
      })
      .finally(() => setLoading(false));
  }, [selectedWeek, initialThemes, isCurrentWeek]);

  const selectedLabel = isCurrentWeek
    ? currentWeek && currentYear
      ? `${getWeekLabel(currentWeek, currentYear)} (Current)`
      : "Current Week"
    : (() => {
        const parts = selectedWeek.split("-");
        const year = parseInt(parts[0]);
        const week = parseInt(parts[1]);
        return getWeekLabel(week, year);
      })();

  return (
    <div className="mt-8">
      {/* Tabs row + week picker */}
      <div className="flex items-center justify-between border-b border-border mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("themes")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "themes"
                ? "border-[rgb(127,200,255)] text-[rgb(127,200,255)]"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Active Themes
          </button>
          <button
            onClick={() => setActiveTab("brief")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "brief"
                ? "border-[rgb(127,200,255)] text-[rgb(127,200,255)]"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Weekly Brief
          </button>
        </div>

        {/* Week picker */}
        {availableWeeks.length > 0 && (
          <div className="relative mb-[-1px]">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-[rgb(127,200,255)]/50 transition-colors"
            >
              <span>{selectedLabel}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 z-50 w-56 rounded-lg border border-border bg-card shadow-lg overflow-hidden">
                {availableWeeks.map((w) => {
                  const key = `${w.year}-${w.week_number}`;
                  const isCurrent =
                    w.week_number === currentWeek && w.year === currentYear;
                  const isSelected = selectedWeek === key || (isCurrentWeek && isCurrent);
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedWeek(key);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between
                        ${isSelected
                          ? "bg-[rgb(127,200,255)]/10 text-[rgb(127,200,255)]"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                    >
                      <span>{getWeekLabel(w.week_number, w.year)}</span>
                      {isCurrent && (
                        <span className="text-[10px] text-[rgb(127,200,255)] font-medium">
                          Current
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tab content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="h-6 w-6 rounded-full border-2 border-[rgb(127,200,255)] border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          {activeTab === "themes" && <ThemesList themes={themes} />}
          {activeTab === "brief" && <WeeklyBrief brief={weeklyBrief} themes={themes} />}
        </>
      )}
    </div>
  );
}
