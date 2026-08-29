"use client";

import { Hexagon } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/15 bg-white/5 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3 sm:px-8 md:px-12">
        <Reveal className="flex items-center gap-2 text-white">
          <Hexagon size={24} strokeWidth={1.5} />
          <span className="text-lg font-medium tracking-tight sm:text-xl">lumen</span>
        </Reveal>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_LINKS.map((link, index) => (
            <Reveal key={link.href} delay={100 + index * 100} as="div">
              <a
                href={link.href}
                className="text-sm text-white/85 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                {"superscript" in link && link.superscript ? (
                  <sup className="ml-0.5 font-mono text-[10px] text-white/60">
                    {link.superscript}
                  </sup>
                ) : null}
              </a>
            </Reveal>
          ))}
        </nav>

        <Reveal delay={500}>
          <a
            href="#contact"
            className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            Book Consultation
          </a>
        </Reveal>
      </div>
    </header>
  );
}
