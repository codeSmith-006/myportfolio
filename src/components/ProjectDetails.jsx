import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, Globe, TrendingUp, Zap } from "lucide-react";

const ProjectDetails = ({ project, onBack }) => {
  const images = useMemo(() => {
    if (!project?.image) return [];
    return Array.isArray(project.image) ? project.image : [project.image];
  }, [project]);

  const [activeImage, setActiveImage] = useState(0);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.35 }}
      className="w-full border border-white/20 overflow-hidden"
    >
      <div className="border-b border-white/10 px-6 sm:px-10 py-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/35 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </button>
      </div>

      <div className="px-6 sm:px-10 py-8 space-y-8">
        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-8">
          <div className="space-y-4">
            <div className="rounded-md overflow-hidden border border-white/10 bg-white/[0.02]">
              {images[activeImage] ? (
                <img
                  src={images[activeImage]}
                  alt={`${project.title} screenshot ${activeImage + 1}`}
                  className="w-full h-[220px] sm:h-[340px] object-cover"
                />
              ) : (
                <div className="h-[220px] sm:h-[340px] flex items-center justify-center text-white/45">
                  No preview
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={`${project.id}-img-${index}`}
                    onClick={() => setActiveImage(index)}
                    className={`rounded-md overflow-hidden border transition-colors ${activeImage === index ? "border-[#B7FD5B]" : "border-white/10 hover:border-white/25"}`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className="w-full h-16 sm:h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="rounded-md border border-white/10 bg-white/[0.02] p-5">
              <h3 className="text-sm tracking-[0.2em] uppercase text-white/45 mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.tech || []).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.02] p-5">
              <h3 className="text-sm tracking-[0.2em] uppercase text-white/45 mb-4">
                Links
              </h3>
              <div className="space-y-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-main px-4 py-2.5 text-black text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-white/85 text-sm hover:border-white/40 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-md border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
            <p className="text-white/70 leading-relaxed">{project.description}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="rounded-md border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-xl font-semibold mb-4 inline-flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#B7FD5B]" />
                Challenges Faced
              </h3>
              <ul className="space-y-3">
                {(project.challenges || []).map((item, i) => (
                  <li key={`${project.id}-challenge-${i}`} className="text-white/70 leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-xl font-semibold mb-4 inline-flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#B7FD5B]" />
                Future Improvements
              </h3>
              <ul className="space-y-3">
                {(project.improvements || []).map((item, i) => (
                  <li key={`${project.id}-improvement-${i}`} className="text-white/70 leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 sm:px-10 py-5">
        <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.15em] uppercase text-white/40">
          <span className="inline-flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Project Details
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
