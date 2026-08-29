import { Advantages } from "@/components/Advantages";
import { BookingFooter } from "@/components/BookingFooter";
import { Capability } from "@/components/Capability";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ScrollVideo } from "@/components/ScrollVideo";
import { Services } from "@/components/Services";
import { Surgeons } from "@/components/Surgeons";

export default function Home() {
  return (
    <div className="relative bg-[#0a0a0a] text-white">
      <ScrollVideo />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <div className="h-[80vh]" aria-hidden />
          <Capability />
          <Advantages />
          <Services />
          <Surgeons />
        </main>
        <BookingFooter />
      </div>
    </div>
  );
}
