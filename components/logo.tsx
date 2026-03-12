import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Talon Strike Mark */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left triangular arm */}
        <polygon
          points="6,12 14,4 16,8"
          fill="currentColor"
          className="text-accent"
        />
        {/* Right triangular arm */}
        <polygon
          points="26,12 18,4 16,8"
          fill="currentColor"
          className="text-accent"
        />
        {/* Center talon point */}
        <polygon
          points="14,14 18,14 16,28"
          fill="currentColor"
          className="text-accent"
        />
      </svg>

      {!iconOnly && (
        <span className="text-lg font-semibold tracking-tight text-foreground font-sans">
          CalmFalcon<span className="text-accent">.ai</span>
        </span>
      )}
    </div>
  );
}
