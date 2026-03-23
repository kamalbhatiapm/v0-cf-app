"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  AlertTriangle,
} from "lucide-react";

interface Theme {
  id: string;
  theme_id: string;
  title: string;
  summary: string;
  why_it_matters: string;
  what_you_can_do: string;
  confidence_score: number;
  confidence_level: string;
  signal_type: string;
  signal_count: number;
  week_number: number;
  year: number;
  citations: { url: string; title: string }[] | null;
  created_at: string;
}

const signalTypeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  emerging: { icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  rising: { icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
  stable: { icon: Minus, color: "text-blue-400", bg: "bg-blue-400/10" },
  declining: { icon: TrendingDown, color: "text-orange-500", bg: "bg-orange-500/10" },
  breaking: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
};

export function SignalCard({ theme }: { theme: Theme }) {
  const [expanded, setExpanded] = useState(false);

  const config = signalTypeConfig[theme.signal_type?.toLowerCase()] || signalTypeConfig.stable;
  const Icon = config.icon;

  const confidenceColor =
    theme.confidence_score >= 80
      ? "text-green-500"
      : theme.confidence_score >= 60
        ? "text-yellow-500"
        : "text-orange-500";

  return (
    <Card className="group relative overflow-hidden border-border bg-card hover:border-accent/50 transition-colors">
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-48 bg-[rgb(127,200,255)] opacity-[0.04] blur-[40px]" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${config.bg}`}>
              <Icon className={`h-4 w-4 ${config.color}`} />
            </div>
            <Badge variant="outline" className="text-xs capitalize">
              {theme.signal_type || "Signal"}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-medium ${confidenceColor}`}>
              {theme.confidence_score}%
            </span>
            <span className="text-xs text-muted-foreground">confidence</span>
          </div>
        </div>
        <CardTitle className="text-base font-semibold leading-snug mt-3">
          {theme.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {theme.summary}
        </p>

        {expanded && (
          <div className="mt-4 space-y-4 border-t border-border pt-4">
            {theme.why_it_matters && (
              <div>
                <h4 className="text-xs font-medium text-accent mb-1">Why It Matters</h4>
                <p className="text-sm text-muted-foreground">{theme.why_it_matters}</p>
              </div>
            )}
            {theme.what_you_can_do && (
              <div>
                <h4 className="text-xs font-medium text-accent mb-1">What You Can Do</h4>
                <p className="text-sm text-muted-foreground">{theme.what_you_can_do}</p>
              </div>
            )}
            {theme.citations && theme.citations.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-accent mb-2">Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {theme.citations.slice(0, 3).map((cite, i) => (
                    <a
                      key={i}
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-accent underline truncate max-w-[150px]"
                    >
                      {cite.title || cite.url}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {theme.signal_count} signal{theme.signal_count !== 1 ? "s" : ""}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="h-7 text-xs gap-1"
          >
            {expanded ? (
              <>
                Less <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                More <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
