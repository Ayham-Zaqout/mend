"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { SearchX, SlidersHorizontal } from "lucide-react";

import { doctorRecords } from "@/data/doctors";
import { specialtyOptions } from "@/data/specialties";

const readSpecialty = (params) => params.get("specialty") || undefined;

function DoctorsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selected = readSpecialty(searchParams);

    useEffect(() => {
        document.title = "Find a Doctor | Mend";
    }, []);

    const doctors = useMemo(() => {
        if (!selected) return doctorRecords;
        return doctorRecords.filter((doc) => doc.specialty === selected);
    }, [selected]);

    const handleSpecialtyChange = (specialty) => {
        if (!specialty) {
            router.replace("/doctors", { scroll: false });
            return;
        }
        router.replace(
            `/doctors?specialty=${encodeURIComponent(specialty)}`,
            { scroll: false }
        );
    };

    return (
        <div className="container space-y-8 md:space-y-10">
            <header className="max-w-2xl">
                <p className="label-caps mb-3">Our specialists</p>
                <h1 className="heading-section text-3xl md:text-4xl lg:text-[2.6rem]">
                    Find your doctor
                </h1>
                <p className="mt-3 text-base text-foreground-muted md:text-lg">
                    Filter by specialty, compare verified profiles, and book a slot with
                    confidence.
                </p>
            </header>

            <div className="space-y-6">
                <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                    <button
                        type="button"
                        onClick={() => handleSpecialtyChange(undefined)}
                        className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200 ${!selected
                            ? "bg-primary text-white shadow-btn"
                            : "border border-border bg-surface text-foreground-muted"
                            }`}
                    >
                        All
                    </button>
                    {specialtyOptions.map((spec) => {
                        const active = selected === spec.name;
                        return (
                            <button
                                key={spec.name}
                                type="button"
                                onClick={() =>
                                    handleSpecialtyChange(active ? undefined : spec.name)
                                }
                                className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200 ${active
                                    ? "bg-primary text-white shadow-btn"
                                    : "border border-border bg-surface text-foreground-muted"
                                    }`}
                            >
                                {spec.name}
                            </button>
                        );
                    })}
                </div>

                <section className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
                    <aside className="sticky top-22 hidden flex-col gap-1 self-start rounded-2xl border border-border bg-surface p-4 shadow-soft lg:flex lg:p-5">
                        <div className="mb-3 flex items-end justify-between gap-3 px-2">
                            <div>
                                <p className="label-caps">Specialties</p>
                                <p className="mt-1 text-xs font-medium text-foreground-muted">
                                    {doctors.length} doctor{doctors.length === 1 ? "" : "s"}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleSpecialtyChange(undefined)}
                            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-200 ${!selected
                                ? "bg-primary font-bold text-white shadow-btn"
                                : "font-medium text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                                }`}
                        >
                            {!selected && (
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                            )}
                            All specialties
                        </button>

                        <div className="my-2 h-px bg-border" />

                        <div className="flex max-h-[min(60vh,480px)] flex-col gap-1 overflow-y-auto">
                            {specialtyOptions.map((spec) => {
                                const isActive = selected === spec.name;
                                return (
                                    <button
                                        key={spec.name}
                                        type="button"
                                        onClick={() =>
                                            handleSpecialtyChange(isActive ? undefined : spec.name)
                                        }
                                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-200 ${isActive
                                            ? "bg-primary-soft font-bold text-primary"
                                            : "font-medium text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                                            }`}
                                    >
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${isActive
                                                ? "border-accent/25 bg-accent-soft"
                                                : "border-border bg-background"
                                                }`}
                                        >
                                            <Image
                                                src={spec.iconUrl}
                                                alt=""
                                                width={22}
                                                height={22}
                                                className="h-5.5 w-5.5 object-contain"
                                            />
                                        </span>
                                        <span className="min-w-0 flex-1 leading-snug">{spec.name}</span>
                                        {isActive && (
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted">
                                <SlidersHorizontal size={15} className="text-accent" />
                                {selected ? (
                                    <span>
                                        Showing <span className="text-foreground">{selected}</span>
                                    </span>
                                ) : (
                                    <span>Showing all specialties</span>
                                )}
                            </div>
                            <p className="text-sm font-bold text-primary">
                                {doctors.length} result{doctors.length === 1 ? "" : "s"}
                            </p>
                        </div>

                        {doctors.length ? (
                            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {doctors.map((doc) => {
                                    const available = doc.isAvailableToday;
                                    return (
                                        <a
                                            key={doc.id}
                                            href={`/appointment/${doc.id}`}
                                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface no-underline shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-hover"
                                        >
                                            <div className="relative aspect-4/3 overflow-hidden bg-linear-to-b from-primary-soft to-surface-muted">
                                                <Image
                                                    alt={doc.name}
                                                    fill
                                                    src={doc.imageUrl}
                                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div
                                                    aria-hidden
                                                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-surface from-8% to-transparent"
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
                                                        {doc.name}
                                                    </p>
                                                    <p className="mt-1 text-[13px] font-semibold text-accent">
                                                        {doc.specialty}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-medium text-foreground-muted">
                                                    <span>{doc.degree}</span>
                                                    <span aria-hidden className="text-border-strong">·</span>
                                                    <span>{doc.experienceText}</span>
                                                </div>
                                                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
                                                    <p className="text-[13px]">
                                                        <span className="font-extrabold text-primary">
                                                            ${doc.consultationFee}
                                                        </span>
                                                        <span className="ml-0.5 font-medium text-text-subtle">
                                                            /visit
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex min-h-90 items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center shadow-soft">
                                <div className="flex max-w-sm flex-col items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-muted text-text-subtle">
                                        <SearchX size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-foreground">
                                            No specialists found
                                        </p>
                                        <p className="mt-1 text-sm text-foreground-muted">
                                            There are no doctors in this category yet. Try another
                                            specialty.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSpecialtyChange(undefined)}
                                        className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-primary"
                                    >
                                        Clear filter
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function DoctorsPage() {
    return (
        <main className="min-h-screen bg-background pb-20 pt-10 md:pt-12">
            <Suspense>
                <DoctorsContent />
            </Suspense>
        </main>
    );
}