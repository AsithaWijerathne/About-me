import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Layout,
  Server,
  Terminal,
  Cpu,
  MapPin,
  Phone,
  User,
  Smartphone,
} from "lucide-react";
import "./App.css";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            AMW.
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-32">
        {/* HERO SECTION */}
        <section
          id="home"
          className="grid md:grid-cols-2 gap-12 items-center min-h-[60vh]"
        >
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
              Software Engineering Undergraduate
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Code. Create. <br />
              <span className="text-slate-500">Innovate.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              I am Asitha Wijerathne, a Software Engineering Undergraduate. I
              bridge the gap between web and mobile, crafting responsive React
              applications and native Android solutions that solve real-world
              problems.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg font-medium transition-all"
              >
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 text-slate-500 pt-4">
              {/* GitHub */}
              <a
                href="https://github.com/AsithaWijerathne"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Github />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Linkedin />
              </a>

              {/* Email */}
              <a
                href="mailto:your.email@example.com"
                className="hover:text-white transition-colors"
              >
                <Mail />
              </a>
            </div>
          </div>

          {/* Profile Image Card */}
          <div className="relative group flex justify-center md:justify-end">
            <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 rounded-full"></div>
            <div className="relative w-72 h-72 md:w-96 md:h-96 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500">
              {/* Replace icon with: <img src="/your-photo.jpg" className="w-full h-full object-cover" /> */}
              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <img
                  src="/src/assets/profile.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section>
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <Terminal size={20} className="text-blue-500" /> Technical Arsenal
          </h2>

          {/* Updated grid to fit 5 items (2 cols on mobile, 3 on tablet, 5 on desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                icon: <Code2 />,
                name: "Frontend",
                desc: "HTML, CSS, React, Tailwind, Vite",
              },
              {
                icon: <Smartphone />,
                name: "Mobile App",
                desc: "Java, Android Studio",
              }, // <--- New Java/Android Card
              { icon: <Server />, name: "Backend", desc: "Node.js, Express" },
              { icon: <Database />, name: "Database", desc: "SQL" },
              { icon: <Layout />, name: "Design", desc: "Figma, UI/UX" },
            ].map((tech, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
              >
                <div className="text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className="font-bold text-slate-200">{tech.name}</h3>
                <p className="text-sm text-slate-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION - ZIG-ZAG STYLE */}
        <section id="projects">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
          </div>

          <div className="space-y-24">
            {/* Project 1: StudyMate (Image Left, Text Right) */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Image Area */}
              <div className="md:col-span-7 relative group">
                <div className="absolute inset-0 bg-blue-600/20 rounded-xl transform rotate-3 group-hover:rotate-0 transition-all duration-300"></div>
                <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden aspect-video group-hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
                  {/* Replace with your actual screenshot later */}
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600 font-mono">
                    <img
                      src="/src/assets/studymate.png"
                      alt="StudyMate Screenshot"
                    />
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="md:col-span-5 flex flex-col items-start text-left">
                <span className="text-blue-500 font-mono text-sm mb-2">
                  Web Application
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  StudyMate
                </h3>
                <div className="bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm border border-slate-700/50 mb-6 shadow-xl">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    A collaborative platform designed to help students share
                    resources and study together. Features include real-time
                    chat, file sharing, and group scheduling.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["React", "Node.js", "Firebase DB", "Tailwind"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-slate-400"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <Github size={20} />{" "}
                    <span className="font-medium">Code</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink size={20} />{" "}
                    <span className="font-medium">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2: HospitalDB (Text Left, Image Right) */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Text Area (Ordered last on mobile, first on desktop) */}
              <div className="md:col-span-5 order-2 md:order-1 flex flex-col items-end text-right">
                <span className="text-blue-500 font-mono text-sm mb-2">
                  Database System
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  HospitalDB Manager
                </h3>
                <div className="bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm border border-slate-700/50 mb-6 shadow-xl relative z-10">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    A comprehensive management system for hospital records.
                    Handled complex data relationships, patient history, and
                    appointment scheduling using advanced SQL procedures.
                  </p>
                </div>

                <div className="flex flex-wrap justify-end gap-2 mb-8">
                  {["MySQL", "PHP", "Database Design", "R Language"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-slate-400"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <span className="font-medium">View Project</span>{" "}
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Image Area */}
              <div className="md:col-span-7 order-1 md:order-2 relative group">
                <div className="absolute inset-0 bg-teal-500/20 rounded-xl transform -rotate-3 group-hover:rotate-0 transition-all duration-300"></div>
                <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden aspect-video group-hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600 font-mono">
                    Database Diagram / UI
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3: Android App (Image Left, Text Right) */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 relative group">
                <div className="absolute inset-0 bg-purple-600/20 rounded-xl transform rotate-3 group-hover:rotate-0 transition-all duration-300"></div>
                <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden aspect-video group-hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600 font-mono">
                    App Screenshot
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col items-start text-left">
                <span className="text-blue-500 font-mono text-sm mb-2">
                  Mobile Application
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Zoom Scheduler
                </h3>
                <div className="bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm border border-slate-700/50 mb-6 shadow-xl">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    An Android application that automates meeting scheduling.
                    Integrates with Zoom and Google Meet APIs to create and
                    share meeting links instantly.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Java", "Android Studio", "Zoom API", "Firebase"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-slate-400"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <Github size={20} />{" "}
                    <span className="font-medium">Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & EDUCATION GRID */}
        <section id="about" className="grid md:grid-cols-3 gap-8">
          {/* About Card */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
            <div className="prose prose-invert text-slate-400">
              <p className="mb-4">
                I am a Software Engineering Undergraduate at the Open University
                of Sri Lanka. My journey in tech is driven by a curiosity to
                understand how things work under the hood.
              </p>
              <p className="mb-4">
                I pride myself on my <strong>adaptability</strong> and{" "}
                <strong>rapid learning</strong> capabilities. Whether it's
                learning a new framework or debugging complex issues, I enjoy
                the challenge.
              </p>
              <p>
                Beyond coding, I am an active member of the BSE Brotherhood,
                focusing on leadership and community building within the tech
                space.
              </p>
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Cpu size={20} className="text-blue-500" /> Education
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:w-0.5 before:bg-slate-800">
              {/* Item 1 */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500"></div>
                <h3 className="text-slate-200 font-bold">BSE (Reading)</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Open University of SL
                </p>
                <span className="text-xs text-blue-400 mt-1 block">
                  Present
                </span>
              </div>
              {/* Item 2 */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-600"></div>
                <h3 className="text-slate-200 font-bold">G.C.E A/L</h3>
                <p className="text-sm text-slate-500 mt-1">
                  St. Thomas' College
                </p>
                <span className="text-xs text-slate-500 mt-1 block">2022</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, my inbox is always open.
          </p>

          <div className="flex justify-center gap-8 mb-10">
            <div className="flex items-center gap-2 text-slate-400">
              <Mail size={18} className="text-blue-500" />
              <span>wijerathneasitha@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Phone size={18} className="text-blue-500" />
              <span>070 3937054</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin size={18} className="text-blue-500" />
              <span>Matale, LK</span>
            </div>
          </div>

          <a
            href="mailto:your@email.com"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all"
          >
            Say Hello
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-slate-600 text-sm">
        <p>© 2025 Asitha Wijerathne. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
};

export default App;
