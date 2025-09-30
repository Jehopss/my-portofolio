"use client";

import ProjectCard from "./components/ProjectCard";
import Greeting from "./components/GreetingAnimation";
import { useState } from "react";
import Image from "next/image";
import profilePic from "../../public/Profile.jpg";
import figma from "../../public/figma.png";
import mysql from "../../public/mysql.png";
import python from "../../public/python.png";
import html5 from "../../public/html5.png";
import tailwindcss from "../../public/tailwindcss.png";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const skills = [
    { name: "Figma", logo: figma },
    { name: "MySQL", logo: mysql },
    { name: "Python", logo: python },
    { name: "HTML 5", logo: html5 },
    { name: "Tailwind CSS", logo: tailwindcss },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-gradientPalette"></div>
      <Greeting />
      <h1 className="mt-5 text-4xl font-bold mb-4">
        Hi, I’m{" "}
        <span
          onClick={() => setIsOpen(true)}
          className="text-indigo-300 cursor-pointer hover:underline"
        >
          Jonathan Hopi Pranata!
        </span>
      </h1>

      <p className="mt-1 text-lg text-white/80">
        Currently a 5th-semester Computer Science student enrolled in the Master
        Track Program at BINUS University.
      </p>

      <div className="mt-10 w-full max-w-6xl p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-300">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 bg-white/10 rounded-xl shadow text-center backdrop-blur-sm flex flex-col items-center"
              >
                <Image
                  src={skill.logo.src}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 mb-2 object-contain"
                />
                <p className="font-semibold text-white">{skill.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-300">Expertise</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              "UI/UX Design",
              "Database",
              "Data Analysis",
              "Machine Learning",
              "Computer Networks",
            ].map((exp) => (
              <div
                key={exp}
                className="p-4 bg-white/10 rounded-xl shadow text-center backdrop-blur-sm"
              >
                <p className="font-semibold text-white">{exp}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-indigo-300">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="Serenity"
              description="A platform for consulting psychology problems."
              link="https://github.com/dheovanwa/Serenity"
            />
            <ProjectCard
              title="DeepPlan"
              description="An application for predicting an estimate of a construction project that uses Machine Learning model to predict the estimated cost, time, etc."
              link="https://github.com/KepinTheNoob/DeepPlan"
            />
            <ProjectCard
              title="Supreme Court Judgement Classifcation"
              description="A Machine Learning model that is used to classify whether if a person is guilty or not based on the fact."
              link="https://github.com/dheovanwa/Supreme-court-judgement-classification"
            />
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-3 mt-10 text-indigo-300">
            Contact
          </h2>
          <div className="p-4 bg-white/10 rounded-xl shadow text-center backdrop-blur-sm">
            <h3>Email: jonathan.pranata@binus.ac.id</h3>
            <h3>Email: jonathanhopee@gmail.com</h3>
            <h3>Phone: +6281298173899</h3>
            <h3>
              Github:{" "}
              <a href="https://github.com/Jehopss">
                https://github.com/Jehopss
              </a>
            </h3>
          </div>
        </section>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-96 relative border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
            >
              ✕
            </button>
            <div className="flex justify-center mb-6">
              <div className="bg-white p-2 pb-6 rounded-lg shadow-lg">
                <Image
                  src={profilePic.src}
                  alt="Jonathan Hopi Pranata"
                  className="w-32 h-32 rounded-md shadow-lg object-cover object-[50%_10%]"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-indigo-300 text-center">
              About Me
            </h2>
            <p className="text-white/90 mb-2">
              <strong>Name:</strong> Jonathan Hopi Pranata
            </p>
            <p className="text-white/90 mb-2">
              <strong>Interest:</strong> UI/UX Design, Machine Learning
            </p>
            <p className="text-white/90 mb-2">
              <strong>Program:</strong> Computer Science Master Track
            </p>
            <p className="text-white/90 mb-2">
              <strong>University:</strong> BINUS University
            </p>
            <p className="text-white/90 mb-2">
              <strong>Semester:</strong> 5th Semester
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
