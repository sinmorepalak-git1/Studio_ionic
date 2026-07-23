const fs = require('fs');

const portfolioCode = `import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { TextReveal } from "./TextReveal";

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
  { id: 0, title: "Minimalist Harmony", category: "Living Room", location: "Studio Ionic 9", description: "Premium luxury living room interior designed with meticulous attention to detail.", img: img0 },
  { id: 1, title: "Culinary Elegance", category: "Bedroom", location: "Studio Ionic 9", description: "Premium luxury bedroom interior designed with meticulous attention to detail.", img: img1 },
  { id: 2, title: "The Executive Suite", category: "Kitchen", location: "Studio Ionic 9", description: "Premium luxury kitchen interior designed with meticulous attention to detail.", img: img2 },
  { id: 3, title: "Urban Retreat", category: "Dining", location: "Studio Ionic 9", description: "Premium luxury dining interior designed with meticulous attention to detail.", img: img3 },
  { id: 4, title: "Symphony Dining", category: "Bathroom", location: "Studio Ionic 9", description: "Premium luxury bathroom interior designed with meticulous attention to detail.", img: img4 },
  { id: 5, title: "Heritage Villa", category: "Office", location: "Studio Ionic 9", description: "Premium luxury office interior designed with meticulous attention to detail.", img: img5 },
  { id: 6, title: "Nexus Boutique", category: "Commercial", location: "Studio Ionic 9", description: "Premium luxury commercial interior designed with meticulous attention to detail.", img: img6 },
  { id: 7, title: "Luminous Lounge", category: "Residential", location: "Studio Ionic 9", description: "Premium luxury residential interior designed with meticulous attention to detail.", img: img7 },
  { id: 8, title: "Serene Sanctuary", category: "TV Unit", location: "Studio Ionic 9", description: "Premium luxury tv unit interior designed with meticulous attention to detail.", img: img8 },
  { id: 9, title: "Modern Edge", category: "Wardrobe", location: "Studio Ionic 9", description: "Premium luxury wardrobe interior designed with meticulous attention to detail.", img: img9 },
  { id: 11, title: "Nordic Haven", category: "Kids Bedroom", location: "Studio Ionic 9", description: "Premium luxury kids bedroom interior designed with meticulous attention to detail.", img: img11 },
  { id: 12, title: "Zen Space", category: "Guest Bedroom", location: "Studio Ionic 9", description: "Premium luxury guest bedroom interior designed with meticulous attention to detail.", img: img12 },
  { id: 13, title: "Opulent Grandeur", category: "Master Bedroom", location: "Studio Ionic 9", description: "Premium luxury master bedroom interior designed with meticulous attention to detail.", img: img13 },
  { id: 14, title: "Industrial Loft", category: "Pooja Room", location: "Studio Ionic 9", description: "Premium luxury pooja room interior designed with meticulous attention to detail.", img: img14 },
  { id: 15, title: "Bohemian Rhapsody", category: "Entrance/Foyer", location: "Studio Ionic 9", description: "Premium luxury entrance/foyer interior designed with meticulous attention to detail.", img: img15 },
  { id: 16, title: "Contemporary Chic", category: "Balcony", location: "Studio Ionic 9", description: "Premium luxury balcony interior designed with meticulous attention to detail.", img: img16 },
  { id: 17, title: "Vintage Charm", category: "Clinic/Healthcare", location: "Studio Ionic 9", description: "Premium luxury clinic/healthcare interior designed with meticulous attention to detail.", img: img17 },
  { id: 18, title: "Art Deco Delight", category: "Living Room", location: "Studio Ionic 9", description: "Premium luxury living room interior designed with meticulous attention to detail.", img: img18 },
  { id: 19, title: "Rustic Elegance", category: "Bedroom", location: "Studio Ionic 9", description: "Premium luxury bedroom interior designed with meticulous attention to detail.", img: img19 },
  { id: 20, title: "Coastal Breeze", category: "Kitchen", location: "Studio Ionic 9", description: "Premium luxury kitchen interior designed with meticulous attention to detail.", img: img20 },
  { id: 21, title: "Mid-Century Modern", category: "Dining", location: "Studio Ionic 9", description: "Premium luxury dining interior designed with meticulous attention to detail.", img: img21 },
  { id: 22, title: "Eclectic Mix", category: "Bathroom", location: "Studio Ionic 9", description: "Premium luxury bathroom interior designed with meticulous attention to detail.", img: img22 },
  { id: 24, title: "Tranquil Oasis", category: "Commercial", location: "Studio Ionic 9", description: "Premium luxury commercial interior designed with meticulous attention to detail.", img: img24 },
  { id: 25, title: "Sophisticated Style", category: "Residential", location: "Studio Ionic 9", description: "Premium luxury residential interior designed with meticulous attention to detail.", img: img25 },
  { id: 26, title: "Playful Palette", category: "TV Unit", location: "Studio Ionic 9", description: "Premium luxury tv unit interior designed with meticulous attention to detail.", img: img26 },
  { id: 27, title: "Earthy Tones", category: "Wardrobe", location: "Studio Ionic 9", description: "Premium luxury wardrobe interior designed with meticulous attention to detail.", img: img27 },
  { id: 29, title: "Cozy Corner", category: "Kids Bedroom", location: "Studio Ionic 9", description: "Premium luxury kids bedroom interior designed with meticulous attention to detail.", img: img29 },
  { id: 30, title: "Vibrant Hues", category: "Guest Bedroom", location: "Studio Ionic 9", description: "Premium luxury guest bedroom interior designed with meticulous attention to detail.", img: img30 },
  { id: 31, title: "Monochrome Magic", category: "Master Bedroom", location: "Studio Ionic 9", description: "Premium luxury master bedroom interior designed with meticulous attention to detail.", img: img31 },
];

const ProjectCard = ({ project, idx, onClick }: { project: Project; idx: number; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const speed = [10, 25, 40][idx % 3]; 
  const yParallax = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, delay: (idx % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:-translate-y-2 cursor-pointer bg-warm-white h-[140px] sm:h-[150px] md:h-[160px] lg:h-[180px] transition-all duration-500"
      onClick={onClick}
    >
      <div className="relative overflow-hidden w-full h-full">
        <motion.img
          src={project.img}
          alt={project.title}
          loading="lazy"
          style={{ y: yParallax, height: "120%", top: "-10%", position: "absolute" }}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.08] group-hover:brightness-110"
        />
        
        <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/60 rounded-xl transition-all duration-700 pointer-events-none z-20 scale-[0.98] group-hover:scale-100" />
        <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <span className="text-[9px] tracking-[0.2em] uppercase text-warm-white/90 drop-shadow-sm mb-1 block">
            {project.category}
          </span>
          <h3 className="font-display text-base md:text-lg text-gold mb-2 leading-tight">
            {project.title}
          </h3>
          <div className="inline-flex items-center gap-1 text-[9px] tracking-[0.2em] uppercase text-warm-white border-b border-gold/30 pb-0.5 group-hover:border-gold transition-all mt-1">
            View <ArrowUpRight size={10} className="text-gold" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
          <TextReveal text="Timeless Interiors" className="font-display text-4xl md:text-6xl mt-4 leading-tight block" delay={0.1} />
          <TextReveal text="Crafted with Precision" className="font-display text-4xl md:text-6xl leading-tight italic text-gold block" delay={0.2} />
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
              className={\`px-5 py-2 text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-300 border \${
                activeCategory === cat
                  ? "bg-charcoal text-warm-white border-charcoal"
                  : "bg-transparent text-charcoal border-charcoal/20 hover:border-gold hover:text-gold"
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          <AnimatePresence>
            {displayedProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} onClick={() => openLightbox(idx)} />
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
                  {filteredProjects[lightboxIndex].category} {filteredProjects[lightboxIndex].location && \`• \${filteredProjects[lightboxIndex].location}\`}
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
`;

