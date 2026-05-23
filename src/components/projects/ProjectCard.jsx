import { ArrowUpRight } from "lucide-react";

function toneClass(status) {
  if (status === "Completed") return "border-primary/30 bg-primary-soft text-primary";
  return "border-secondary/30 bg-secondary-soft text-secondary";
}

export default function ProjectCard({ project }) {
  return (
    <article className="project-card group surface-card cursor-hover flex h-full flex-col overflow-hidden">
      <div className="relative overflow-hidden border-b border-border">
        <img
          alt={`${project.title} cover`}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          src={project.cover}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-70 transition duration-300 group-hover:opacity-90" />
        <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4">
          <span className={`status-pill ${toneClass(project.status)}`}>{project.status}</span>
          <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-text">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              className="rounded-xl border border-border bg-bg/80 px-3 py-1.5 text-xs font-medium text-muted"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <a
            className="inline-flex cursor-hover items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-4 py-2 text-sm font-semibold text-primary transition group-hover:border-secondary/35 group-hover:text-secondary"
            href={`/projects/${project.slug}`}
          >
            View Case Study
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
