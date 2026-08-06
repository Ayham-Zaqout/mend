"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { specialtyOptions } from "@/data/specialtyOptions";

const SpecialityMenu = () => {
  return (
    <section className="container py-16 md:py-20" id="speciality">
      <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="label-caps mb-3">Browse by specialty</p>
          <h2 className="heading-section text-3xl md:text-4xl">
            Find care by specialty
          </h2>
          <p className="mt-3 text-base text-foreground-muted">
            Choose a specialty, compare verified doctors, and book a time that
            fits.
          </p>
        </div>

        <Link
          href="/doctors"
          className="hidden items-center gap-2 self-start rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent/40 hover:text-primary md:inline-flex"
        >
          View all specialties
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {specialtyOptions.map((item) => (
          <Link
            key={item.name}
            className="group relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-2xl border border-border bg-surface px-4 py-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-hover"
            href={`/doctors?specialty=${encodeURIComponent(item.name)}`}
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${item.topBarClasses}`}
            />

            <div
              className={`relative flex h-19 w-19 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${item.iconWrapClasses}`}
            >
              <Image
                alt=""
                className="h-11 w-11 object-contain"
                width={88}
                height={88}
                src={item.iconUrl}
              />
              <span
                className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-surface opacity-0 shadow-soft transition-all duration-300 group-hover:opacity-100 ${item.arrowClasses}`}
              >
                <ArrowUpRight size={13} strokeWidth={2.4} />
              </span>
            </div>

            <p className="text-sm font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
              {item.name}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground"
        >
          View all specialties
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
};

export default SpecialityMenu;