import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo />
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            <Link href="/" className="hover:text-foreground transition-colors">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-sm text-muted-foreground">
            Signal Intelligence Dashboard
          </span>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
    </header>
  );
}
