"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "App", href: "/app" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 shadow-sm">
      <div className="flex justify-between items-center max-w-max-width mx-auto px-container-padding h-16">
        <Link href="/" className="font-display text-headline-md text-primary font-bold">
          TaskFlow
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-gutter items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-label-md transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant font-medium hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side CTA / Actions */}
        <div className="hidden md:flex items-center gap-stack-md">
          <Link
            href="/app"
            className="bg-primary text-on-primary font-sans text-label-md px-4 py-2 rounded-lg hover:opacity-80 active:scale-95 transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-on-surface-variant hover:text-primary p-2 focus:outline-none"
        >
          <span className="material-symbols-outlined text-2xl">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass border-b border-outline-variant/10 px-container-padding py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-sans text-label-md transition-colors py-1 ${
                  isActive(link.href)
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/app"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-on-primary font-sans text-label-md px-4 py-2 rounded-lg hover:opacity-80 active:scale-95 transition-all text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
