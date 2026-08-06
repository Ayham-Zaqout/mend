import Image from "next/image";
import Link from "next/link";
import {
    BadgeCheck,
    ChevronRight,
    Clock,
    DollarSign,
    MapPin,
    Star,
} from "lucide-react";

import { BookingSlotsPanel } from "./BookingSlotsPanel";
import { getDoctorById, getRelatedDoctors } from "../../../../doctors";

export async function generateMetadata({ params }) {
    const { doctorId } = await params;
    const doctor = getDoctorById(doctorId);
    return {
        title: doctor ? doctor.name : "Doctor not found",
        description: doctor
            ? `Book an appointment with ${doctor.name}, ${doctor.specialty}.`
            : "Doctor profile not found on Mend.",
    };
}

const AppointmentPage = async ({ params }) => {
    const { doctorId } = await params;
    const doctor = getDoctorById(doctorId);

    if (!doctor) {
        return (
            <div className="container flex min-h-[60vh] items-center justify-center py-20 text-center">
                <div className="space-y-4">
                    <p className="text-5xl font-extrabold tracking-tight text-primary">
                        404
                    </p>
                    <p className="text-lg font-semibold text-foreground-muted">
                        Doctor not found
                    </p>
                    <Link
                        href="/doctors"
                        className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-btn transition-colors duration-200 hover:bg-primary-hover"
                    >
                        Back to doctors
                    </Link>
                </div>
            </div>
        );
    }

    const relatedDoctors = getRelatedDoctors(doctor, 4);

    return (
        <div className="container mt-6 space-y-8 pb-20 md:mt-8 md:space-y-10">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-text-subtle">
                <Link
                    href="/"
                    className="text-foreground-muted transition-colors duration-200 hover:text-accent"
                >
                    Home
                </Link>
                <ChevronRight size={13} />
                <Link
                    href="/doctors"
                    className="text-foreground-muted transition-colors duration-200 hover:text-accent"
                >
                    Doctors
                </Link>
                <ChevronRight size={13} />
                <span className="text-foreground">{doctor.name}</span>
            </nav>

            <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
                <div className="grid items-stretch md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">
                    <div className="relative min-h-70 bg-linear-to-b from-primary-soft to-surface-muted md:min-h-80">
                        <Image
                            src={doctor.imageUrl}
                            alt={doctor.name}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 300px"
                            priority
                        />
                    </div>

                    <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                        <div className="space-y-5">
                            <div>
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                        {doctor.name}
                                    </h1>
                                    <BadgeCheck size={22} className="text-accent" />
                                </div>

                                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-sm font-medium text-foreground-muted">
                                    <span className="font-semibold text-accent">
                                        {doctor.specialty}
                                    </span>
                                    <span aria-hidden className="text-border-strong">
                                        ·
                                    </span>
                                    <span>{doctor.degree}</span>
                                    <span className="rounded-lg border border-border bg-primary-soft px-2.5 py-0.5 text-xs font-bold text-primary">
                                        {doctor.experienceText}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-sm font-semibold text-foreground">
                                    <Star size={15} className="text-amber-500" fill="#f59e0b" />
                                    4.9 rating
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-sm font-semibold text-foreground">
                                    <Clock size={15} className="text-accent" />
                                    {doctor.isAvailableToday
                                        ? "Same-day slots"
                                        : "Next available tomorrow"}
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-sm font-semibold text-foreground">
                                    <MapPin size={15} className="text-accent" />
                                    {doctor.address.line1}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="label-caps">About</p>
                                <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted md:text-[15px]">
                                    {doctor.about}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-primary-soft px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-btn">
                                    <DollarSign size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-foreground-muted">
                                        Consultation fee
                                    </p>
                                    <p className="text-xl font-extrabold tracking-tight text-foreground">
                                        ${doctor.consultationFee}
                                        <span className="ml-1 text-sm font-medium text-text-subtle">
                                            / visit
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <span className="inline-flex items-center gap-1.5 self-start rounded-lg bg-success px-3 py-1.5 text-xs font-bold text-white sm:self-auto">
                                <BadgeCheck size={13} />
                                Verified profile
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="book"
                className="rounded-2xl border border-border bg-surface p-5 shadow-soft sm:p-7 md:p-8"
            >
                <div className="mb-6 max-w-2xl md:mb-8">
                    <p className="label-caps">Book visit</p>
                    <h2 className="mt-1.5 heading-section text-2xl md:text-3xl">
                        Choose a date and time
                    </h2>
                    <p className="mt-2 text-sm text-foreground-muted md:text-base">
                        Select your preferred slot and add visit details. The clinic will
                        confirm your request.
                    </p>
                </div>

                <BookingSlotsPanel
                    doctorId={doctor.id}
                    doctorName={doctor.name}
                    doctorSpecialty={doctor.specialty}
                    doctorImageUrl={doctor.imageUrl}
                    consultationFee={doctor.consultationFee}
                />
            </section>

            {relatedDoctors.length > 0 && (
                <section className="space-y-6 pt-2">
                    <div className="max-w-xl space-y-2">
                        <p className="label-caps">More options</p>
                        <h2 className="heading-section text-2xl md:text-3xl">
                            Related doctors
                        </h2>
                        <p className="text-sm text-foreground-muted">
                            Other trusted specialists patients also consider.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedDoctors.map((item) => {
                            const available = item.isAvailableToday;
                            return (
                                <Link
                                    key={item.id}
                                    href={`/appointment/${item.id}`}
                                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface no-underline shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-hover"
                                >
                                    <div className="relative aspect-4/3 overflow-hidden bg-linear-to-b from-primary-soft to-surface-muted">
                                        <Image
                                            alt={item.name}
                                            fill
                                            src={item.imageUrl}
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                                                {item.name}
                                            </p>
                                            <p className="mt-1 text-[13px] font-semibold text-accent">
                                                {item.specialty}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-medium text-foreground-muted">
                                            <span>{item.degree}</span>
                                            <span aria-hidden className="text-border-strong">
                                                ·
                                            </span>
                                            <span>{item.experienceText}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-foreground-muted">
                                            <MapPin size={12} className="shrink-0 text-accent" />
                                            <span className="line-clamp-1">{item.address.line1}</span>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
                                                <Star size={13} className="text-amber-500" fill="#f59e0b" />
                                                4.9
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <p className="text-[13px]">
                                                    <span className="font-extrabold text-primary">
                                                        ${item.consultationFee}
                                                    </span>
                                                    <span className="ml-0.5 font-medium text-text-subtle">
                                                        /visit
                                                    </span>
                                                </p>
                                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                    <ChevronRight size={13} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

export default AppointmentPage;