import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

import img0 from "@/assets/images/media__1784656361650.jpg";
import img1 from "@/assets/images/media__1784656361727.jpg";
import img2 from "@/assets/images/media__1784715090182.jpg";
import img3 from "@/assets/images/media__1784656361710.jpg";
import img4 from "@/assets/images/media__1784656361756.jpg";
import img5 from "@/assets/images/media__1784656361749.jpg";
import img6 from "@/assets/images/media__1784714996531.jpg";
import img7 from "@/assets/images/media__1784715008733.jpg";
import img8 from "@/assets/images/media__1784714846088.jpg";
import img9 from "@/assets/images/media__1784714823405.jpg";
import img11 from "@/assets/images/media__1784715090213.jpg";
import img12 from "@/assets/images/media__1784714990095.jpg";
import img13 from "@/assets/images/media__1784713116634.jpg";
import img14 from "@/assets/images/media__1784715090264.jpg";
import img15 from "@/assets/images/media__1784653941666.jpg";
import img16 from "@/assets/images/media__1784713088013.jpg";
import img17 from "@/assets/images/media__1784713093804.jpg";
import img18 from "@/assets/images/media__1784715194456.jpg";
import img19 from "@/assets/images/media__1784715194529.jpg";
import img20 from "@/assets/images/media__1784715293269.jpg";
import img21 from "@/assets/images/media__1784653914396.png";
import img22 from "@/assets/images/media__1784713101044.png";
import img24 from "@/assets/images/media__1784713108910.png";
import img25 from "@/assets/images/media__1784714980559.png";
import img26 from "@/assets/images/media__1784715304886.jpg";
import img27 from "@/assets/images/media__1784653920827.png";
import img29 from "@/assets/images/media__1784715404125.jpg";
import img30 from "@/assets/images/media__1784715408011.jpg";
import img31 from "@/assets/images/media__1784715413724.jpg";

type Category = "All" | "Living Room" | "Bedroom" | "Kitchen" | "Dining" | "Bathroom" | "Office" | "Commercial" | "Residential" | "TV Unit" | "Wardrobe" | "Modular Kitchen" | "Kids Bedroom" | "Guest Bedroom" | "Master Bedroom" | "Pooja Room" | "Entrance/Foyer" | "Balcony" | "Clinic/Healthcare";

interface Project {
  id: number;
  title: string;
  category: Category;
  location: string;
  description: string;
  img: string;
}

const CATEGORIES: Category[] = ["All", "Living Room", "Bedroom", "Kitchen", "Dining", "Bathroom", "Office", "Commercial", "Residential", "TV Unit", "Wardrobe", "Modular Kitchen", "Kids Bedroom", "Guest Bedroom", "Master Bedroom", "Pooja Room", "Entrance/Foyer", "Balcony", "Clinic/Healthcare"];

