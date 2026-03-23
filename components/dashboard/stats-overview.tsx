import { Card, CardContent } from "@/components/ui/card";
import { Layers, Signal, TrendingUp, Zap } from "lucide-react";

interface StatsOverviewProps {
  totalThemes: number;
  totalSignals: number;
  avgConfidence: number;
  signalTypeCounts: Record<string, number>;
}

export function StatsOverview({
  totalThemes,
  totalSignals,
  avgConfidence,
  signalTypeCounts,
}: StatsOverviewProps) {
  const emergingCount = signalTypeCounts["emerging"] || 0;

  const stats = [
    {
      label: "Active Themes",
      value: totalThemes,
      icon: Layers,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Total Signals",
      value: totalSignals,
      icon: Signal,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Avg Confidence",
      value: `${avgConfidence}%`,
      icon: TrendingUp,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Emerging",
      value: emergingCount,
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
