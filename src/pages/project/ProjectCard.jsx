import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const status = project.status?.toLowerCase();

  const statusStyle = {
    ready: "bg-green-500 text-white",
    ongoing: "bg-amber-400 text-white",
    upcoming: "bg-blue-500 text-white",
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative w-full h-60 overflow-hidden">
        <img
          src={project.image[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow ${
            statusStyle[status] || "bg-gray-400 text-white"
          }`}
        >
          {project.status}
        </span>

        {/* Title on image bottom */}
        <h3 className="absolute bottom-3 left-4 text-white text-lg font-bold drop-shadow-md leading-tight">
          {project.title}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-5 py-4 gap-3">
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <MdLocationOn className="text-green-500 text-lg shrink-0" />
          <span className="truncate">{project.specs?.address}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Stats row */}
        <div className="grid grid-cols-3 text-center text-xs text-gray-500 gap-2">
          <div>
            <p className="font-bold text-gray-800 text-sm">{project.specs?.floors || "—"}</p>
            <p>Floors</p>
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">{project.specs?.apartments || "—"}</p>
            <p>Units</p>
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">{project.specs?.parking || "—"}</p>
            <p>Parking</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* CTA */}
        <Link
          to={`/consortiumDetails/${project._id}`}
          state={{ project }}
          className="mt-auto flex items-center justify-between gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 group/btn"
        >
          <span>View Details</span>
          <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