const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 0,
    title: "Minimalist Harmony",
    category: "Living Room",
    location: "Studio Ionic 9",
    description: "Premium luxury living room interior designed with meticulous attention to detail.",
    img: img0,
  },
  {
    id: 1,
    title: "Culinary Elegance",
    category: "Bedroom",
    location: "Studio Ionic 9",
    description: "Premium luxury bedroom interior designed with meticulous attention to detail.",
    img: img1,
  },
  {
    id: 2,
    title: "The Executive Suite",
    category: "Kitchen",
    location: "Studio Ionic 9",
    description: "Premium luxury kitchen interior designed with meticulous attention to detail.",
    img: img2,
  },
  {
    id: 3,
    title: "Urban Retreat",
    category: "Dining",
    location: "Studio Ionic 9",
    description: "Premium luxury dining interior designed with meticulous attention to detail.",
    img: img3,
  },
  {
    id: 4,
    title: "Symphony Dining",
    category: "Bathroom",
    location: "Studio Ionic 9",
    description: "Premium luxury bathroom interior designed with meticulous attention to detail.",
    img: img4,
  },
  {
    id: 5,
    title: "Heritage Villa",
    category: "Office",
    location: "Studio Ionic 9",
    description: "Premium luxury office interior designed with meticulous attention to detail.",
    img: img5,
  },
  {
    id: 6,
    title: "Nexus Boutique",
    category: "Commercial",
    location: "Studio Ionic 9",
    description: "Premium luxury commercial interior designed with meticulous attention to detail.",
    img: img6,
  },
  {
    id: 7,
    title: "Luminous Lounge",
    category: "Residential",
    location: "Studio Ionic 9",
    description: "Premium luxury residential interior designed with meticulous attention to detail.",
    img: img7,
  },
  {
    id: 8,
    title: "Serene Sanctuary",
    category: "TV Unit",
    location: "Studio Ionic 9",
    description: "Premium luxury tv unit interior designed with meticulous attention to detail.",
    img: img8,
  },
  {
    id: 9,
    title: "Modern Edge",
    category: "Wardrobe",
    location: "Studio Ionic 9",
    description: "Premium luxury wardrobe interior designed with meticulous attention to detail.",
    img: img9,
  },
  {
    id: 11,
    title: "Nordic Haven",
    category: "Kids Bedroom",
    location: "Studio Ionic 9",
    description: "Premium luxury kids bedroom interior designed with meticulous attention to detail.",
    img: img11,
  },
  {
    id: 12,
    title: "Zen Space",
    category: "Guest Bedroom",
    location: "Studio Ionic 9",
    description: "Premium luxury guest bedroom interior designed with meticulous attention to detail.",
    img: img12,
  },
  {
    id: 13,
    title: "Opulent Grandeur",
    category: "Master Bedroom",
    location: "Studio Ionic 9",
    description: "Premium luxury master bedroom interior designed with meticulous attention to detail.",
    img: img13,
  },
  {
    id: 14,
    title: "Industrial Loft",
    category: "Pooja Room",
    location: "Studio Ionic 9",
    description: "Premium luxury pooja room interior designed with meticulous attention to detail.",
    img: img14,
  },
  {
    id: 15,
    title: "Bohemian Rhapsody",
    category: "Entrance/Foyer",
    location: "Studio Ionic 9",
    description: "Premium luxury entrance/foyer interior designed with meticulous attention to detail.",
    img: img15,
  },
  {
    id: 16,
    title: "Contemporary Chic",
    category: "Balcony",
    location: "Studio Ionic 9",
    description: "Premium luxury balcony interior designed with meticulous attention to detail.",
    img: img16,
  },
  {
    id: 17,
    title: "Vintage Charm",
    category: "Clinic/Healthcare",
    location: "Studio Ionic 9",
    description: "Premium luxury clinic/healthcare interior designed with meticulous attention to detail.",
    img: img17,
  },
  {
    id: 18,
    title: "Art Deco Delight",
    category: "Living Room",
    location: "Studio Ionic 9",
    description: "Premium luxury living room interior designed with meticulous attention to detail.",
    img: img18,
  },
  {
    id: 19,
    title: "Rustic Elegance",
    category: "Bedroom",
    location: "Studio Ionic 9",
    description: "Premium luxury bedroom interior designed with meticulous attention to detail.",
    img: img19,
  },
  {
    id: 20,
    title: "Coastal Breeze",
    category: "Kitchen",
    location: "Studio Ionic 9",
    description: "Premium luxury kitchen interior designed with meticulous attention to detail.",
    img: img20,
  },
  {
    id: 21,
    title: "Mid-Century Modern",
    category: "Dining",
    location: "Studio Ionic 9",
    description: "Premium luxury dining interior designed with meticulous attention to detail.",
    img: img21,
  },
  {
    id: 22,
    title: "Eclectic Mix",
    category: "Bathroom",
    location: "Studio Ionic 9",
    description: "Premium luxury bathroom interior designed with meticulous attention to detail.",
    img: img22,
  },
  {
    id: 24,
    title: "Tranquil Oasis",
    category: "Commercial",
    location: "Studio Ionic 9",
    description: "Premium luxury commercial interior designed with meticulous attention to detail.",
    img: img24,
  },
  {
    id: 25,
    title: "Sophisticated Style",
    category: "Residential",
    location: "Studio Ionic 9",
    description: "Premium luxury residential interior designed with meticulous attention to detail.",
    img: img25,
  },
  {
    id: 26,
    title: "Playful Palette",
    category: "TV Unit",
    location: "Studio Ionic 9",
    description: "Premium luxury tv unit interior designed with meticulous attention to detail.",
    img: img26,
  },
  {
    id: 27,
    title: "Earthy Tones",
    category: "Wardrobe",
    location: "Studio Ionic 9",
    description: "Premium luxury wardrobe interior designed with meticulous attention to detail.",
    img: img27,
  },
  {
    id: 29,
    title: "Cozy Corner",
    category: "Kids Bedroom",
    location: "Studio Ionic 9",
    description: "Premium luxury kids bedroom interior designed with meticulous attention to detail.",
    img: img29,
  },
  {
    id: 30,
    title: "Vibrant Hues",
    category: "Guest Bedroom",
    location: "Studio Ionic 9",
    description: "Premium luxury guest bedroom interior designed with meticulous attention to detail.",
    img: img30,
  },
  {
    id: 31,
    title: "Monochrome Magic",
    category: "Master Bedroom",
    location: "Studio Ionic 9",
    description: "Premium luxury master bedroom interior designed with meticulous attention to detail.",
    img: img31,
  },
];

const Portfolio = () => {
  useReveal();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredProjects = PORTFOLIO_PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === "All" || p.category === activeCategory || (activeCategory === "Residential" && ["Living Room", "Bedroom", "Kitchen", "Dining", "Bathroom"].includes(p.category))
  );

  const [displayLimit, setDisplayLimit] = useState(20);

  const displayedProjects = filteredProjects.slice(0, displayLimit);

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
            {displayedProjects.map((project, idx) => (
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

        {displayLimit < filteredProjects.length && (
          <div className="flex justify-center mt-12 reveal">
            <button 
              onClick={() => setDisplayLimit(l => l + 20)} 
              className="px-8 py-3 text-xs tracking-[0.2em] uppercase border border-charcoal/20 text-charcoal hover:bg-gold hover:border-gold hover:text-white transition-all duration-300 rounded-full"
            >
              Load More
            </button>
          </div>
        )}
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
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default Portfolio;
