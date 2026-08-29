"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { SURGEONS } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Surgeons() {
  const [openName, setOpenName] = useState<string | null>(null);

  return (
    <section id="surgeons" className="px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={80}>
            <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] backdrop-blur-md">
              Meet the Surgeons
            </span>
          </Reveal>
          <Reveal delay={180} as="h2" className="mt-5">
            <span className="block text-4xl leading-[1.08] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Hands you
              <br />
              can trust.
            </span>
          </Reveal>
        </div>
        <Reveal delay={260} className="max-w-sm md:text-right">
          <p className="text-base leading-relaxed text-white/80 drop-shadow-md sm:text-lg">
            A closed faculty of fellowship-trained ophthalmic surgeons. One
            theatre standard. Zero delegated critical steps.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SURGEONS.map((surgeon, index) => {
          const open = openName === surgeon.name;
          return (
            <Reveal key={surgeon.name} delay={200 + index * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={surgeon.image}
                    alt={surgeon.name}
                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-medium text-white">{surgeon.name}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                    {surgeon.title}
                  </p>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenName(open ? null : surgeon.name)}
                    className="mt-4 inline-flex w-fit items-center gap-1 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium transition-colors duration-300 hover:bg-white/20"
                  >
                    View Credentials
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden text-sm leading-relaxed text-white/70">
                      {surgeon.credentials}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
