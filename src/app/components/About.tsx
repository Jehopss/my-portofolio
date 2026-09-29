import Frame from "./Frame";

const focus = [
  {
    name: "UI/UX Design",
    detail: "Interface designs in Figma for Serenity, DeepPlan, Finwise and NoFake.",
  },
  {
    name: "Computer Vision",
    detail: "Image processing with OpenCV. The portrait above runs grayscale, Sobel edges and Atkinson dithering live in your browser.",
  },
  {
    name: "Machine Learning",
    detail: "Models that predict construction estimates, spot fake news and classify court judgements.",
  },
];

export default function About() {
  return (
    <Frame id="about" name="About">
      <p className="max-w-4xl text-[clamp(1.75rem,3.8vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.025em] text-balance">
        My interests lie at the intersection of human–computer interaction and{" "}
        <span className="text-accent">intelligent systems.</span>
      </p>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
        <p className="max-w-md text-lg leading-relaxed text-pretty text-muted lg:col-span-5">
          Hi, I’m Jonathan! Currently a 7th-semester Computer Science student enrolled in the Master Track
          Program at <span className="text-ink">BINUS University</span>, and actively seeking opportunities to
          grow in these fields.
        </p>

        <dl className="border-t border-rule lg:col-span-7">
          {focus.map((item) => (
            <div key={item.name} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-lg font-medium">{item.name}</dt>
              <dd className="leading-relaxed text-pretty text-muted">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Frame>
  );
}
