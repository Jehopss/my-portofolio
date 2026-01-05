"use client";

import { Github, Figma } from "lucide-react";

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
        className={`mb-4 text-sm
                    ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}
      >
        {description}
      </p>
    </div>

    <div className="flex flex-wrap gap-3 mt-auto">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        title="View Code on GitHub"
        className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all duration-300 hover:scale-105
                  ${
                    isDarkMode
                      ? "border-gray-700 text-indigo-400 hover:border-indigo-400 hover:bg-indigo-400/10"
                      : "border-gray-200 text-blue-700 hover:border-blue-700 hover:bg-blue-50"
                  }`}
      >
        <Github size={20} />
      </a>

      {figmaLink && (
        <a
          href={figmaLink}
          target="_blank"
          rel="noopener noreferrer"
          title="View Figma Design"
          className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all duration-300 hover:scale-105
                    ${
                      isDarkMode
                        ? "border-gray-700 text-pink-400 hover:border-pink-400 hover:bg-pink-400/10"
                        : "border-gray-200 text-pink-600 hover:border-pink-600 hover:bg-pink-50"
                    }`}
        >
          <Figma size={20} />
        </a>
      )}
    </div>
  </div>
);

export default ProjectCard;
