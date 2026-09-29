import ContactList from "./ContactList";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" title="Get in touch">
      <p className="max-w-2xl text-2xl leading-snug text-balance text-fg md:text-[2rem] md:leading-[1.25]">
        I’m always open to new opportunities to grow in UI/UX design, computer vision, and
        machine learning. <span className="text-muted">Feel free to reach out.</span>
      </p>
      <ContactList />
    </Section>
  );
}
