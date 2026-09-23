import Expertise from "./Expertise";
import Section from "./Section";
import SkillGrid from "./SkillGrid";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      title="Skills & Expertise"
      intro="The tools I work with, and the areas I focus on."
      wide
    >
      <SkillGrid />
      <Expertise />
    </Section>
  );
}
