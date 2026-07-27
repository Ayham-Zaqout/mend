import { features } from "@/data/features";

const Features = () => {
    return (
        <section className="container py-16 md:py-20">
            <div className="mb-10 max-w-2xl md:mb-12">
                <p className="label-caps mb-3">Why Mend</p>
                <h2 className="heading-section text-3xl md:text-4xl">
                    Built for confident booking
                </h2>
                <p className="mt-3 text-foreground-muted">
                    A calm, reliable path from search to confirmed appointment.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.title}
                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-hover"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-accent-soft group-hover:text-accent">
                                    <Icon size={22} strokeWidth={2} />
                                </div>
                                <span className="text-xs font-bold tracking-widest text-text-subtle">
                                    {feature.number}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold tracking-tight text-foreground">
                                {feature.title}
                            </h3>
                            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-foreground-muted">
                                {feature.description}
                            </p>

                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Features;