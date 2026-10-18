import ContactList from "./ContactList";
import LocalTime from "./LocalTime";
import ScrollText from "./ScrollText";
import Section from "./Section";
import { Reveal } from "./motion";

export default function Contact() {
  return (
    <Section id="contact" index="05" title="Get in touch">
      <ScrollText
        className="max-w-2xl text-2xl leading-snug text-balance text-fg md:text-[2rem] md:leading-[1.25]"
        segments={[
          {
            text: "I’m always open to new opportunities to grow in UI/UX design, computer vision, and machine learning. ",
          },
          { text: "Feel free to reach out.", className: "text-muted" },
        ]}
      />
      <Reveal delay={0.1}>
        <LocalTime className="mt-6" />
      </Reveal>
      <ContactList />
    </Section>
  );
}
