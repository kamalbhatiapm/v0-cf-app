"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string; // e.g. "15+ hrs", "1000+", "99%", "<2s"
}

function parseValue(raw: string): { prefix: string; number: number; suffix: string } {
  // Match optional prefix chars, then digits, then rest as suffix
  const match = raw.match(/^([^0-9]*)([0-9]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw };
  return {
    prefix: match[1],
    number: parseInt(match[2], 10),
    suffix: match[3],
  };
}

export function CountUp({ value }: CountUpProps) {
  const { prefix, number, suffix } = parseValue(value);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(number);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [number, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1500; // ms
    const steps = 50;
    const increment = number / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [hasStarted, number]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}
