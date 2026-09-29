import Section from "./Section";
import ProjectList from "./ProjectList";

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      intro="Selected work across interface design and machine learning."
    >
      <ProjectList />
    </Section>
  );
}
