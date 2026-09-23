import ContactList from "./ContactList";
import Section from "./Section";
import { Reveal } from "./motion";

export default function Contact() {
  return (
    <Section id="contact" index="05" title="Get in touch">
      <Reveal>
        <p className="max-w-2xl text-2xl leading-snug text-balance text-fg md:text-[2rem] md:leading-[1.25]">
          I’m always open to new opportunities to grow in UI/UX design, computer vision, and
          machine learning. <span className="text-muted">Feel free to reach out.</span>
        </p>
      </Reveal>
      <ContactList />
    </Section>
  );
}
