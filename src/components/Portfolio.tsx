import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

// Import project images
import img1 from "@/assets/images/media__1784713028328.png";
import img2 from "@/assets/images/media__1784713088013.jpg";
import img3 from "@/assets/images/media__1784713093804.jpg";
import img4 from "@/assets/images/media__1784713101044.png";
import img5 from "@/assets/images/media__1784713108910.png";
import img6 from "@/assets/images/media__1784713116634.jpg";
import img7 from "@/assets/images/media__1784656361650.jpg";
import img8 from "@/assets/images/media__1784656361710.jpg";
import img9 from "@/assets/images/media__1784656361727.jpg";

type Category = "All" | "Residential" | "Commercial" | "Living Room" | "Bedroom" | "Kitchen" | "Dining" | "Bathroom" | "Office";

interface Project {
  id: number;
  title: string;
  category: Category;
  location: string;
  description: string;
  img: string;
}

const CATEGORIES: Category[] = [
  "All", "Residential", "Commercial", "Living Room", "Bedroom", "Kitchen", "Dining", "Bathroom", "Office"
];

const PORTFOLIO_PROJECTS: Project[] = [

  {
    id: 2,
    title: "Minimalist Harmony",
    category: "Bedroom",
    location: "Pune",
    description: "Serene and uncluttered bedroom design focusing on natural light and warm textures.",
    img: img2,
  },
  {
    id: 3,
    title: "Culinary Elegance",
    category: "Kitchen",
    location: "Delhi",
    description: "A modular, state-of-the-art kitchen blending utility with high-end luxury aesthetics.",
    img: img3,
  },
  {
    id: 4,
    title: "The Executive Suite",
    category: "Office",
    location: "Bangalore",
    description: "A commanding yet inviting workspace designed for productivity and executive presence.",
    img: img4,
  },
  {
    id: 5,
    title: "Urban Retreat",
    category: "Bathroom",
    location: "Mumbai",
    description: "A spa-like sanctuary utilizing natural stone and ambient lighting for total relaxation.",
    img: img5,
  },
  {
    id: 6,
    title: "Symphony Dining",
    category: "Dining",
    location: "Goa",
    description: "An elegant dining space crafted for memorable gatherings and sophisticated entertaining.",
    img: img6,
  },
  {
    id: 7,
    title: "Heritage Villa",
    category: "Residential",
    location: "Jaipur",
    description: "A majestic residential project preserving historical charm with modern amenities.",
    img: img7,
  },
  {
    id: 8,
    title: "Nexus Boutique",
    category: "Commercial",
    location: "Hyderabad",
    description: "A premium commercial retail space designed to elevate the brand experience.",
    img: img8,
  },
  {
    id: 9,
    title: "Luminous Lounge",
    category: "Living Room",
    location: "Chennai",
    description: "An expansive, light-filled lounge featuring bespoke furniture and curated art.",
    img: img9,
  },
];

export function Portfolio() {
  useReveal();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredProjects = PORTFOLIO_PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === "All" || p.category === activeCategory || (activeCategory === "Residential" && ["Living Room", "Bedroom", "Kitchen", "Dining", "Bathroom"].includes(p.category))
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const showNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredProjects.length);
    }
  };
  
  const showPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredProjects.length]);

  return (
    <section id="portfolio" className="py-12 md:py-20 px-4 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-[10px] tracking-luxe uppercase text-gold">PORTFOLIO</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 leading-tight">
            Timeless Interiors <span className="italic">Crafted with Precision</span>
          </h2>
          <div className="h-px w-16 bg-gold mx-auto mt-6 mb-8" />
          <p className="max-w-2xl mx-auto text-foreground/70 text-sm md:text-base leading-relaxed">
            Discover a curated collection of residential and commercial spaces designed with elegance, functionality, and attention to every detail.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal" style={{ transitionDelay: "0.2s" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-charcoal text-warm-white border-charcoal"
                  : "bg-transparent text-charcoal border-charcoal/20 hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={project.id}
                className="group relative overflow-hidden rounded-xl shadow-sm cursor-pointer bg-warm-white h-[140px] sm:h-[150px] md:h-[160px] lg:h-[180px]"
                onClick={() => openLightbox(idx)}
              >
                <div className="relative overflow-hidden w-full h-full">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] group-hover:brightness-110"
                  />
                  
                  {/* Golden Border Animation */}
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/60 rounded-xl transition-all duration-700 pointer-events-none z-20 scale-[0.98] group-hover:scale-100" />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-warm-white/90 drop-shadow-sm mb-1 block">
                      {project.category}
                    </span>
                    <h3 className="font-display text-base md:text-lg text-gold mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <div className="inline-flex items-center gap-1 text-[9px] tracking-[0.2em] uppercase text-warm-white border-b border-gold/30 pb-0.5 group-hover:border-gold transition-colors mt-1">
                      View <ArrowUpRight size={10} className="text-gold" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Gallery */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 backdrop-blur-xl"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-warm-white/70 hover:text-gold transition-colors p-2"
              aria-label="Close"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 md:left-12 z-50 text-warm-white/50 hover:text-gold transition-colors p-2 bg-charcoal/20 rounded-full hover:bg-charcoal/50"
              aria-label="Previous"
            >
              <ChevronLeft size={48} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  showNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  showPrev();
                }
              }}
              className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-24 py-12"
              onClick={closeLightbox}
            >
              <img
                src={filteredProjects[lightboxIndex].img}
                alt={filteredProjects[lightboxIndex].title}
                className="max-h-[80vh] max-w-full object-contain shadow-2xl rounded-sm"
                onClick={(e) => e.stopPropagation()}
              />
              <div 
                className="mt-6 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-display text-2xl text-warm-white mb-1">
                  {filteredProjects[lightboxIndex].title}
                </h3>
                <p className="text-[10px] tracking-luxe uppercase text-gold">
                  {filteredProjects[lightboxIndex].category} {filteredProjects[lightboxIndex].location && `• ${filteredProjects[lightboxIndex].location}`}
                </p>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 md:right-12 z-50 text-warm-white/50 hover:text-gold transition-colors p-2 bg-charcoal/20 rounded-full hover:bg-charcoal/50"
              aria-label="Next"
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
