"use client";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  isDarkMode: boolean;
}

const ProjectCard = ({
  title,
  description,
  link,
  isDarkMode,
}: ProjectCardProps) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex flex-col justify-between h-full p-6 rounded-lg shadow-md transition-all duration-300 group
               ${
                 isDarkMode
                   ? "bg-gray-800 hover:bg-gray-700/70 border border-gray-700 hover:border-indigo-500"
                   : // [DIUBAH]
                     "bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-500"
               }`}
  >
    <div>
      <h3
        className={`text-xl font-semibold mb-2 transition-colors
                   ${
                     isDarkMode
                       ? "text-white group-hover:text-indigo-400"
                       : // [DIUBAH]
                         "text-gray-900 group-hover:text-blue-700"
                   }`}
      >
        {title}
      </h3>
      <p
        className={`mb-4
                   ${
                     // [DIUBAH]
                     isDarkMode ? "text-gray-400" : "text-gray-700"
                   }`}
      >
        {description}
      </p>
    </div>

    <span
      className={`text-sm font-bold opacity-80 group-hover:opacity-100
                 ${
                   // [DIUBAH]
                   isDarkMode ? "text-indigo-400" : "text-blue-700"
                 }`}
    >
      See Project &rarr;
    </span>
  </a>
);

export default ProjectCard;
