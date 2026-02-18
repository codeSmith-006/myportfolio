import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import ProjectDetails from "./ProjectDetails";

const fallbackProjects = [
  {
    id: 1,
    title: "Medical Camp Management System (MCMS)",
    description:
      "Developed a MERN stack platform to streamline the organization and participation of medical camps. The system allows organizers to create and manage camps, track participant registrations, confirm payments, and view feedback. Participants can browse available camps, register through a secure modal form, complete payments via Stripe, and access personalized dashboards with analytics. The app is responsive across devices, uses JWT for authentication, and leverages TanStack Query for efficient data fetching. A key focus was delivering a smooth user experience with real-time participant counts, search/sort functionality, and clear role-based dashboards.",
    image: [
      "https://i.ibb.co.com/mCmKrXMN/image.png",
      "https://i.ibb.co.com/d0pcP2cP/image.png",
      "https://i.ibb.co.com/zTd79cCX/Screenshot-From-2025-08-11-18-33-02.png",
      "https://i.ibb.co.com/sdWc6Wds/Screenshot-From-2025-08-11-18-32-54.png",
    ],
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Stripe",
      "Tailwind CSS",
      "TanStack Query",
      "JWT",
    ],
    github: "https://github.com/codeSmith-006/medicamp-client",
    live: "https://carecamp-06.web.app/",
    featured: true,
    challenges: [
      "Implementing secure Stripe payment integration with proper status updates for both organizers and participants.",
      "Designing a database structure to handle multiple user roles, camp data, registrations, and feedback efficiently.",
      "Ensuring participants remain logged in on private routes even after page reloads using JWT token persistence.",
      "Managing multiple dashboard routes with role-based access control and maintaining a responsive design for all devices.",
    ],
    improvements: [
      "Add AI-powered health tips and camp recommendations based on user profile and past participation.",
      "Enable real-time notifications for organizers when new participants register or payments are confirmed.",
      "Integrate volunteer and appointment scheduling features to expand the scope beyond current camp management.",
    ],
  },
  {
    id: 2,
    title: "LostFinder - Lost & Found Platform",
    description:
      "Developed a full-stack Lost & Found management platform that connects people who have lost items with those who have found them. Built with a focus on smooth user experience, secure authentication, and organized data handling. Users can post lost or found items, view detailed item pages, update their listings, and mark items as recovered through a dedicated workflow. The system includes private routes for managing personal items, JWT authentication for security, and dynamic search to filter posts by title or location. A responsive design ensures the site works seamlessly on mobile, tablet, and desktop devices.",
    image: [
      "https://i.ibb.co.com/zhcxkkgY/Screenshot-From-2025-08-11-18-53-49.png",
      "https://i.ibb.co.com/MDVkjBQk/Screenshot-From-2025-08-11-18-54-18.png",
      "https://i.ibb.co.com/1tcgPwLc/Screenshot-From-2025-08-11-18-54-04.png",
      "https://i.ibb.co.com/rfkxqtLr/Screenshot-From-2025-08-11-18-54-32.png",
      "https://i.ibb.co.com/d47Wz21q/Screenshot-From-2025-08-11-18-54-43.png",
    ],
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Firebase Auth",
      "JWT",
      "Tailwind CSS",
      "Framer Motion",
    ],
    github: "https://github.com/codeSmith-006/Lostfinder-Client",
    live: "https://lostfinder-58605.web.app/",
    featured: true,
    challenges: [
      "Implementing secure JWT-based authentication to ensure private route protection without losing login state on reload.",
      "Designing an intuitive UI/UX for item posting, editing, and recovery workflows while keeping forms pre-filled with logged-in user data.",
      "Managing and displaying multiple data states (active, recovered) across different dashboard views with responsive layouts.",
      "Integrating search and filtering functionality for large datasets without degrading performance.",
    ],
    improvements: [
      "Add real-time notifications when a user’s lost item is marked as recovered by another user.",
      "Integrate image upload functionality instead of using only image URLs.",
      "Add location-based search and mapping features using Google Maps API.",
    ],
  },
  {
    id: 3,
    title: "Gardening Community & Resource Hub",
    description:
      "Built a full-stack platform for gardening enthusiasts to share tips, connect with local gardeners, and participate in gardening events. The app features secure authentication with Firebase, dynamic user profiles, a rich tip-sharing system with categories and difficulty filtering, and event sliders. Private routes allow users to share, update, and manage their gardening tips. The UI is fully responsive and includes dark/light mode toggle for user preference.",
    image: [
      "https://i.ibb.co.com/84KcWQcd/Screenshot-From-2025-08-11-19-01-36.png",
      "https://i.ibb.co.com/fd9wdgJb/Screenshot-From-2025-08-11-19-02-08.png",
      "https://i.ibb.co.com/3y2fDjL2/Screenshot-From-2025-08-11-19-02-40.png",
      "https://i.ibb.co.com/pv1TMqMp/Screenshot-From-2025-08-11-19-02-45.png",
      "https://i.ibb.co.com/wr09gRJ9/Screenshot-From-2025-08-11-19-02-59.png",
    ],
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Firebase Auth",
      "Tailwind CSS",
      "Framer Motion",
    ],
    github: "https://github.com/codeSmith-006/Florafy-Client",
    live: "https://assignment-604fb.web.app/",
    featured: true,
    challenges: [
      "Implementing a smooth and responsive slider showcasing gardening events.",
      "Creating a robust filtering system for browsing tips by difficulty level.",
      "Managing secure private routes for tip sharing, updating, and user profiles.",
      "Ensuring dark and light theme toggle works seamlessly across all pages.",
    ],
    improvements: [
      "Add a feature to like and comment on shared gardening tips.",
      "Integrate location-based gardener profiles and event suggestions.",
      "Implement calendar integration for gardening event reminders.",
    ],
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

