"use client";

import { Users, Stethoscope, Grid3x3, TrendingUp } from "lucide-react";

const STATS = [
  {
    label: "Satisfied Patients",
    value: "50k+",
    helper: "Active users",
    icon: Users,
    iconClasses: "bg-[#0D9488]/[0.08] border-[#0D9488]/20 text-[#0D9488]",
    gradientClasses: "from-[#0D9488] to-[#0D9488]/70",
  },
  {
    label: "Verified Doctors",
    value: "1.2k",
    helper: "Trusted network",
    icon: Stethoscope,
    iconClasses: "bg-[#0B1F3F]/[0.08] border-[#0B1F3F]/20 text-[#0B1F3F]",
    gradientClasses: "from-[#0B1F3F] to-[#0B1F3F]/70",
  },
  {
    label: "Specialties",
    value: "45",
    helper: "Multi-discipline",
    icon: Grid3x3,
    iconClasses: "bg-[#d97706]/[0.08] border-[#d97706]/20 text-[#d97706]",
    gradientClasses: "from-[#d97706] to-[#d97706]/70",
  },
  {
    label: "Successful Visits",
    value: "99%",
    helper: "Positive outcomes",
    icon: TrendingUp,
    iconClasses: "bg-[#059669]/[0.08] border-[#059669]/20 text-[#059669]",
    gradientClasses: "from-[#059669] to-[#059669]/70",
  },
];

const Stats = () => {
  return (
    <section className="container mt-10 pb-2 pt-2 md:mt-14 md:pt-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-hover sm:p-7"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${stat.iconClasses}`}
              >
                <Icon size={20} strokeWidth={2} />
              </div>

              <p
                className={`bg-linear-to-br bg-clip-text text-3xl font-extrabold leading-none tracking-tight text-transparent sm:text-4xl ${stat.gradientClasses}`}
              >
                {stat.value}
              </p>

              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">
                  {stat.label}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-wider text-text-subtle">
                  {stat.helper}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;