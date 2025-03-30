import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Resume() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-10">
      {/* Header Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Niloy Chowdhury</h1>
            <p className="text-gray-600 text-lg">Full-Stack Developer</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" className="text-gray-600 hover:text-gray-900">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" className="text-blue-600 hover:text-blue-900">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="mailto:niloy@example.com" className="text-red-600 hover:text-red-900">
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-600 leading-relaxed">
          Passionate Full-Stack Developer with expertise in building scalable web applications using 
          <strong> Next.js, Tailwind CSS, Prisma, PostgreSQL</strong>. 
          Experienced in building SaaS platforms and deploying real-world applications.
        </p>
        <div className="mt-4">
          <p className="text-gray-600">📧 Email: <a href="mailto:niloy@example.com" className="text-blue-500">niloy@example.com</a></p>
          <p className="text-gray-600">📍 Location: Kolkata, India</p>
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">Software Developer Intern</h3>
            <p className="text-gray-600">Nomura Research Institute | June 2024 - Aug 2024</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2">
              <li>Developed RESTful APIs using <strong>Next.js</strong> and <strong>tRPC</strong>.</li>
              <li>Implemented authentication with <strong>Clerk</strong> and <strong>PostgreSQL</strong>.</li>
              <li>Optimized backend performance, reducing API latency by 30%.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold">Full-Stack Developer</h3>
            <p className="text-gray-600">Freelance | Jan 2023 - Present</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2">
              <li>Built multiple web applications using <strong>Next.js</strong>, <strong>Tailwind</strong>, and <strong>Prisma</strong>.</li>
              <li>Integrated <strong>Gemini API</strong> for AI-powered features.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Next.js", "Tailwind CSS", "PostgreSQL", "Prisma", "tRPC", "Vercel", "TypeScript"].map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">YouTube Clone (Veezio)</h3>
            <p className="text-gray-600">Built a YouTube-like video platform with secure authentication using Mux for video streaming.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Resume Builder SaaS</h3>
            <p className="text-gray-600">Developed an AI-powered resume builder using Gemini API and Next.js.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 text-sm">
        © {new Date().getFullYear()} Niloy Chowdhury. All Rights Reserved.
      </footer>
    </div>
  );
}
