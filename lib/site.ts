export const COORDINATOR_PORTRAIT = "/dr-chen.webp";
export const HERO_POSTER_SRC = "/hero-poster.jpg";
export const HERO_FRAME_COUNT = 36;

export function heroFrameSrc(index: number) {
  return `/hero-frames/${String(index + 1).padStart(3, "0")}.jpg`;
}

export const NAV_LINKS = [
  { href: "#advantages", label: "Advantages", superscript: "3" },
  { href: "#services", label: "Procedures" },
  { href: "#surgeons", label: "Surgeons" },
  { href: "#contact", label: "Contact" },
] as const;

export const HERO_SERVICES = [
  "/ LASER VISION CORRECTION",
  "/ CATARACT & LENS SURGERY",
  "/ VITREORETINAL CARE",
] as const;

export const CAPABILITIES = [
  {
    index: "01",
    title: "Real-time mapping",
    body: "Intraoperative OCT reads tissue as it happens and surfaces the micron that matters before the next pulse.",
  },
  {
    index: "02",
    title: "Layered precision",
    body: "Moves from corneal topography to lens calculation without losing the optical thread of your eye.",
  },
  {
    index: "03",
    title: "Adaptive recovery",
    body: "Learns your healing cadence and tightens every protocol as your vision clears.",
  },
] as const;

export const ADVANTAGES = [
  {
    title: "100% Blade-Free",
    body: "Femtosecond laser precision. No blade ever touches the cornea — only light, mapped to the micron.",
  },
  {
    title: "10-Minute Procedure",
    body: "Rapid recovery, out-patient care. Most patients walk out the same morning with usable vision.",
  },
  {
    title: "Lifetime Guarantee",
    body: "Decades of combined surgical expertise, with lifetime enhancement coverage on eligible laser procedures.",
  },
] as const;

export const SERVICES = [
  {
    id: "laser",
    title: "Advanced Laser Vision Correction",
    summary: "SMILE, Custom LASIK, PRK",
    body: "Wavefront-guided and topography-linked ablations reshape the cornea with robotic femtosecond and excimer platforms. Indication mapping, residual stromal calculation, and dry-eye risk are modelled before a single pulse is delivered.",
    tags: ["SMILE", "Custom LASIK", "PRK"],
  },
  {
    id: "cataract",
    title: "Premium Cataract Surgery",
    summary: "Multi-focal lens implants, ultrasonic fragmentation",
    body: "Laser-assisted capsulotomy and phacoemulsification pair with trifocal, EDOF, and toric IOL suites. Every lens is selected against your macular status, angle kappa, and visual demand — distance, near, and night driving.",
    tags: ["Trifocal IOL", "EDOF", "Femto-phaco"],
  },
  {
    id: "retina",
    title: "Vitreoretinal & Glaucoma Care",
    summary: "Microsurgical intraocular interventions",
    body: "Pars plana vitrectomy, macular membrane peel, and MIGS or filtration surgery are performed under wide-field visualisation. Intraocular pressure, perfusion, and retinal architecture are monitored continuously through the case.",
    tags: ["PPV", "MIGS", "Macular surgery"],
  },
] as const;

export const SURGEONS = [
  {
    name: "Dr. Amara Chen",
    title: "Chief Refractive Surgeon, MD, PhD",
    image: "/surgeon-chen.webp",
    credentials:
      "Fellowship, Moorfields Refractive Service. 18,000+ laser procedures. Principal investigator, next-gen SMILE platforms. Board-certified ophthalmology, subspecialty refractive surgery.",
  },
  {
    name: "Dr. Elias Moreau",
    title: "Chief Vitreoretinal Surgeon, MD, PhD",
    image: "/surgeon-moreau.webp",
    credentials:
      "Vitreoretinal fellowship, Wilmer Eye Institute. Complex PPV, diabetic traction, and macular reconstruction. Published on intraoperative OCT-guided membrane peel.",
  },
  {
    name: "Dr. Sofia Rahman",
    title: "Director of Cataract & Lens, MD, FACS",
    image: "/surgeon-rahman.webp",
    credentials:
      "Anterior segment fellowship, Bascom Palmer. Premium IOL planning for post-refractive and irregular corneas. FACS; examiner, cataract outcomes registry.",
  },
  {
    name: "Dr. Henrik Voss",
    title: "Glaucoma & Anterior Segment, MD, FRCS",
    image: "/surgeon-voss.webp",
    credentials:
      "FRCS (Ed) Ophthalmology. MIGS and filtration revision specialist. Former lead, European Glaucoma Society surgical workshop.",
  },
] as const;
