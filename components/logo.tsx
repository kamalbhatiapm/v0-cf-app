import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Geometric Falcon Diving - v2-b Style Compact */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        {/* Left wing - swept parallelogram */}
        <path
          d="M 2 6 L 8 3 L 10 8 L 4 11 Z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Right wing - swept parallelogram */}
        <path
          d="M 14 8 L 16 3 L 22 6 L 20 11 Z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Center body - narrow dive */}
        <path
          d="M 10 10 L 14 10 L 12 20 L 10 20 Z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Falcon head - small shape */}
        <path
          d="M 18 8 L 21 9 L 20 12 L 17 11 Z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Eye */}
        <circle cx="19" cy="9.5" r="0.7" fill="currentColor" className="text-accent" />
      </svg>

      {!iconOnly && (
        <span className="text-lg font-semibold tracking-tight text-foreground font-sans">
          CalmFalcon<span className="text-accent">.ai</span>
        </span>
      )}
    </div>
  );
}
