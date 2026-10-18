import Image from "next/image";
import type { CSSProperties } from "react";

import CopyButton from "./CopyButton";
import portrait from "../assets/profile.webp";
import { contacts, socials } from "../data/portfolio";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Contact: a sentence, a small portrait and the ways to reach him, on one top line. */
export default function Contact() {
  const email = contacts.find((c) => c.label === "Personal email") ?? contacts[0];
  const others = contacts.filter((c) => c !== email);
  const linkedin = socials.find((s) => s.label === "LinkedIn");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="page mt-[var(--section-gap)] mb-[7.5rem] scroll-mt-6 grid grid-cols-[6rem_minmax(0,1fr)] gap-x-5 gap-y-8 lg:grid-cols-12 lg:gap-x-6"
    >
      <h2 id="contact-title" className="sr-only">
        Contact
      </h2>

      <p
        data-reveal
        className="col-span-2 text-[1.5rem] leading-[1.15] font-medium md:text-heading lg:col-span-5"
      >
        I’m always open to new opportunities in UI/UX design, computer vision and machine learning.
      </p>

      <div data-unmask className="lg:col-span-2 lg:col-start-8">
        <Image
          src={portrait}
          alt="Portrait of Jonathan Hopi Pranata"
          sizes="(min-width: 64rem) 160px, 96px"
          className="aspect-square w-24 object-cover object-[50%_20%] lg:w-40"
        />
      </div>

      <div className="min-w-0 lg:col-span-3 lg:col-start-10">
        <p data-reveal style={order(1)} className="font-medium">
          Have a role or a project in mind?
        </p>
        <ul data-reveal style={order(2)} className="mt-3 flex flex-col">
          <li className="flex flex-wrap items-baseline gap-x-4">
            <a href={email.href} className="text-link">
              {email.value}
            </a>
            <CopyButton value={email.copy} label={email.label} />
          </li>
          {linkedin && (
            <li>
              <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="text-link">
                LinkedIn
              </a>
            </li>
          )}
        </ul>
      </div>

      <p data-reveal style={order(3)} className="col-span-2 text-small text-muted lg:col-span-3 lg:col-start-10 lg:-mt-4">
        Also{" "}
        {others.map((c, i) => (
          <span key={c.label}>
            {i > 0 && " or "}
            <a href={c.href} className="text-link whitespace-nowrap">
              {c.value}
            </a>
          </span>
        ))}
        . Based in Indonesia, on Western Indonesia Time (UTC+7).
      </p>
    </section>
  );
}