fs.writeFileSync('src/components/Portfolio.tsx', portfolioCode, 'utf8');

// Now we need to process index.tsx
let indexStr = fs.readFileSync('src/routes/index.tsx', 'utf8');

indexStr = indexStr.replace(
  'import { motion, useAnimationFrame, useMotionValue } from "framer-motion";',
  'import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform } from "framer-motion";\\nimport { TextReveal } from "@/components/TextReveal";\\nimport { FloatingImage } from "@/components/FloatingImage";'
);

// Add scrollY and bgY, btnY to Index
indexStr = indexStr.replace(
  'const [active, setActive] = useState(0);',
  'const [active, setActive] = useState(0);\\n\\n  const { scrollY } = useScroll();\\n  const bgY = useTransform(scrollY, [0, 1000], [0, 250]);\\n  const btnY = useTransform(scrollY, [0, 1000], [0, 100]);'
);

// Navbar
indexStr = indexStr.replace(
  'className={\`fixed top-0 inset-x-0 w-full z-[9999] backdrop-blur-[12px] bg-[#faf7f2eb] transition-colors duration-300\`}',
  'className={\`fixed top-0 inset-x-0 w-full z-[9999] transition-all duration-700 \${scrolled ? "backdrop-blur-[12px] bg-[#faf7f2eb] py-0 shadow-sm" : "bg-transparent py-4"}\`}'
);

