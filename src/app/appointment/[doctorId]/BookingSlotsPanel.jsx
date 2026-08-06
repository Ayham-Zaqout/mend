"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, ClipboardList, Info } from "lucide-react";

import { appointmentService } from "@/services/appointment-service";

const visitReasons = [
    "General consultation",
    "Follow-up visit",
    "Prescription review",
    "New symptom assessment",
    "Preventive check-up",
];

function SummaryRow({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-2.5 last:border-0 last:pb-0">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
                {label}
            </span>
            <span className="max-w-[60%] text-right font-semibold text-foreground">
                {value}
            </span>
        </div>
    );
}

export function BookingSlotsPanel({
    doctorId,
    doctorName,
    doctorSpecialty,
    doctorImageUrl,
    consultationFee,
}) {
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [reason, setReason] = useState(visitReasons[0]);
    const [notes, setNotes] = useState("");

    const allSlots = useMemo(() => {
        const slots = [];
        const today = new Date();

        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
            const date = new Date(today);
            date.setDate(today.getDate() + dayOffset);

            const start = new Date(date);
            start.setHours(10, 0, 0, 0);
            const end = new Date(date);
            end.setHours(21, 0, 0, 0);

            while (start < end) {
                slots.push({
                    dateKey: date.toDateString(),
                    fullDateLabel: date.toLocaleDateString([], {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }),
                    dayLabel: date.toLocaleDateString([], { weekday: "short" }),
                    dateLabel: date.toLocaleDateString([], {
                        day: "numeric",
                        month: "short",
                    }),
                    timeLabel: start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                });
                start.setMinutes(start.getMinutes() + 30);
            }
        }

        return slots;
    }, []);

    const grouped = useMemo(() => {
        const map = new Map();
        allSlots.forEach((slot) => {
            const existing = map.get(slot.dateKey) ?? [];
            existing.push(slot);
            map.set(slot.dateKey, existing);
        });
        return Array.from(map.values());
    }, [allSlots]);

    const [selectedDateKey, setSelectedDateKey] = useState(
        grouped[0]?.[0]?.dateKey ?? ""
    );
    const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem("mend-auth-user");
            setCurrentUser(raw ? JSON.parse(raw) : null);
        } catch {
            setCurrentUser(null);
        }
    }, []);

    const slotsForDate =
        grouped.find((g) => g[0]?.dateKey === selectedDateKey) ?? [];
    const selectedDate = grouped.find(
        (g) => g[0]?.dateKey === selectedDateKey
    )?.[0];
    const isLoggedIn = Boolean(currentUser);

    const handleBooking = () => {
        if (!selectedTime) {
            toast.error("Please choose a time slot first.");
            return;
        }

        if (!currentUser) {
            router.push(`/login?redirect=/appointment/${doctorId}`);
            return;
        }

        startTransition(async () => {
            try {
                const dateLabel = selectedDate
                    ? selectedDate.fullDateLabel
                    : selectedDateKey;

                await appointmentService.bookAppointment({
                    doctorId,
                    doctorName: doctorName || "Specialist",
                    doctorSpecialty,
                    doctorImageUrl,
                    patientId: currentUser.id,
                    patientName: currentUser.name,
                    patientEmail: currentUser.email,
                    reason: notes.trim() ? `${reason} - ${notes.trim()}` : reason,
                    dateLabel,
                    timeLabel: selectedTime,
                });

                toast.success("Appointment request sent for clinic confirmation.");
                router.push("/my-appointment");
            } catch {
                toast.error("Failed to book appointment.");
            }
        });
    };

    return (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
            <div className="space-y-7">
                <div className="rounded-xl border border-border bg-primary-soft/80 p-4">
                    <div className="flex items-start gap-3">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div>
                            <p className="text-sm font-bold text-foreground">
                                Requests are reviewed by the clinic
                            </p>
                            <p className="mt-1 text-xs leading-5 text-foreground-muted">
                                Your booking stays pending until the care team confirms the
                                visit.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="label-caps">1. Choose a date</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
                        {grouped.map((daySlots) => {
                            const slot = daySlots[0];
                            const isActive = selectedDateKey === slot.dateKey;
                            return (
                                <button
                                    key={slot.dateKey}
                                    type="button"
                                    onClick={() => {
                                        setSelectedDateKey(slot.dateKey);
                                        setSelectedTime("");
                                    }}
                                    className={`flex min-h-18 flex-col items-center justify-center rounded-xl border px-2 py-3 text-center transition-colors duration-200 ${isActive
                                        ? "border-primary bg-primary text-white shadow-btn"
                                        : "border-border bg-background text-foreground-muted hover:border-accent/40 hover:bg-surface-muted hover:text-foreground"
                                        }`}
                                >
                                    <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                                        {slot.dayLabel}
                                    </span>
                                    <span className="mt-1 text-sm font-bold">{slot.dateLabel}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="label-caps">2. Choose a time</p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                        {slotsForDate.map((slot) => {
                            const isActive = selectedTime === slot.timeLabel;
                            return (
                                <button
                                    key={`${slot.dateKey}-${slot.timeLabel}`}
                                    type="button"
                                    onClick={() => setSelectedTime(slot.timeLabel)}
                                    className={`min-h-11 rounded-xl border px-2 py-2.5 text-sm font-semibold transition-colors duration-200 ${isActive
                                        ? "border-accent bg-accent-soft text-primary shadow-soft"
                                        : "border-border bg-background text-foreground-muted hover:border-accent/35 hover:bg-surface-muted hover:text-foreground"
                                        }`}
                                >
                                    {slot.timeLabel}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="label-caps">3. Visit details</p>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">
                                Reason for visit
                            </label>
                            <select
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                                className="input-premium min-h-11 cursor-pointer"
                            >
                                {visitReasons.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">
                                Notes for the clinic
                                <span className="ml-1 font-medium text-text-subtle">
                                    (optional)
                                </span>
                            </label>
                            <textarea
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                                rows={3}
                                maxLength={160}
                                placeholder="Symptoms, preferences, or anything useful…"
                                className="input-premium min-h-22 resize-none"
                            />
                            <p className="text-right text-[11px] font-medium text-text-subtle">
                                {notes.length}/160
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-background p-5 lg:sticky lg:top-28">
                <div className="mb-4 flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-accent" />
                    <p className="text-sm font-bold text-foreground">Booking summary</p>
                </div>

                <div className="space-y-3 text-sm">
                    <SummaryRow label="Doctor" value={doctorName} />
                    <SummaryRow label="Visit" value={reason} />
                    <SummaryRow
                        label="Date"
                        value={selectedDate?.fullDateLabel ?? "Choose a date"}
                    />
                    <SummaryRow label="Time" value={selectedTime || "Choose a time"} />
                    {typeof consultationFee === "number" && (
                        <SummaryRow label="Fee" value={`$${consultationFee}`} />
                    )}
                    <SummaryRow label="Status" value="Pending confirmation" />
                </div>

                <div className="mt-6 transition-transform duration-200 hover:-translate-y-0.5">
                    <button
                        type="button"
                        onClick={handleBooking}
                        disabled={!selectedTime || isPending}
                        className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-colors duration-200 ${selectedTime
                            ? "bg-primary text-white shadow-btn hover:bg-primary-hover"
                            : "cursor-not-allowed bg-surface-muted text-foreground-muted opacity-70"
                            }`}
                    >
                        {isPending ? (
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <>
                                <CalendarCheck size={18} />
                                {selectedTime
                                    ? isLoggedIn
                                        ? "Request appointment"
                                        : "Sign in to request"
                                    : "Select a time to continue"}
                            </>
                        )}
                    </button>
                </div>
            </aside>
        </div>
    );
}