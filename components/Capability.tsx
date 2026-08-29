import { ChevronRight } from "lucide-react";
import { CAPABILITIES } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Capability() {
  return (
    <section
      id="technologies"
      className="flex min-h-screen flex-col justify-between px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <Reveal delay={120}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] backdrop-blur-md">
            Clarity On Demand
          </span>
        </Reveal>

        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Our surgeons don&apos;t just treat the eye — they map, refine, and restore
            the vision you were meant to have.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-1 flex-col justify-end">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="max-w-xl">
            <Reveal delay={180} as="h2">
              <span className="block text-5xl leading-[1.05] font-normal tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
                Learn to see
                <br />
                brilliantly.
              </span>
            </Reveal>

            <Reveal delay={320} as="p" className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
              From diagnostic mapping to the final micron of laser, Lumen turns
              complex ocular data into outcomes you can feel — quietly, precisely,
              at speed.
            </Reveal>

            <Reveal delay={420} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
              >
                Book Urgent Consultation
                <ChevronRight size={14} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-medium backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
              >
                Free consultation
              </a>
            </Reveal>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
            {CAPABILITIES.map((item, index) => (
              <Reveal
                key={item.index}
                delay={300 + index * 110}
                className={`flex gap-5 py-5 ${
                  index < CAPABILITIES.length - 1 ? "border-b border-white/15" : ""
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">
                  {item.index}
                </span>
                <div className="group min-w-0">
                  <p className="flex items-center gap-2 text-base font-medium text-white sm:text-lg">
                    {item.title}
                    <ChevronRight
                      size={16}
                      className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