indexStr = indexStr.replace(
  '<img src={logo} alt="Studio Ionic 9" className="w-auto object-contain h-[38px] md:h-[45px] lg:h-[50px]" />',
  '<motion.img src={logo} alt="Studio Ionic 9" className="w-auto object-contain h-[38px] md:h-[45px] lg:h-[50px]" animate={{ y: [0, -4, 0], scale: scrolled ? 0.85 : 1 }} transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.5, ease: "easeInOut" } }} />'
);

indexStr = indexStr.replace(
  '<nav className="hidden md:flex items-center gap-10">',
  '<motion.nav className="hidden md:flex items-center gap-10" initial={{ opacity: 1 }} animate={{ opacity: scrolled ? 0.8 : 1 }} transition={{ duration: 0.5 }}>'
);
indexStr = indexStr.replace(
  '</nav>',
  '</motion.nav>'
);

indexStr = indexStr.replace(
  '<a href="#contact" className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase border-b border-gold pb-1 text-gold hover:gap-3 transition-all">',
  '<motion.a href="#contact" className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase border-b border-gold pb-1 text-gold hover:gap-3 transition-all" initial={{ opacity: 1 }} animate={{ opacity: scrolled ? 0.8 : 1 }} transition={{ duration: 0.5 }}>'
);
indexStr = indexStr.replace(
  'Book Consultation <ArrowUpRight size={14} />\\n          </a>',
  'Book Consultation <ArrowUpRight size={14} />\\n          </motion.a>'
);

// Hero Parallax
indexStr = indexStr.replace(
  '<img src={hero} alt="Luxury interior" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />',
  '<motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[120%] -top-[10%]"><img src={hero} alt="Luxury interior" className="w-full h-full object-cover" width={1920} height={1080} /></motion.div>'
);

// Hero Typography
indexStr = indexStr.replace(
  '<h1 className="reveal font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] mb-6" style={{ transitionDelay: "0.2s" }}>\\n              Studio Ionic 9\\n            </h1>',
  '<TextReveal text="Studio Ionic 9" className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] mb-6 block" delay={0.2} />'
);
indexStr = indexStr.replace(
  '<h2 className="reveal font-display italic text-gold text-3xl md:text-5xl mb-8" style={{ transitionDelay: "0.3s" }}>\\n              Luxury Interior Design\\n            </h2>',
  '<TextReveal text="Luxury Interior Design" className="font-display italic text-gold text-3xl md:text-5xl mb-8 block" delay={0.4} />'
);

// Hero Buttons
indexStr = indexStr.replace(
  '<div className="reveal flex flex-wrap gap-4" style={{ transitionDelay: "0.6s" }}>',
  '<motion.div style={{ y: btnY }} className="flex flex-wrap gap-4 mt-12">'
);
indexStr = indexStr.replace(
  '<a href="#portfolio" className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-gold transition-colors">',
  '<motion.a href="#portfolio" className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-gold transition-colors" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}>'
);
indexStr = indexStr.replace(
  'View Portfolio <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />\\n              </a>',
  'View Portfolio <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />\\n              </motion.a>'
);
indexStr = indexStr.replace(
  '<a href="#contact" className="inline-flex items-center gap-3 border border-charcoal text-charcoal px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-charcoal hover:text-warm-white transition-colors">',
  '<motion.a href="#contact" className="inline-flex items-center gap-3 border border-charcoal text-charcoal px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-charcoal hover:text-warm-white transition-colors" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}>'
);
indexStr = indexStr.replace(
  'Book Consultation\\n              </a>',
  'Book Consultation\\n              </motion.a>'
);
indexStr = indexStr.replace(
  '</div>\\n          </div>\\n        </div>',
  '</motion.div>\\n          </div>\\n        </div>'
);

