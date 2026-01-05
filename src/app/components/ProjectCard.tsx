"use client";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  figmaLink?: string;
  isDarkMode: boolean;
}

const ProjectCard = ({
  title,
  description,
  link,
  figmaLink,
  isDarkMode,
}: ProjectCardProps) => (
  <div
    className={`flex flex-col justify-between h-full p-6 rounded-lg shadow-md transition-all duration-300 group
                ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700 hover:border-indigo-500"
                    : "bg-white border border-gray-200 hover:border-blue-500"
                }`}
  >
    <div>
      <h3
        className={`text-xl font-semibold mb-2 transition-colors
                    ${
                      isDarkMode
                        ? "text-white group-hover:text-indigo-400"
                        : "text-gray-900 group-hover:text-blue-700"
                    }`}
      >
        {title}
      </h3>
      <p
        className={`mb-4
                    ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}
      >
        {description}
      </p>
    </div>

    <div className="flex flex-wrap gap-4 mt-auto">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm font-bold opacity-80 hover:opacity-100 transition-opacity flex items-center
                  ${isDarkMode ? "text-indigo-400" : "text-blue-700"}`}
      >
        See Project &rarr;
      </a>

      {figmaLink && (
        <a
          href={figmaLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-bold opacity-80 hover:opacity-100 transition-opacity flex items-center
                    ${isDarkMode ? "text-pink-400" : "text-pink-600"}`}
        >
          Figma Design &rarr;
        </a>
      )}
    </div>
  </div>
);

export default ProjectCard;
