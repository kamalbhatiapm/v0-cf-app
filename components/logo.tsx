import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Geometric Falcon with Double Chevron - v2-b Style */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        {/* Lower chevron arrow shape */}
        <polygon
          points="2,12 8,7 14,7 8,12 14,17 8,17"
          fill="currentColor"
          className="text-accent"
        />
        {/* Upper chevron arrow shape - offset */}
        <polygon
          points="7,3 13,0 19,0 13,6 19,12 13,12"
          fill="currentColor"
          className="text-accent"
        />
        {/* Falcon head - small geometric shape */}
        <polygon
          points="18,2 20,4 19,7 17,5"
          fill="currentColor"
          className="text-accent"
        />
        {/* Falcon eye dot */}
        <circle cx="19" cy="4" r="0.8" fill="currentColor" className="text-accent" />
      </svg>

      {!iconOnly && (
        <span className="text-lg font-semibold tracking-tight text-foreground font-sans">
          CalmFalcon<span className="text-accent">.ai</span>
        </span>
      )}
    </div>
  );
}
