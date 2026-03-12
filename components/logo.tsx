import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Diving Falcon - Three Parallelogram Shapes */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left wing parallelogram */}
        <polygon
          points="4,8 12,4 14,10 6,14"
          fill="currentColor"
          className="text-accent"
        />
        {/* Right wing parallelogram */}
        <polygon
          points="18,10 20,4 28,8 26,14"
          fill="currentColor"
          className="text-accent"
        />
        {/* Center body parallelogram - narrow and pointed down */}
        <polygon
          points="13,12 19,12 16,28 14,28"
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
