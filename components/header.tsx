"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Use Cases", href: "#use-cases" },
  { name: "Pricing", href: "#pricing" },
  { name: "Dashboard", href: "/dashboard" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 border-t border-border bg-background px-6 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" className="w-full justify-center">
                Log in
              </Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
