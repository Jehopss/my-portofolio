export default function ProjectCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 bg-white/10 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform"
    >
      <h2 className="text-2xl font-bold text-indigo-300">{title}</h2>
      <p className="mt-2 text-gray-200">{description}</p>
    </a>
  );
}
