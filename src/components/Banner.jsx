"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { perks } from "@/data/perks";


const Banner = () => {
  return (
    <section className="container pb-20 pt-2 md:pt-4">
      <div className="relative grid min-h-105 overflow-hidden rounded-[1.75rem] bg-(image:--grad-hero) md:grid-cols-2">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full opacity-25 bg-[radial-gradient(circle,rgba(13,148,136,0.5)_0%,transparent_70%)]"
        />

        <div className="relative z-10 flex flex-col justify-center space-y-6 px-8 py-12 md:px-12 lg:px-14">
          <p className="label-caps text-[#5eead4]">
            Get started
          </p>

          <h2 className="max-w-md text-balance text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white md:text-4xl">
            Create your account and book your next visit.
          </h2>

          <p className="max-w-md text-base font-medium leading-relaxed text-white/70">
            Keep appointments, doctor details, and booking history secure in one
            place.
          </p>

          <ul className="space-y-2.5">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2.5 text-sm font-medium text-white/85"
              >
                <CheckCircle2
                  size={16}
                  className="shrink-0 text-[#6ee7b7]"
                />
                {perk}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/login"
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-lg transition-colors duration-200"
            >
              Create account
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Browse doctors
            </Link>
          </div>
        </div>

        <div className="relative min-h-60 md:min-h-full">
          <Image
            src="/images/banner/banner-care.jpg"
            alt="Doctor consulting with a patient on Mend"
            fill
            className="object-cover object-[center_30%]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,21,38,0.65),transparent_55%)] md:hidden" />
          <div className="absolute inset-y-0 left-0 hidden w-28 bg-[linear-gradient(to_right,rgba(7,21,38,0.95),transparent)] md:block" />
        </div>
      </div>
    </section>
  );
};

export default Banner;