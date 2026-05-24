import { ArrowUpRight } from "lucide-react";

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3.003-.404c1.018.005 2.045.137 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.119 3.176.77.84 1.234 1.911 1.234 3.221 0 4.61-2.806 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.9-.015 3.293 0 .322.216.696.825.578C20.565 22.092 24 17.596 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

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

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="inline-flex cursor-hover items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-4 py-2 text-sm font-semibold text-primary transition group-hover:border-secondary/35 group-hover:text-secondary"
            href={`/projects/${project.slug}`}
          >
            View Case Study
            <ArrowUpRight className="h-4 w-4" />
          </a>
          {project.sourceUrl ? (
            <a
              className="inline-flex cursor-hover items-center gap-2 rounded-full border border-border bg-bg/80 px-4 py-2 text-sm font-semibold text-muted transition hover:border-primary/35 hover:text-primary"
              href={project.sourceUrl}
              rel="noreferrer"
              target="_blank"
            >
              Source Code
              <GitHubIcon />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
