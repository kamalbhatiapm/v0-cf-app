import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  weekNumber?: number;
  year?: number;
}

export function DashboardHeader({ weekNumber, year }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Signal Intelligence
        </h1>
        <p className="mt-1 text-muted-foreground">
          {weekNumber && year
            ? `Week ${weekNumber}, ${year} — Latest AI ecosystem signals`
            : "Loading signal data..."}
        </p>
      </div>
      <Button variant="outline" size="sm" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Refresh
      </Button>
    </div>
  );
}
