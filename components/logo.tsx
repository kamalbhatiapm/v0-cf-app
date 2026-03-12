import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* CalmFalcon v2-b Diving Falcon Logo */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-v2-b-7FyMiCx0z6u8TsI3XvHuKbXZAKGKHi.png"
        alt="CalmFalcon"
        width={32}
        height={32}
        className="flex-shrink-0"
        priority
      />

      {!iconOnly && (
        <span className="text-lg font-semibold tracking-tight text-foreground font-sans">
          CalmFalcon<span className="text-accent">.ai</span>
        </span>
      )}
    </div>
  );
}
