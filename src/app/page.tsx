"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectCard from "./components/ProjectCard";
import profilePic from "../../public/Profile.jpg";
import figma from "../../public/figma.png";
import mysql from "../../public/mysql.png";
import python from "../../public/python.png";
import html5 from "../../public/html5.png";
import tailwindcss from "../../public/tailwindcss.png";

const skills = [
  { name: "Figma", logo: figma },
  { name: "MySQL", logo: mysql },
  { name: "Python", logo: python },
  { name: "HTML 5", logo: html5 },
  { name: "Tailwind CSS", logo: tailwindcss },
];

const expertiseAreas = [
  "UI/UX Design",
  "Database",
  "Data Analysis",
  "Machine Learning",
  "Computer Networks",
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <main
      className={`flex flex-col md:flex-row min-h-screen
                 ${
                   isDarkMode
                     ? "bg-gray-900 text-gray-300"
                     : "bg-gray-100 text-gray-800"
                 }`}
    >
      <header
        className={`md:w-2/5 lg:w-1/3 md:h-screen md:sticky md:top-0 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r
                   ${
                     isDarkMode
                       ? "bg-gray-950 border-gray-800"
                       : "bg-white border-gray-200"
                   }`}
      >
        <div>
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Image
                src={profilePic.src}
                alt="Jonathan Hopi Pranata"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full mb-6 shadow-lg object-cover object-[50%_10%]"
              />
              <h1
                className={`text-4xl font-bold mb-2
                           ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Jonathan Hopi Pranata
              </h1>
              <h2
                className={`text-xl mb-6
                           ${isDarkMode ? "text-indigo-400" : "text-blue-700"}`}
              >
                Computer Science Student (Master Track Program)
              </h2>
            </div>

            <div className="ml-4 -mt-2 md:mt-0 md:-mr-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors
                           ${
                             isDarkMode
                               ? "text-gray-400 hover:text-indigo-400"
                               : "text-gray-600 hover:text-blue-700"
                           }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <nav className="hidden md:block">
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className={`text-lg transition-colors group
                             ${
                               isDarkMode
                                 ? "text-gray-400 hover:text-indigo-300"
                                 : "text-gray-600 hover:text-blue-700"
                             }`}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    &gt;
                  </span>
                  About
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  className={`text-lg transition-colors group
                             ${
                               isDarkMode
                                 ? "text-gray-400 hover:text-indigo-300"
                                 : "text-gray-600 hover:text-blue-700"
                             }`}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    &gt;
                  </span>
                  Education
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className={`text-lg transition-colors group
                             ${
                               isDarkMode
                                 ? "text-gray-400 hover:text-indigo-300"
                                 : "text-gray-600 hover:text-blue-700"
                             }`}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    &gt;
                  </span>
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={`text-lg transition-colors group
                             ${
                               isDarkMode
                                 ? "text-gray-400 hover:text-indigo-300"
                                 : "text-gray-600 hover:text-blue-700"
                             }`}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    &gt;
                  </span>
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 md:mt-0 text-center md:text-left">
          <div className="space-y-2 text-sm mb-6">
            {" "}
            <div>
              <p
                className={`font-semibold
                   ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                School Email
              </p>
              <a
                href="mailto:jonathan.pranata@binus.ac.id"
                className={`block
                   ${
                     isDarkMode
                       ? "hover:text-indigo-400"
                       : "hover:text-blue-700"
                   }`}
              >
                jonathan.pranata@binus.ac.id
              </a>
            </div>
            <div>
              <p
                className={`font-semibold
                   ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Personal
              </p>
              <a
                href="mailto:jonathanhopee@gmail.com"
                className={`block
                   ${
                     isDarkMode
                       ? "hover:text-indigo-400"
                       : "hover:text-blue-700"
                   }`}
              >
                jonathanhopee@gmail.com
              </a>
            </div>
            <div>
              <p
                className={`font-semibold
                   ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Phone
              </p>
              <p>+6281298173899</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-5">
            <a
              href="https://github.com/Jehopss"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors
                         ${
                           isDarkMode
                             ? "text-gray-400 hover:text-indigo-400"
                             : "text-gray-600 hover:text-blue-700"
                         }`}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/jonathan-hopi-pranata/"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors
                         ${
                           isDarkMode
                             ? "text-gray-400 hover:text-indigo-400"
                             : "text-gray-600 hover:text-blue-700"
                         }`}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Konten Kanan */}
      <div className="md:w-3/5 lg:w-2/3 md:h-screen md:overflow-y-auto p-8 md:p-16">
        <div className="max-w-3xl mx-auto space-y-20">
          <section id="about" className="scroll-mt-16">
            <h2
              className={`text-3xl font-bold mb-6
                         ${isDarkMode ? "text-indigo-400" : "text-blue-700"}`}
            >
              About Me
            </h2>
            <div
              className={`space-y-4 text-lg
                         ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
            >
              <p>
                Hi, I’m Jonathan! Currently a 5th-semester Computer Science
                student enrolled in the Master Track Program at BINUS
                University.
              </p>
              <p>
                My primary interests lie at the intersection of human-computer
                interaction and intelligent systems. I am passionate about{" "}
                <strong
                  className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  UI/UX Design, Computer Vision
                </strong>{" "}
                and{" "}
                <strong
                  className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Machine Learning
                </strong>
                , and I am actively seeking opportunities to grow in these
                fields.
              </p>
            </div>
          </section>

          <section id="education" className="scroll-mt-16">
            <h2
              className={`text-3xl font-bold mb-6
                         ${isDarkMode ? "text-indigo-400" : "text-blue-700"}`}
            >
              Education
            </h2>
            <div
              className={`p-6 rounded-lg shadow-md
                         ${
                           isDarkMode
                             ? "bg-gray-800 border border-gray-700"
                             : "bg-white border border-gray-200"
                         }`}
            >
              <h3
                className={`text-xl font-semibold
                           ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                BINUS University
              </h3>
              <p
                className={`mb-1
                           ${isDarkMode ? "text-indigo-400" : "text-blue-700"}`}
              >
                Computer Science (Master Track Program)
              </p>
              <p
                className={`mt-3
                           ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}
              >
                2022 - Present (5th Semester)
              </p>
              <p
                className={`mt-3
                           ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}
              >
                Relevant Courses: Data Structures, Algorithms, Database Systems,
                Machine Learning, Computer Networks.
              </p>
            </div>
          </section>

          <section id="skills" className="scroll-mt-16">
            <h2
              className={`text-3xl font-bold mb-6
                         ${isDarkMode ? "text-indigo-400" : "text-blue-700"}`}
            >
              Skills & Expertise
            </h2>

            <h3
              className={`text-xl font-semibold mb-4
                         ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Technologies
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-8">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`p-4 rounded-lg text-center flex flex-col items-center justify-center aspect-square transition-all duration-300 hover:scale-105
                             ${
                               isDarkMode
                                 ? "bg-gray-800 hover:bg-gray-700/70 border border-gray-700 hover:border-indigo-500"
                                 : "bg-white shadow-sm hover:bg-gray-50 border border-gray-200 hover:border-blue-500 hover:shadow-md"
                             }`}
                >
                  <Image
                    src={skill.logo.src}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 mb-2 object-contain"
                  />
                  <p
                    className={`font-semibold text-sm
                               ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>

            <h3
              className={`text-xl font-semibold mb-4
                         ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Areas of Expertise
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {expertiseAreas.map((exp) => (
                <div
                  key={exp}
                  className={`p-4 rounded-lg shadow-sm text-center transition-all duration-300
                             ${
                               isDarkMode
                                 ? "bg-gray-800 hover:bg-gray-700/70 border border-gray-700 hover:border-indigo-500"
                                 : "bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-500"
                             }`}
                >
                  <p
                    className={`font-semibold
                               ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {exp}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="scroll-mt-16">
            <h2
              className={`text-3xl font-bold mb-6
                         ${isDarkMode ? "text-indigo-400" : "text-blue-700"}`}
            >
              Projects
            </h2>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              <ProjectCard
                title="Serenity"
                description="A platform for consulting psychology problems."
                link="https://github.com/dheovanwa/Serenity"
                isDarkMode={isDarkMode}
              />
              <ProjectCard
                title="DeepPlan"
                description="An application for predicting an estimate of a construction project that uses Machine Learning model..."
                link="https://github.com/KepinTheNoob/DeepPlan"
                isDarkMode={isDarkMode}
              />
              <ProjectCard
                title="Supreme Court Judgement Classifcation"
                description="A Machine Learning model that is used to classify whether if a person is guilty or not based on the fact."
                link="https://github.com/dheovanwa/Supreme-court-judgement-classification"
                isDarkMode={isDarkMode}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
