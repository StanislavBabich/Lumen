"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

const URGENCY = ["Routine", "Priority", "Urgent"] as const;

const fieldClass =
  "w-full border-0 border-b border-white/40 bg-transparent px-0 py-2.5 text-sm text-white outline-none placeholder:text-white/60 transition-colors duration-300 focus:border-white";

export function BookingFooter() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [urgency, setUrgency] = useState<(typeof URGENCY)[number]>("Priority");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  }

  return (
    <footer id="contact" className="px-5 pt-28 pb-12 sm:px-8 sm:pt-32 md:px-12 md:pb-16">
      <Reveal delay={80}>
        <div className="border-y border-white/10 bg-white/5 px-0 py-10 sm:py-12 md:py-14">
          <div className="flex flex-col justify-between gap-16 lg:flex-row lg:items-end">
            <div className="max-w-md shrink-0">
              <span className="inline-block border-l-2 border-white bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em]">
                Appointment Request
              </span>
              <h2 className="mt-5 text-4xl leading-[1.08] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                Begin with
                <br />
                a precise consult.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70 drop-shadow-md sm:text-base">
                A surgical coordinator reviews every request. Urgent cases are
                returned within fifteen minutes during clinic hours.
              </p>
            </div>

            {submitted ? (
              <div className="w-full max-w-sm shrink-0 lg:ml-auto">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Check size={16} strokeWidth={2} />
                </div>
                <p className="text-lg font-medium text-white">Request received</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  Thank you, {name.split(" ")[0]}. A coordinator will reach you at{" "}
                  {phone} regarding your {urgency.toLowerCase()} consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid w-full max-w-sm shrink-0 gap-6 lg:ml-auto">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-white">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Full name"
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-white">
                    Phone
                  </span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+1 000 000 0000"
                    className={fieldClass}
                  />
                </label>
                <fieldset className="block">
                  <legend className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-white">
                    Urgency Level
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {URGENCY.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setUrgency(level)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
                          urgency === level
                            ? "border-white bg-white text-black"
                            : "border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <button
                  type="submit"
                  className="mt-1 w-fit rounded-full bg-[#1d8cff] px-5 py-2 text-xs font-medium text-white transition-colors duration-300 hover:bg-[#4aa3ff] sm:text-sm"
                >
                  Submit request
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
        © {new Date().getFullYear()} Lumen Ophthalmology — All rights reserved
      </p>
    </footer>
  );
}