const normalizeProject = (project) => ({
  ...project,
  image: Array.isArray(project.image) ? project.image : [project.image].filter(Boolean),
  tech: Array.isArray(project.tech) ? project.tech : [],
  challenges: Array.isArray(project.challenges) ? project.challenges : [],
  improvements: Array.isArray(project.improvements) ? project.improvements : [],
});

const ProjectCard = ({ project, index, onViewDetails }) => {
  const cover = Array.isArray(project.image) ? project.image[0] : project.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group border border-/10 bg-white/[0.02] overflow-hidden"
    >
      <div className="relative h-48 sm:h-52 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-white/45">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {project.featured && (
          <span className="absolute top-3 left-3 rounded-full border border-[#B7FD5B]/60 bg-[#B7FD5B]/20 px-3 py-1 text-[11px] font-semibold tracking-wide">
            Featured
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-3 leading-snug">{project.title}</h3>
        <p className="text-sm leading-relaxed text-white/65 line-clamp-3 mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/80"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/50">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-[#B7FD5B] transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-[#B7FD5B] transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          )}
        </div>

        <button
          onClick={() => onViewDetails(project)}
          className="w-full rounded-md bg-main px-4 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView();
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://portfolio-server-beta-six.vercel.app/feature-projects");
        if (!response.ok) throw new Error("Failed to load projects");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.map(normalizeProject));
        } else {
          setProjects(fallbackProjects);
        }
      } catch {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="w-full px-4 sm:px-8 py-8">
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetails
            key={selectedProject.id}
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        ) : (
          <motion.div
            key="projects-grid"
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="w-full border-b border-r border-white/20 overflow-hidden"
            style={{ minHeight: "80vh" }}
          >
            <div className="text-center px-6 pt-14 pb-10 border-b border-white/10">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.45 }}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "12px",
                }}
              >
                Selected Work
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.55 }}
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(2.2rem, 7vw, 5rem)",
                  lineHeight: 0.95,
                  textTransform: "uppercase",
                  margin: "0 0 18px 0",
                }}
              >
                FEATURED{" "}
                <span className="main-color instrumental-font">PROJECTS</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.55 }}
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                Real products I built with modern frontend and backend stacks, focusing
                on reliable architecture, smooth UX, and production-ready features.
              </motion.p>
            </div>

            <div className="px-5 sm:px-8 py-8 sm:py-10">
              {loading ? (
                <div className="text-center text-white/50 text-sm">Loading projects...</div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onViewDetails={setSelectedProject}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
