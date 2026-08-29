"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Services() {
  const [openId, setOpenId] = useState<string>(SERVICES[0].id);

  return (
    <section id="services" className="px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={80}>
            <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] backdrop-blur-md">
              Surgical Services
            </span>
          </Reveal>
          <Reveal delay={180} as="h2" className="mt-5">
            <span className="block text-4xl leading-[1.08] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Procedures, refined
              <br />
              to the micron.
            </span>
          </Reveal>
        </div>
        <Reveal delay={260} className="max-w-sm md:text-right">
          <p className="text-base leading-relaxed text-white/80 drop-shadow-md sm:text-lg">
            Each pathway is planned against your optics, lifestyle, and risk —
            then executed on robotic laser and microsurgical platforms.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
        {SERVICES.map((service, index) => {
          const open = openId === service.id;
          return (
            <Reveal
              key={service.id}
              delay={200 + index * 110}
              className={index < SERVICES.length - 1 ? "border-b border-white/15" : ""}
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? "" : service.id)}
                className="flex w-full items-start justify-between gap-5 px-5 py-5 text-left sm:px-6"
              >
                <div>
                  <p className="font-mono text-[11px] tracking-[0.15em] text-white/55">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-base font-medium text-white sm:text-lg">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">{service.summary}</p>
                </div>
                <ChevronRight
                  size={18}
                  className={`mt-1 shrink-0 text-white/40 transition-all duration-300 ${
                    open ? "rotate-90 text-white" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-500 ease-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-6 sm:px-6">
                    <p className="max-w-2xl text-sm leading-relaxed text-white/70">{service.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
