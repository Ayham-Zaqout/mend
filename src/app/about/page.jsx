import Image from "next/image";
import { VALUE_CARDS, STATS } from "@/data/about";

export default function AboutPage() {
  return (
    <main className="min-h-screen pb-24 pt-12">
      <div className="container flex flex-col gap-18 px-6">

        <header className="flex max-w-170 flex-col gap-4.5">
          <span className="badge-pill self-start">About Mend</span>

          <h1 className="heading-display text-wrap-balance text-[clamp(2.25rem,5vw,3.25rem)]">
            A simpler way to{" "}
            <span className="bg-(image:--grad-text) bg-clip-text text-transparent">
              connect care.
            </span>
          </h1>

          <p className="max-w-135 text-[1.0625rem] leading-[1.8] text-foreground-muted">
            Mend helps patients discover doctors, compare specialties, and
            book appointments through a clear and reliable digital journey.
          </p>

          <div className="mt-1 h-0.75 w-14 rounded-full bg-(image:--grad-accent)" />
        </header>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="app-card relative overflow-hidden px-5 py-7 text-center transition-all duration-500 ease-out hover:-translate-y-2">
              <div className="absolute left-1/2 top-0 h-0.75 w-[45%] -translate-x-1/2 rounded-b-md bg-(image:--grad-accent)" />

              <p className="mb-2 bg-(image:--grad-primary) bg-clip-text text-4xl font-extrabold leading-none tracking-[-0.04em] text-transparent">
                {s.value}
              </p>

              <p className="text-[13px] font-semibold tracking-wide text-foreground-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="media-frame relative aspect-4/3 shadow-hover">
            <Image
              src="/images/about/about.jpg"
              alt="Mend care professional"
              width={900}
              height={600}
              className="h-full w-full object-cover object-top"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(to_top,rgba(11,31,63,0.3),transparent)]" />
          </div>


          <div className="flex flex-col gap-5.5">
            <div className="flex flex-col gap-3.5">
              <span className="badge-pill self-start">Our vision</span>

              <h2 className="heading-section text-[1.625rem] leading-[1.3]">
                Healthcare that puts patients first.
              </h2>
            </div>

            <p className="leading-[1.8] text-foreground-muted">
              We are building a healthcare experience where patients stay in
              control of booking, follow-up, and doctor communication at every step.
            </p>

            <p className="leading-[1.8] text-foreground-muted">
              The platform is designed to remain easy to use for patients and
              easy to extend for clinics and care teams as it grows.
            </p>

            <blockquote className="relative overflow-hidden rounded-lg border-l-[3px] border-accent bg-accent-soft px-5.5 py-22.5">
              <span className="pointer-events-none absolute -top-3 right-3 select-none font-serif text-[5rem] font-black leading-none text-accent opacity-[0.13]">
                &ldquo;
              </span>

              <p className="relative text-[15px] font-medium italic leading-[1.7] text-accent">
                &ldquo;The right doctor, at the right time — with zero friction.&rdquo;
              </p>
            </blockquote>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="badge-pill self-start">Why choose us</span>

            <h2 className="heading-section text-[1.625rem]">
              Built around your needs.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {VALUE_CARDS.map((card, i) => (
              <article
                key={card.title}
                className="app-card relative flex flex-col gap-4 overflow-hidden px-7 py-8 transition-all duration-500 ease-out hover:-translate-y-2">
                <div className="pointer-events-none absolute right-0 top-0 h-22.5 w-22.5 rounded-bl-[90%] rounded-tr-2xl bg-primary-soft opacity-70" />


                <div className="relative flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-md bg-(image:--grad-accent)">
                  <span className="text-sm font-extrabold tracking-[-0.01em] text-white">
                    0{i + 1}
                  </span>
                </div>


                <div>
                  <h3 className="mb-2 text-base font-bold text-foreground">
                    {card.title}
                  </h3>

                  <p className="text-[0.9rem] leading-[1.75] text-foreground-muted">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}