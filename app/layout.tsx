import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LUMEN OPHTHALMOLOGY — Precision Surgery. Perfect Vision.",
  description:
    "World-class ophthalmic surgeons restoring your visual freedom using next-generation robotic laser technologies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className} h-full antialiased`}>
      <body className="min-h-full bg-[#0a0a0a] font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
