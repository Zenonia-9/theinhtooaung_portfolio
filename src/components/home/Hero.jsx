import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import TypingTitle from "./TypingTitle.jsx";

const badges = [
  { label: "Odoo 19", position: "top-8 -left-2" },
  { label: "Automation", position: "top-6 right-0" },
  { label: "PostgreSQL", position: "bottom-10 -left-4" },
  { label: "QWeb Reports", position: "bottom-4 right-5" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-18">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
          initial={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary-soft px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-secondary">
            <Sparkles className="h-3.5 w-3.5" />
            Portfolio database for business software work
          </div>

          <TypingTitle />

          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold tracking-[-0.06em] text-text sm:text-6xl xl:text-7xl">
            Hi, I&apos;m Htoo.
            <span className="mt-3 block text-balance text-primary">
              Odoo Developer and Creative Technologist.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            I build Odoo modules, business workflows, automation tools, and practical
            digital systems with clean backend logic and user-focused design.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              className="inline-flex cursor-hover items-center justify-center gap-2 rounded-2xl border border-primary bg-primary px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(34,197,94,0.16),0_20px_50px_rgba(34,197,94,0.18)] hover:-translate-y-0.5 hover:bg-primary-hover"
              href="/projects"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              className="inline-flex cursor-hover items-center justify-center gap-2 rounded-2xl border border-border bg-card/80 px-6 py-3.5 text-sm font-semibold text-text hover:border-secondary/40 hover:text-secondary"
              href="/contact"
            >
              Contact Me
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative"
          initial={{ opacity: 0, scale: 0.96, y: 22 }}
          transition={{ delay: 0.12, duration: 0.55, ease: "easeOut" }}
        >
          <div className="grain-overlay surface-card relative overflow-hidden p-5">
            <div className="absolute inset-x-6 top-6 flex items-center justify-between rounded-full border border-border/80 bg-bg/70 px-4 py-2 text-xs text-muted backdrop-blur">
              <span>Professional systems portfolio</span>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">
                Dark default
              </span>
            </div>
            <div className="relative pt-12">
              <motion.img
                alt="Thein Htoo Aung portrait"
                animate={{ y: [0, -10, 0] }}
                className="mx-auto aspect-[4/4.5] w-full max-w-md rounded-[2rem] border border-border object-cover shadow-[0_35px_90px_rgba(0,0,0,0.35)]"
                src="/images/profile/htoo-home.jpg"
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              />
            </div>

            {badges.map((badge) => (
              <div
                className={`absolute ${badge.position} rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-medium text-text shadow-soft backdrop-blur`}
                key={badge.label}
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
                {badge.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
