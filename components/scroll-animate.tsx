"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type AnimationType = "fade-up" | "fade-in" | "scale-in" | "slide-left";

interface ScrollAnimateProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function ScrollAnimate({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  as: Component = "div",
}: ScrollAnimateProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseStyles: Record<AnimationType, { hidden: string; visible: string }> = {
    "fade-up": {
      hidden: "opacity-0 translate-y-8",
      visible: "opacity-100 translate-y-0",
    },
    "fade-in": {
      hidden: "opacity-0",
      visible: "opacity-100",
    },
    "scale-in": {
      hidden: "opacity-0 scale-95",
      visible: "opacity-100 scale-100",
    },
    "slide-left": {
      hidden: "opacity-0 translate-x-8",
      visible: "opacity-100 translate-x-0",
    },
  };

  const styles = baseStyles[animation];
  const El = Component as any;

  return (
    <El
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? styles.visible : styles.hidden
      } ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </El>
  );
}
