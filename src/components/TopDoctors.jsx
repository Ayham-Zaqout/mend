"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";

import { doctorRecords } from "@/data/doctors";

const TopDoctors = () => {
  const doctors = useMemo(() => doctorRecords.slice(0, 4), []);

  return (
    <section className="border-y border-border bg-surface py-16 md:py-20">
      <div className="container">
        <div className="mb-10 flex flex-col items-start gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="label-caps">Our specialists</p>
            <h2 className="heading-section text-3xl md:text-4xl">
              Top doctors to book
            </h2>
            <p className="text-foreground-muted">
              Clear profiles, live availability, and transparent consultation
              fees.
            </p>
          </div>

          <Link
            href="/doctors"
            className="hidden items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-btn transition-colors duration-200 hover:bg-primary-hover md:inline-flex"
          >
            View all specialists
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => {
            const available = doctor.isAvailableToday;

            return (
              <Link
                key={doctor.id}
                href={`/appointment/${doctor.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface no-underline shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-hover"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-gradient-to-b from-primary-soft to-surface-muted">
                  <Image
                    alt={doctor.name}
                    fill
                    src={doctor.imageUrl}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-surface from-[8%] to-transparent"
                  />

                  <div className="absolute left-3 top-3 right-3 flex items-start justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold backdrop-blur-md ${available
                        ? "border-emerald-200/80 bg-white/90 text-emerald-700"
                        : "border-border bg-white/90 text-foreground-muted"
                        }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${available ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                      />
                      {available ? "Available today" : "Next: Tomorrow"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2.5 px-4 pb-4 pt-1">
                  <div>
                    <p className="line-clamp-1 text-[15px] font-extrabold tracking-tight text-foreground">
                      {doctor.name}
                    </p>
                    <p className="mt-1 text-[13px] font-semibold text-accent">
                      {doctor.specialty}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-medium text-foreground-muted">
                    <span>{doctor.degree}</span>
                    <span aria-hidden className="text-border-strong">
                      ·
                    </span>
                    <span>{doctor.experienceText}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-foreground-muted">
                    <MapPin size={12} className="shrink-0 text-accent" />
                    <span className="line-clamp-1">{doctor.address.line1}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
                      <Star size={13} className="text-amber-500" fill="#f59e0b" />
                      4.9
                    </span>
                    <div className="flex items-center gap-2">
                      <p className="text-[13px]">
                        <span className="font-extrabold text-primary">
                          ${doctor.consultationFee}
                        </span>
                        <span className="ml-0.5 font-medium text-text-subtle">
                          /visit
                        </span>
                      </p>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-btn"
          >
            View all specialists
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;