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
  ExternalLink 
} from "lucide-react";

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
