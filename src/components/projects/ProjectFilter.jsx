import { useState } from "react";
import clsx from "clsx";
import ProjectCard from "./ProjectCard.jsx";

const filters = [
  "All",
  "Completed",
  "Odoo ERP",
  "Odoo Localization",
  "Automation",
  "Data Tools",
];

export default function ProjectFilter({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = (() => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "Completed") {
      return projects.filter((project) => project.status === "Completed");
    }
    return projects.filter((project) => project.category === activeFilter);
  })();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            className={clsx(
              "cursor-hover rounded-full border px-4 py-2.5 text-sm font-medium",
              activeFilter === filter
                ? "border-primary/35 bg-primary-soft text-primary"
                : "border-border bg-card/75 text-muted hover:border-secondary/35 hover:text-secondary",
            )}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredProjects.length ? (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="surface-card p-8 text-center">
          <p className="font-display text-2xl font-bold tracking-[-0.04em] text-text">
            No projects in this view yet.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Published projects will appear here once they match the selected category.
          </p>
        </div>
      )}
    </div>
  );
}
