import { ChevronRight } from "lucide-react";
import { COORDINATOR_PORTRAIT, HERO_SERVICES } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col justify-between px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]">
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <ul className="flex flex-col gap-2">
          {HERO_SERVICES.map((service, index) => (
            <Reveal key={service} delay={150 + index * 120} as="li">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                {service}
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            World-class ophthalmic surgeons restoring your visual freedom using
            next-generation robotic laser technologies.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={150} className="mb-5">
            <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] backdrop-blur-md">
              We Restore 12,000+ Visions
            </span>
          </Reveal>

          <Reveal delay={280} as="h1">
            <span className="block text-5xl leading-[1.05] font-normal tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Precision Surgery.
              <br />
              Perfect Vision.
            </span>
          </Reveal>

          <Reveal delay={380} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1d8cff] px-5 py-2.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-[#1d8cff]/85 sm:text-sm"
            >
              Book Urgent Consultation
              <ChevronRight size={14} />
            </a>
            <a
              href="#technologies"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-medium backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              Explore Technologies
            </a>
          </Reveal>
        </div>

        <Reveal delay={420}>
          <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md">
            <img
              src={COORDINATOR_PORTRAIT}
              alt="Dr. Amara Chen, Chief Refractive Surgeon"
              className="h-24 w-20 rounded-lg object-cover"
            />
            <div className="flex flex-col gap-1.5 pr-2">
              <p className="text-sm font-medium text-white">Talk with Dr. Chen</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                Chief Refractive Surgeon
              </p>
              <a
                href="#contact"
                className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                Book 15-mins call
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
