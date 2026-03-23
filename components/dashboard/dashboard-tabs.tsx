"use client";

import { useState } from "react";
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
  week_number: number;
  year: number;
  total_themes: number;
  total_signals_processed: number;
  pdf_url?: string;
  generated_at: string;
}

interface DashboardTabsProps {
  themes: Theme[];
  weeklyBrief?: WeeklyBriefData | null;
}

type Tab = "themes" | "brief";

export function DashboardTabs({ themes, weeklyBrief }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("themes");

  return (
    <div className="mt-8">
      {/* Tab buttons */}
      <div className="flex gap-2 mb-6 border-b border-border">
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

      {/* Tab content */}
      {activeTab === "themes" && <ThemesList themes={themes} />}
      {activeTab === "brief" && <WeeklyBrief brief={weeklyBrief} />}
    </div>
  );
}
