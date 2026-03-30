import React, { useState, useEffect, useRef, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import emailjs from "@emailjs/browser";
import { createClient } from "@supabase/supabase-js";
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
  Smartphone,
  MessageSquare,
  Send,
  ChevronLeft, // <-- NEW IMPORT
  ChevronRight, // <-- NEW IMPORT
} from "lucide-react";
import "./App.css";

import studyMateImg from "./assets/studymate.jpg";
import budgetBuddyImg from "./assets/budgetbuddy.jpg";
import kineTownImg from "./assets/kinetown.jpg";
import profileImg from "./assets/profile.jpg";

const supabaseUrl = "https://szbxoirdmwxqdznjmpgv.supabase.co";
const supabaseKey = "sb_publishable_lv859lgCHwg4yhbsN9ZGLA_MCjUsjBR";
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);

  // States for Email Form
  const form = useRef();
  const [isEmailSent, setIsEmailSent] = useState(false);

  // States for Comment Section
  const [comments, setComments] = useState([]);
  const [commenterName, setCommenterName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  // --- NEW: PAGINATION STATES & LOGIC ---
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5; // Change this number to show more/less per page!

  // Calculate the comments to show on the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // --- MEMOIZED PARTICLES OPTIONS ---
  const particlesOptions = useMemo(
    () => ({
      background: { color: "#020617" },
      fullScreen: { enable: false },
      fpsLimit: 120,
      particles: {
        number: { value: 60, density: { enable: true } },
        color: { value: ["#3b82f6", "#a855f7", "#2dd4bf"] },
        shape: { type: "circle" },
        opacity: { value: 0.8 },
        size: { value: { min: 1, max: 3 } },
        links: {
          enable: true,
          distance: 150,
          color: "#475569",
          opacity: 0.5,
          width: 1,
        },
        move: { enable: true, speed: 1, outModes: "bounce" },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: "grab" } },
        modes: {
          grab: {
            distance: 150,
            links: { opacity: 0.8, color: "#3b82f6" },
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  // Initialize Particles and Fetch Comments
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });

    fetchComments();
  }, []);

  const fetchComments = async () => {
    setIsLoadingComments(true);

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
    } else if (data) {
      setComments(data);
    }

    setIsLoadingComments(false);
  };

  // --- EMAILJS FUNCTION ---
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_c7thxps",
        "template_i8m864k",
        form.current,
        "OFspSliyhM5teeKqf",
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsEmailSent(true);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        },
      );

    setTimeout(() => setIsEmailSent(false), 3000);
  };

  // --- COMMENT FUNCTION ---
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commenterName.trim() || !newComment.trim()) return;

    const newEntry = {
      name: commenterName,
      text: newComment,
      date: new Date().toISOString().split("T")[0],
    };

    const { data, error } = await supabase
      .from("comments")
      .insert([newEntry])
      .select();

    if (error) {
      console.error("Error saving comment:", error);
      alert("Failed to post comment. Check console for details.");
    } else if (data) {
      setComments([data[0], ...comments]);
      setCommenterName("");
      setNewComment("");
      setCurrentPage(1); // <-- NEW: Jump to page 1 to see the new comment!
    }
  };

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* BACKGROUND */}
      {particlesReady && (
        <Particles
          id="tsparticles"
          className="fixed inset-0 -z-10 w-full h-full"
          options={particlesOptions}
        />
      )}

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 z-50 relative">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            AMW<span className="animate-ping text-blue-400">_</span>
          </div>

          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            {["Home", "About", "Projects", "Guestbook", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>

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
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <div
          className={`md:hidden absolute w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-64 py-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            {["Home", "About", "Projects", "Guestbook", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-300 hover:text-blue-400 font-medium w-full text-center"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-32">
        {/* HERO */}
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

            <div className="flex gap-4 text-slate-500 pt-4">
              <a
                href="https://github.com/AsithaWijerathne"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/asitha-wijerathne-252b83253/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Linkedin />
              </a>
            </div>
          </div>

          <div className="relative group flex justify-center md:justify-end">
            <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 rounded-full"></div>
            <div className="relative w-72 h-72 md:w-96 md:h-96 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500">
              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <img
                  src={profileImg}
                  alt="Asitha Wijerathne"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
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
              },
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

        {/* PROJECTS SECTION */}
        <section id="projects">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
          </div>

          <div className="space-y-24">
            {/* Project 1: StudyMate */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 relative group">
                <div className="absolute inset-0 bg-blue-600/20 rounded-xl transform rotate-3 group-hover:rotate-0 transition-all duration-300"></div>
                <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden aspect-video group-hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600 font-mono">
                    <img src={studyMateImg} alt="StudyMate Screenshot" />
                  </div>
                </div>
              </div>
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
                    ),
                  )}
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Dum1du/StudyMate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <Github size={20} />{" "}
                    <span className="font-medium">Code</span>
                  </a>
                  {/* <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink size={20} />{" "}
                    <span className="font-medium">Live Demo</span>
                  </a> */}
                </div>
              </div>
            </div>

            {/* Project 4: KineTown (Text Left, Image Right) */}
            <div className="grid md:grid-cols-12 gap-8 items-center mt-24">
              <div className="md:col-span-5 order-2 md:order-1 flex flex-col items-end text-right">
                <span className="text-blue-500 font-mono text-sm mb-2">
                  Group Project • Web Application
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">KineTown</h3>
                <div className="bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm border border-slate-700/50 mb-6 shadow-xl relative z-10">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    A collaborative web platform dedicated to providing Sinhala
                    subtitles for movies. The system automatically fetches
                    subtitles from the web, translates them into Sinhala on the
                    fly, or serves existing native Sinhala subtitles directly to
                    the user for a seamless viewing experience.
                  </p>
                </div>
                <div className="flex flex-wrap justify-end gap-2 mb-8">
                  {[
                    "React",
                    "Node.js",
                    "API Integration",
                    "Translation Processing",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  {/* Remember to add your actual GitHub link here later! */}
                  <a
                    href="https://github.com/Dum1du/kinetown"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <span className="font-medium">Source Code</span>{" "}
                    <Github size={20} />
                  </a>
                  <a
                    href="https://kinetown.pages.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <span className="font-medium">Live Demo</span>{" "}
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="md:col-span-7 order-1 md:order-2 relative group">
                {/* Indigo accent color for this specific project */}
                <div className="absolute inset-0 bg-indigo-500/20 rounded-xl transform -rotate-3 group-hover:rotate-0 transition-all duration-300"></div>
                <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden aspect-video group-hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
                  {/* Replace this div with an actual <img> tag when you have the KineTown screenshot! */}
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600 font-mono">
                    <img src={kineTownImg} alt="KineTown Screenshot" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3: BudgetBuddy */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 relative group">
                <div className="absolute inset-0 bg-purple-600/20 rounded-xl transform rotate-3 group-hover:rotate-0 transition-all duration-300"></div>
                <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden aspect-video group-hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
                  <img
                    src={budgetBuddyImg}
                    alt="BudgetBuddy Screenshot"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col items-start text-left">
                <span className="text-blue-500 font-mono text-sm mb-2">
                  Android Application
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  BudgetBuddy
                </h3>
                <div className="bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm border border-slate-700/50 mb-6 shadow-xl">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    An offline-first personal finance tracker built to manage
                    daily incomes, expenses, and custom bank accounts. Features
                    robust local data storage, dynamic monthly filtering, and
                    full CRUD capabilities for seamless financial tracking.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    "Java",
                    "Android SDK",
                    "Room Database",
                    "Material Design",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  <a
                    href="https://github.com/AsithaWijerathne/BudgetBuddy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <Github size={20} />{" "}
                    <span className="font-medium">Source Code</span>
                  </a>
                  <a
                    href="https://github.com/AsithaWijerathne/BudgetBuddy/releases/tag/v1.0.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink size={20} />{" "}
                    <span className="font-medium">Download APK</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & EDUCATION GRID */}
        <section id="about" className="grid md:grid-cols-3 gap-8">
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
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Cpu size={20} className="text-blue-500" /> Education
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:w-0.5 before:bg-slate-800">
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
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-600"></div>
                <h3 className="text-slate-200 font-bold">G.C.E A/L</h3>
                <p className="text-sm text-slate-500 mt-1">
                  St. Thomas' College
                </p>
                <span className="text-xs text-slate-500 mt-1 block">2021</span>
              </div>
            </div>
          </div>
        </section>

        {/* COMMENT SECTION */}
        <section id="guestbook" className="max-w-3xl mx-auto py-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <MessageSquare className="text-blue-500" /> Guestbook
            </h2>
            <p className="text-slate-400">
              Leave a comment, feedback, or just say hi!
            </p>
          </div>

          <form
            onSubmit={handleAddComment}
            className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-8 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
                required
                className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <textarea
                placeholder="Write your message..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
                rows="3"
                className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              ></textarea>
              <button
                type="submit"
                className="self-end bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center gap-2"
              >
                Post <Send size={16} />
              </button>
            </div>
          </form>

          {/* UPDATED: Dynamic Loading, Empty States & Pagination! */}
          <div className="space-y-4">
            {isLoadingComments ? (
              <div className="text-center py-10 text-slate-400 bg-slate-900/20 rounded-xl border border-dashed border-slate-700">
                <div className="animate-pulse flex flex-col items-center gap-3">
                  <MessageSquare className="text-blue-500/50" size={28} />
                  <span className="font-medium tracking-wide">
                    Loading comments...
                  </span>
                </div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-10 text-slate-500 bg-slate-900/20 rounded-xl border border-dashed border-slate-700">
                <p>No comments yet. Be the first to say hi!</p>
              </div>
            ) : (
              <>
                {/* Render ONLY the comments for the current page */}
                {currentComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-slate-900/30 p-5 rounded-xl border border-slate-800/50 transition-all hover:bg-slate-900/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-slate-200">
                        {comment.name}
                      </span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-950 px-2 py-1 rounded-md">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))}

                {/* Pagination Controls - Only show if there is more than 1 page */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center pt-6 mt-4 border-t border-slate-800/50">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>

                    <span className="text-slate-400 text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Let's Connect
            </h2>
            <p className="text-slate-400 mb-8">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, send me a message!
            </p>

            <div className="flex justify-center gap-8 mb-10 text-sm md:text-base">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail size={18} className="text-blue-500" />{" "}
                <span>wijerathneasitha@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone size={18} className="text-blue-500" />{" "}
                <span>070 3937054</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={18} className="text-blue-500" />{" "}
                <span>Matale, LK</span>
              </div>
            </div>
          </div>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2"
              >
                {isEmailSent ? "Message Sent!" : "Send Message"}{" "}
                <Send size={18} />
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-900 py-8 text-center text-slate-600 text-sm">
        <p>
          ©{new Date().getFullYear()} Asitha Wijerathne. Built with React &
          Tailwind.
        </p>
      </footer>
    </div>
  );
};

export default App;
