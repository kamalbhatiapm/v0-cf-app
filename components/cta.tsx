import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollAnimate } from "@/components/scroll-animate";

export function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollAnimate animation="scale-in">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-16 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
          {/* LangChain-style glow */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-[rgb(127,200,255)] opacity-[0.07] blur-[100px]" />
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[rgb(127,200,255)] opacity-[0.05] blur-[60px]" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[rgb(127,200,255)] opacity-[0.05] blur-[60px]" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Stop scanning. Start deciding.
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Stop spending 15+ hours weekly on manual signal analysis. 
              Make better AI infrastructure decisions with confidence-scored intelligence.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. Get your first weekly brief in minutes.
            </p>
          </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
