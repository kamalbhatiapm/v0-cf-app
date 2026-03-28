import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* LangChain-style radial glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Primary large glow bloom — centered top */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[rgb(127,200,255)] opacity-[0.08] blur-[120px]" />
        {/* Secondary tighter glow for depth */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-[rgb(127,200,255)] opacity-[0.06] blur-[80px]" />
        {/* Subtle floor fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-accent" />
              <span>AI Signal Intelligence for Platform Leaders</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Clear Signals.{" "}
            <span className="text-accent">Faster Decisions.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Stop spending 5-10 hours weekly scanning GitHub, arXiv, and vendor releases. 
            Get structured, confidence-scored intelligence that transforms how you make 
            AI platform decisions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <p className="mt-10 text-sm text-muted-foreground">
            Trusted by AI platform teams at leading enterprises
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20">
          {[
            { value: "25+ hrs", label: "saved per week" },
            { value: "10k+", label: "signals processed monthly" },
            { value: "99%", label: "ingestion reliability" },
            { value: "<2s", label: "dashboard load time" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-6 text-center"
            >
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
