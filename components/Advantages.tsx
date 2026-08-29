"use client";

import { ShieldCheck, Timer, Zap } from "lucide-react";
import { ADVANTAGES } from "@/lib/site";
import { Reveal } from "./Reveal";

const ICONS = [Zap, Timer, ShieldCheck];

export function Advantages() {
  return (
    <section
      id="advantages"
      className="px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={80}>
            <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] backdrop-blur-md">
              Core Advantages
            </span>
          </Reveal>
          <Reveal delay={180} as="h2" className="mt-5">
            <span className="block text-4xl leading-[1.08] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Engineered for
              <br />
              the human eye.
            </span>
          </Reveal>
        </div>
        <Reveal delay={260} className="max-w-sm md:text-right">
          <p className="text-base leading-relaxed text-white/80 drop-shadow-md sm:text-lg">
            Blade-free lasers, compressed theatre time, and a lifetime of
            surgical accountability — measured, not promised.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {ADVANTAGES.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <Reveal key={item.title} delay={220 + index * 110}>
              <article className="group h-full rounded-2xl border border-white/15 bg-white/10 px-5 py-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/15 sm:px-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15">
                  <Icon size={20} strokeWidth={1.5} className="text-[#3ee0d8]" />
                </div>
                <h3 className="text-lg font-medium text-white sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
