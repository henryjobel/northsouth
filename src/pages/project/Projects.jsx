import ProjectCard from "./ProjectCard";
import { useProjectStore } from "../../store/project/projectStore";
import { useEffect, useMemo } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Projects({ type = "all" }) {
  const { projects, loadProjects, isLoading } = useProjectStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // ✅ FILTER AFTER projects is available
  const filteredProjects = useMemo(() => {
    if (type === "all") return projects;

    return projects.filter(
      (p) => p.status?.toLowerCase() === type
    );
  }, [projects, type]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <FaSpinner className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 px-6 py-20">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-14">
        <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2">Portfolio</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
          Our Projects
        </h1>
        <div className="w-16 h-1 bg-green-500 rounded-full mt-4" />
        <p className="text-gray-500 mt-4 text-center max-w-xl">
          Explore our premium residential and commercial developments across Dhaka.
        </p>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
