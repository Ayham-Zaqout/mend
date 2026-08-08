import { CONTACT_DETAILS } from "@/data/contact";
import Image from "next/image";
import { Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen pb-24 pt-12">
      <div className="container flex flex-col gap-14 px-6">
        <header className="flex max-w-170 flex-col gap-4">
          <span className="badge-pill self-start">Contact us</span>

          <h1 className="heading-display text-wrap-balance text-[clamp(2.25rem,5vw,3.25rem)]">
            We&apos;re here to{" "}
            <span className="bg-(image:--grad-text) bg-clip-text text-transparent">
              help.
            </span>
          </h1>

          <p className="max-w-130 text-[1.0625rem] leading-[1.75] text-foreground-muted">
            Reach out for product support, clinical onboarding, or partnership
            conversations.
          </p>

          <div className="mt-1 h-0.75 w-14 rounded-full bg-(image:--grad-accent)" />
        </header>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="media-frame aspect-4/3 shadow-hover">
              <Image
                src="/images/contact/contact.png"
                alt="Contact Mend support"
                width={900}
                height={600}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {CONTACT_DETAILS.map((detail) => {
              const Icon = detail.icon;
              return (
                <a
                  key={detail.label}
                  href={detail.href}
                  className="app-card flex items-center gap-4 px-5 py-4 transition-all duration-300 ease-out hover:-translate-x-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-(--r-md) bg-(image:--grad-accent) text-white">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="label-caps mb-1">{detail.label}</p>
                    <p className="truncate text-[0.9375rem] font-semibold text-foreground">
                      {detail.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          <form className="app-card flex flex-col gap-5 p-8">
            <div>
              <h2 className="mb-2 text-xl font-bold tracking-[-0.02em] text-foreground">
                Send a message
              </h2>
              <div className="h-[2.5px] w-9 rounded-full bg-(image:--grad-accent)" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  required
                  type="text"
                  placeholder="Sarah Johnson"
                  className="input-premium"
                />
              </Field>

              <Field label="Email address">
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="input-premium"
                />
              </Field>
            </div>

            <Field label="Subject">
              <input
                required
                type="text"
                placeholder="How can we help?"
                className="input-premium"
              />
            </Field>

            <Field label="Message">
              <textarea
                required
                rows={5}
                placeholder="Tell us more..."
                className="input-premium min-h-30 resize-y"
              />
            </Field>

            <button
              type="button"
              className="btn-premium btn-premium-primary flex items-center gap-2 self-start transition-all duration-300 hover:-translate-y-1"
            >
              <Send size={16} />
              Send message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label-caps">{label}</label>
      {children}
    </div>
  );
}