import Image from "next/image";

export default function AboutCard() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto bg-slate-700 p-8 rounded-2xl shadow-lg text-white gap-6">
      {/* Left side: Info */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">About Me!</h2>
        <p className="text-lg font-mono mb-4">
          Hi, my name is Jonathan Hopi Pranata
        </p>

        <p className="mb-2">
          I'm a BINUS University Student majoring in Computer Science Master
          Track Program.
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span>{" "}
          jonathan.pranata@binus.ac.id
        </p>

        <button className="mt-4 px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full shadow-md transition">
          Contact Me
        </button>
      </div>

      <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md">
        <Image
          src="/me.jpg"
          alt="Jonathan Hopi"
          width={200}
          height={200}
          className="rounded-lg object-cover"
        />
        <p className="mt-2 text-sm text-gray-700 font-mono">Jonathan Hopi</p>
      </div>
    </div>
  );
}
