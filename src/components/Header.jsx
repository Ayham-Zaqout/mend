"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Clock, ShieldCheck } from "lucide-react";

const TRUST_BADGES = [
  { icon: Star, label: "4.9 rating", color: "#f59e0b" },
  { icon: Clock, label: "24/7 support", color: "var(--accent)" },
  { icon: ShieldCheck, label: "Verified doctors", color: "var(--success)" },
];

const Header = () => {
  return (
    <section className="container mt-5 mb-2 md:mt-6">
      <div
        className="relative overflow-hidden rounded-[1.75rem] px-8 pt-10 pb-0 sm:px-10 lg:px-12"
        style={{ background: "var(--grad-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(13,148,136,0.55) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:gap-10">
          <div className="flex-1 space-y-6 pb-10 md:space-y-7 md:pb-12">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{
                  borderColor: "rgba(255,255,255,0.22)",
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "#2dd4bf" }}
                />
                Trusted medical booking
              </span>
            </div>

            <h1
              className="text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Book appointments
              <br />
              <span className="text-white/85">with trusted doctors</span>
            </h1>

            <p
              className="max-w-md text-base font-medium leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Browse verified specialists, pick a slot, and confirm your
              appointment in under two minutes.
            </p>

            <div className="flex flex-wrap gap-3">
              {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  <Icon size={13} style={{ color }} />
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#speciality"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-bold shadow-lg transition-colors duration-200"
                style={{ color: "var(--primary)" }}
              >
                Book appointment
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-200 hover:bg-white/10"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.28)",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                Browse specialists
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <Image
                src="/images/group_profiles.png"
                alt="Trusted patients"
                width={80}
                height={40}
                className="select-none"
              />
              <p
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                <span className="font-bold text-white">50,000+</span> patients
                already trust us
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md flex-1 self-end md:max-w-none">
            <Image
              src="/images/header_img.png"
              alt="Mend doctors"
              className="h-auto w-full select-none drop-shadow-2xl"
              width={560}
              height={560}
              sizes="(max-width: 768px) 100vw, 46vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;