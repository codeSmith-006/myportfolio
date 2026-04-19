/**
 * Projects.jsx
 * 
 * Projects section with 3D depth card reveals.
 * 
 * Animation Architecture:
 * - Section header: scroll-triggered depth entrance
 * - Project cards: staggered entrance with Z-axis + scale
 * - Each card has 3D tilt on hover
 * - Cards drift at different parallax rates
 * - Grid view and detail view transitions preserved
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import ProjectDetails from './ProjectDetails';
import use3DTilt from '../hooks/use3DTilt';

gsap.registerPlugin(ScrollTrigger);

const fallbackProjects = [
  {
    id: 1,
    title: 'Medical Camp Management System (MCMS)',
    description:
      'Developed a MERN stack platform to streamline the organization and participation of medical camps. The system allows organizers to create and manage camps, track participant registrations, confirm payments, and view feedback. Participants can browse available camps, register through a secure modal form, complete payments via Stripe, and access personalized dashboards with analytics. The app is responsive across devices, uses JWT for authentication, and leverages TanStack Query for efficient data fetching. A key focus was delivering a smooth user experience with real-time participant counts, search/sort functionality, and clear role-based dashboards.',
    image: [
      'https://i.ibb.co.com/mCmKrXMN/image.png',
      'https://i.ibb.co.com/d0pcP2cP/image.png',
      'https://i.ibb.co.com/zTd79cCX/Screenshot-From-2025-08-11-18-33-02.png',
      'https://i.ibb.co.com/sdWc6Wds/Screenshot-From-2025-08-11-18-32-54.png',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Tailwind CSS', 'TanStack Query', 'JWT'],
    github: 'https://github.com/codeSmith-006/medicamp-client',
    live: 'https://carecamp-06.web.app/',
    featured: true,
    challenges: [
      'Implementing secure Stripe payment integration with proper status updates for both organizers and participants.',
      'Designing a database structure to handle multiple user roles, camp data, registrations, and feedback efficiently.',
      'Ensuring participants remain logged in on private routes even after page reloads using JWT token persistence.',
      'Managing multiple dashboard routes with role-based access control and maintaining a responsive design for all devices.',
    ],
    improvements: [
      'Add AI-powered health tips and camp recommendations based on user profile and past participation.',
      'Enable real-time notifications for organizers when new participants register or payments are confirmed.',
      'Integrate volunteer and appointment scheduling features to expand the scope beyond current camp management.',
    ],
  },
  {
    id: 2,
    title: 'TazneenFood (C)',
    description:
      'TazneenFood is a full-stack eCommerce web application built entirely with Next.js using the App Router architecture. The platform provides a modern online shopping experience for food products with fast performance, secure authentication, and a fully functional admin dashboard. It leverages Next.js features such as Server Components, Server Actions, API Route Handlers, dynamic routing, and optimized data fetching. The system includes product browsing, category filtering, order management, and a responsive UI built with Tailwind CSS and Radix UI components. An admin panel allows administrators to create, update, delete, and manage products and categories, as well as track and update order statuses. The application also integrates authentication with NextAuth, MongoDB database management with Mongoose, rate limiting using Upstash Redis, and analytics through Vercel Analytics. The focus of the project was building a scalable, SEO-friendly, and high-performance eCommerce platform with a clean admin workflow and smooth user experience across devices.',
    image: [
      'https://i.ibb.co.com/VW1H8t9v/Screenshot-from-2026-03-05-23-48-09.png',
      'https://i.ibb.co.com/7d57WBJC/Screenshot-from-2026-03-05-23-48-33.png',
      'https://i.ibb.co.com/fVLD7xfs/Screenshot-from-2026-03-05-23-48-54.png',
      'https://i.ibb.co.com/QjHPShyQ/Screenshot-from-2026-03-05-23-49-01.png',
      'https://i.ibb.co.com/DfQQq4MM/Screenshot-from-2026-03-05-23-49-06.png',
      'https://i.ibb.co.com/rf2R6TR4/Screenshot-from-2026-03-05-23-49-29.png',
    ],
    tech: ['Next.js', 'React', 'MongoDB', 'Mongoose', 'NextAuth', 'Tailwind CSS', 'Radix UI', 'Framer Motion', 'TanStack Query', 'Upstash Redis', 'Vercel Analytics'],
    github: '',
    live: 'https://tazneenfood.com/',
    featured: true,
    challenges: [
      'Handling Next.js Server Actions with proper validation and error handling while interacting with MongoDB.',
      'Managing authentication flows and protected admin routes using NextAuth in the App Router architecture.',
      'Designing a scalable product and category schema in MongoDB to support filtering, updates, and admin management.',
      'Ensuring smooth synchronization between client state and server mutations when creating, updating, or deleting products.',
      'Optimizing page performance and avoiding unnecessary client components while working with server components.',
    ],
    improvements: [
      'Add a real-time order notification system for admins using WebSockets.',
      'Implement advanced product search with filters such as price range, rating, and popularity.',
      'Introduce a recommendation system based on user purchase history.',
      'Add customer accounts with order tracking and order history dashboards.',
      'Integrate payment gateways and coupon/discount management system.',
    ],
  },
  {
    id: 3,
    title: 'Saiyara Overseas (C)',
    description:
      'Saiyara Overseas is a full-featured web application built for a travel and visa agency to manage visa processing and airline ticket services. The platform provides a structured system for handling visa and ticket applications while maintaining role-based access from Super Admin to regular users. The core of the application is a powerful admin dashboard that allows administrators to manage visa applications, flight ticket requests, and user accounts efficiently. The system includes application tracking, document management, user management, and status updates for each request. The interface is designed with modern UI components and responsive layouts to ensure smooth usage across devices. Additional features such as QR code generation, PDF export for documents, analytics dashboards, and interactive charts help administrators monitor operations and manage client requests effectively.',
    image: [
      'https://i.ibb.co.com/pCTRZfy/Screenshot-from-2026-03-06-00-05-39.png',
      'https://i.ibb.co.com/84MN2yTW/Screenshot-from-2026-03-06-00-05-56.png',
      'https://i.ibb.co.com/S7QVJxjQ/Screenshot-from-2026-03-06-00-06-18.png',
      'https://i.ibb.co.com/YBxDthhc/Screenshot-from-2026-03-06-00-06-34.png',
      'https://i.ibb.co.com/3yG738gn/Screenshot-from-2026-03-06-00-06-40.png',
      'https://i.ibb.co.com/F4mWTv8h/Screenshot-from-2026-03-06-00-06-44.png',
      'https://i.ibb.co.com/Fk0L9tD4/Screenshot-from-2026-03-06-00-06-50.png',
    ],
    tech: ['React', 'Vite', 'Firebase', 'React Router', 'Tailwind CSS', 'Ant Design', 'Radix UI', 'React Hook Form', 'TanStack Query', 'Axios', 'Framer Motion', 'Recharts', 'SweetAlert2', 'QR Code', 'jsPDF'],
    github: '',
    live: 'https://www.saiyaraoverseas.com/en',
    featured: true,
    challenges: [
      'Designing a role-based access control system to manage permissions between super admin, admin, and regular users.',
      'Handling complex visa and ticket application workflows while maintaining accurate status tracking.',
      'Managing form-heavy user interfaces with validation and file handling for visa applications.',
      'Ensuring real-time updates in the admin dashboard when applications are submitted or updated.',
      'Optimizing dashboard performance when displaying large datasets such as applications and user records.',
    ],
    improvements: [
      'Introduce automated email and SMS notifications for users when application statuses change.',
      'Add document verification workflows with approval and rejection logs for visa processing.',
      'Implement advanced analytics for tracking application success rates and operational insights.',
      'Create a customer portal where applicants can track their visa or ticket request progress in real time.',
      'Integrate payment gateways for visa processing fees and ticket booking payments.',
    ],
  },
];

const normalizeProject = (project) => ({
  ...project,
  image: Array.isArray(project.image) ? project.image : [project.image].filter(Boolean),
  tech: Array.isArray(project.tech) ? project.tech : [],
  challenges: Array.isArray(project.challenges) ? project.challenges : [],
  improvements: Array.isArray(project.improvements) ? project.improvements : [],
});

// Individual project card with 3D tilt
const ProjectCard = ({ project, index, onViewDetails }) => {
  const cover = Array.isArray(project.image) ? project.image[0] : project.image;
  const tilt = use3DTilt({ maxTilt: 4, scale: 1.02, speed: 350 });
  const cardRef = useRef(null);

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        tilt.ref.current = el;
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="group border border-white/10 bg-white/[0.02] overflow-hidden tilt-container project-card"
    >
      <div className="relative h-48 sm:h-52 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            loading="lazy"
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
          className="btn-3d w-full rounded-md bg-main px-4 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [projects] = useState(() => fallbackProjects.map(normalizeProject));
  const [selectedProject, setSelectedProject] = useState(null);
  const githubProjectsUrl = 'https://github.com/codeSmith-006?tab=repositories';

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Header depth entrance ──
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50, rotateX: 3 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Cards staggered depth entrance ──
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.92, rotateX: 3 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Scroll-linked parallax on grid ──
      gsap.to(gridRef.current, {
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="scene-section w-full px-4 sm:px-8 py-8">
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
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full border-b border-r border-white/20 overflow-hidden"
            style={{ minHeight: '80vh' }}
          >
            <div ref={headerRef} className="text-center px-6 pt-14 pb-10 border-white/10">
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '12px',
                }}
              >
                Selected Work
              </p>
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(2.2rem, 7vw, 5rem)',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  margin: '0 0 18px 0',
                }}
              >
                FEATURED{' '}
                <span className="main-color instrumental-font">PROJECTS</span>
              </h2>
              <p
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  maxWidth: '700px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                Real products I built with modern frontend and backend stacks, focusing
                on reliable architecture, smooth UX, and production-ready features.
              </p>
            </div>

            <div ref={gridRef} className="px-5 sm:px-8 py-8 sm:py-10">
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

              <a
                href={githubProjectsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d mx-auto mt-8 inline-flex items-center gap-2 rounded-md border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:border-[#B7FD5B]/60 hover:text-[#B7FD5B]"
                style={{ display: 'flex', width: 'fit-content' }}
              >
                <Github className="h-4 w-4" />
                All Projects
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
