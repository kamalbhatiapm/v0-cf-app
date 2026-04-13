"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useAuthState } from "@/hooks/use-auth-state";

export function Hero() {
  const { isLoggedIn } = useAuthState();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* LangChain-style radial glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[rgb(127,200,255)] opacity-[0.08] blur-[120px]" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-[rgb(127,200,255)] opacity-[0.06] blur-[80px]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-accent" />
              <span>AI Signal Intelligence for Platform Leaders</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl animate-fade-up delay-100">
            Clear Signals.{" "}
            <span className="text-accent">Faster Decisions.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl animate-fade-up delay-200">
            Stop spending 15+ hours weekly scanning GitHub, arXiv, and vendor releases. 
            Get structured, confidence-scored intelligence that transforms how you make 
            AI platform decisions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up delay-300">
            <Button size="lg" className="gap-2" asChild>
              <Link href={isLoggedIn ? "/dashboard" : "/auth/sign-up"}>
                {isLoggedIn ? "Go to Dashboard" : "Start Free Trial"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <p className="mt-10 text-sm text-muted-foreground animate-fade-in delay-400">
            Trusted by AI platform teams at leading enterprises
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20">
          {[
            { value: "15+ hrs", label: "saved per week", delay: "delay-300" },
            { value: "1000+", label: "signals processed monthly", delay: "delay-400" },
            { value: "99%", label: "ingestion reliability", delay: "delay-500" },
            { value: "<2s", label: "dashboard load time", delay: "delay-500" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-lg border border-border bg-card p-6 text-center animate-scale-in ${stat.delay} hover:border-accent/50 hover:bg-card/80 transition-colors`}
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