// We use regex to replace whole sections for Services, About, Process, Contact
const servicesRegex = /<section id="services"[\\s\\S]*?<\\/section>/;
const servicesNew = \`<section id="services" className="py-24 md:py-36 px-6 lg:px-12 bg-beige/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] tracking-luxe uppercase text-gold block mb-4">What We Do</span>
              <TextReveal text="A studio for every" className="font-display text-4xl md:text-6xl leading-tight max-w-2xl block" delay={0.1} />
              <TextReveal text="interior ambition." className="font-display text-4xl md:text-6xl leading-tight max-w-2xl italic block" delay={0.2} />
            </div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-sm text-foreground/70">
              From single rooms to full turnkey homes and commercial fit-outs — comprehensive design under one elegant roof.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s, i) => (
              <motion.div 
                key={s.title} 
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-background p-10 hover:bg-warm-white transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,var(--gold)_0%,transparent_70%)] pointer-events-none" />
                <div className="flex items-start justify-between mb-8">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>
                    <s.icon size={28} strokeWidth={1} className="text-gold" />
                  </motion.div>
                  <span className="font-display text-xs text-foreground/30">0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl mb-3 relative z-10">{s.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed relative z-10">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] tracking-luxe uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                  Enquire <ArrowUpRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>\`;

indexStr = indexStr.replace(servicesRegex, servicesNew);


const aboutRegex = /<section id="about"[\\s\\S]*?<\\/section>/;
const aboutNew = \`<section id="about" className="pt-6 md:pt-8 lg:pt-10 pb-24 md:pb-36 px-6 lg:px-12 relative overflow-hidden">
        <FloatingImage src={hero} className="absolute -right-[20%] -top-[10%] w-[50%] h-[120%] object-cover opacity-[0.03] pointer-events-none" parallaxOffset={150} floatOffset={10} duration={8} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-luxe uppercase text-gold block mb-4">About the Founder</span>
            <TextReveal text="Sarthak Jethe —" className="font-display text-4xl md:text-6xl leading-tight block" delay={0.1} />
            <TextReveal text="an architect of feeling." className="font-display text-4xl md:text-6xl leading-tight italic mb-6 block" delay={0.2} />
            <div className="h-px w-16 bg-gold mx-auto mb-8" />
          </div>
          
          <div className="text-center">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-foreground/70 leading-relaxed mb-6">
              Studio Ionic 9 was founded on a simple belief: a space should feel as considered as it looks. Led by Sarthak Jethe, the studio crafts residences and commercial environments that balance architectural clarity with warmth, material honesty and a quiet sense of luxury.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="text-foreground/70 leading-relaxed mb-12">
              From early concept sketches to the final styled handover, every project is shaped by attentive listening, disciplined planning and an obsession with the details that make a space truly yours.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border text-center">
            {[
              ["120+", "Projects Delivered"],
              ["10+", "Years Experience"],
              ["95%", "Repeat Clients"],
              ["8", "Cities Served"],
            ].map(([n, l], i) => (
              <motion.div 
                key={l} 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-background p-6"
              >
                <div className="font-display text-3xl text-charcoal">{n}</div>
                <div className="text-[10px] tracking-luxe uppercase text-foreground/60 mt-2">{l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>\`;

indexStr = indexStr.replace(aboutRegex, aboutNew);

const processRegex = /<section id="process"[\\s\\S]*?<\\/section>/;
const processNew = \`<section id="process" className="py-24 md:py-36 px-6 lg:px-12 bg-charcoal text-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] tracking-luxe uppercase text-gold block mb-4">The Method</span>
            <TextReveal text="Six steps from" className="font-display text-4xl md:text-6xl leading-tight max-w-3xl block" delay={0.1} />
            <TextReveal text="brief to handover." className="font-display text-4xl md:text-6xl leading-tight max-w-3xl italic text-gold block" delay={0.2} />
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-2">
            {PROCESS.map((p, i) => (
              <motion.div 
                key={p.title} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-6 border-b border-warm-white/10 py-8 group relative overflow-hidden"
              >
                <motion.div 
                  className="absolute bottom-0 left-0 h-[1px] bg-gold"
                  initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 + (i % 2) * 0.1, ease: "easeInOut" }}
                />
                <div className="font-display text-3xl text-gold w-12 shrink-0">0{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>
                      <p.icon size={20} strokeWidth={1} className="text-gold" />
                    </motion.div>
                    <h3 className="font-display text-2xl">{p.title}</h3>
                  </div>
                  <p className="text-warm-white/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>\`;

indexStr = indexStr.replace(processRegex, processNew);


const contactRegex = /<section id="contact"[\\s\\S]*?<\\/section>/;
const contactNew = \`<section id="contact" className="py-24 md:py-36 px-6 lg:px-12 relative overflow-hidden">
        <motion.div 
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }} 
          transition={{ duration: 40, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at center, var(--beige) 0%, transparent 60%)", backgroundSize: "200% 200%" }}
        />
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 relative z-10">
          <div className="md:col-span-5">
            <motion.img src={logo} alt="Studio Ionic 9" className="h-16 md:h-20 object-contain mb-8" animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
            <span className="text-[10px] tracking-luxe uppercase text-gold block mb-4">Begin a Project</span>
            <TextReveal text="Let's design" className="font-display text-4xl md:text-6xl mt-4 leading-tight block" delay={0.1} />
            <TextReveal text="your story." className="font-display text-4xl md:text-6xl mb-8 leading-tight italic block" delay={0.2} />
            <div className="h-px w-16 bg-gold mb-10" />
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-foreground/70 mb-10 max-w-md">
              Tell us about your space. We respond personally within one business day to schedule a consultation.
            </motion.p>
            <div className="space-y-5">
              <a href="tel:+918468826123" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors"><Phone size={14} /></span>
                <div>
                  <div className="text-[10px] tracking-luxe uppercase text-foreground/60">Call</div>
                  <div className="font-display text-xl">+91 84688 26123</div>
                </div>
              </a>
              <a href="https://instagram.com/studioionic9" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors"><InstagramIcon /></span>
                <div>
                  <div className="text-[10px] tracking-luxe uppercase text-foreground/60">Instagram</div>
                  <div className="font-display text-xl">@studioionic9</div>
                </div>
              </a>
              <a href="mailto:studioiconic@gmail.com" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors"><Mail size={14} /></span>
                <div>
                  <div className="text-[10px] tracking-luxe uppercase text-foreground/60">Email</div>
                  <div className="font-display text-xl">studioiconic@gmail.com</div>
                </div>
              </a>
            </div>
          </div>

          <form
            className="md:col-span-7 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const msg = \`Hi Sarthak Jethe, I'm \${data.get("name")} (\${data.get("phone")}). \${data.get("message")}\`;
              window.open(\`https://wa.me/918468826123?text=\${encodeURIComponent(msg)}\`, "_blank");
            }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
                <Field name="name" label="Your Name" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <Field name="phone" label="Phone" type="tel" />
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
              <Field name="email" label="Email" type="email" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
              <label className="text-[10px] tracking-luxe uppercase text-foreground/60 block mb-3">Tell us about your space</label>
              <textarea name="message" required rows={6} className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 transition-colors resize-none font-sans" />
            </motion.div>
            <motion.button 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
              type="submit" 
              className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-10 py-5 text-xs tracking-[0.22em] uppercase hover:bg-gold transition-all duration-500 hover:scale-[1.02]"
            >
              Send Enquiry <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </motion.button>
          </form>
        </div>
      </section>\`;

indexStr = indexStr.replace(contactRegex, contactNew);

const returnStartRegex = /return \\(\\s*<div className="min-h-screen bg-background text-foreground">/;
const returnStartNew = \`const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 16, 
        y: (e.clientY / window.innerHeight - 0.5) * 16 
      });
    };
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground"
      animate={{ x: -mousePos.x * 0.2, y: -mousePos.y * 0.2 }}
      transition={{ type: "spring", stiffness: 100, damping: 25, mass: 0.5 }}
    >\`;
indexStr = indexStr.replace(returnStartRegex, returnStartNew);
indexStr = indexStr.replace(/<\\/div>\\s*\\);\\s*}\\s*function Field/, '</motion.div>\\n  );\\n}\\n\\nfunction Field');

fs.writeFileSync('src/routes/index.tsx', indexStr, 'utf8');

console.log("Files generated successfully!");
