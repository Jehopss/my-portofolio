import Section from "./Section";

export default function About() {
  return (
    <Section id="about" title="About me">
      <p className="text-2xl leading-snug text-balance text-fg md:text-[2rem] md:leading-[1.25]">
        Hi, I’m Jonathan! Currently a 7th-semester Computer Science student enrolled in the
        Master Track Program at <span className="text-accent">BINUS University</span>.
      </p>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
        My primary interests lie at the intersection of human-computer interaction and
        intelligent systems. I am passionate about{" "}
        <strong className="font-medium text-fg">UI/UX Design, Computer Vision</strong> and{" "}
        <strong className="font-medium text-fg">Machine Learning</strong>, and I am actively
        seeking opportunities to grow in these fields.
      </p>
    </Section>
  );
}
