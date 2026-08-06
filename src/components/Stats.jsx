import { stats } from "@/data/stats";

const Stats = () => {
  return (
    <section className="container mt-10 pb-2 pt-2 md:mt-14 md:pt-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {stats.map((stat) => {
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