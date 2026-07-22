import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  Menu, X, Phone, Mail, ArrowUpRight, Star,
  Compass, Ruler, Pencil, Layers, Hammer, KeyRound,
  Home, Building2, ChefHat, Sofa, LayoutGrid, Box, Sparkles,
} from "lucide-react";

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
import { useReveal } from "@/hooks/use-reveal";
import hero from "@/assets/hero-interior.jpg";
import img1 from "@/assets/images/media__1784655551327.png";
import img2 from "@/assets/images/media__1784655559667.png";
import img3 from "@/assets/images/media__1784655575753.png";
import img4 from "@/assets/images/media__1784655581624.jpg";
import img5 from "@/assets/images/media__1784655588378.png";
import img6 from "@/assets/images/media__1784656361650.jpg";
import img7 from "@/assets/images/media__1784656361710.jpg";
import img8 from "@/assets/images/media__1784656361727.jpg";
import img9 from "@/assets/images/media__1784656361749.jpg";
import img10 from "@/assets/images/media__1784656361756.jpg";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Portfolio } from "@/components/Portfolio";
import logo from "@/assets/images/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio Ionic 9 | Luxury Interior Design" },
      { name: "description", content: "Transforming residential and commercial spaces into timeless, elegant, and functional interiors with innovative design, premium craftsmanship, and personalized solutions." },
      { property: "og:title", content: "Studio Ionic 9" },
      { property: "og:description", content: "Transforming residential and commercial spaces into timeless, elegant, and functional interiors with innovative design, premium craftsmanship, and personalized solutions." },
      { property: "og:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { icon: Home, title: "Residential Interiors", desc: "Homes designed around how you live, move and unwind." },
  { icon: Building2, title: "Commercial Interiors", desc: "Workspaces and retail that reflect your brand vision." },
  { icon: ChefHat, title: "Modular Kitchens", desc: "Bespoke kitchens engineered for elegance and efficiency." },
  { icon: Sofa, title: "Furniture Planning", desc: "Curated and custom furniture that anchors each room." },
  { icon: LayoutGrid, title: "Space Planning", desc: "Considered layouts that optimise light, flow and proportion." },
  { icon: Box, title: "3D Design Concepts", desc: "Photoreal visualisations that bring concepts to life." },
  { icon: Sparkles, title: "Turnkey Solutions", desc: "End-to-end delivery — concept, execution and handover." },
];

const PORTFOLIO = [
  { img: img1, cat: "Luxury Living Room", title: "Serene Ambient Lounge", desc: "A soft, monochromatic living space elevated by warm ambient lighting and textured walls.", span: "md:row-span-2" },
  { img: img2, cat: "Modular Kitchen", title: "Ocean Hue Kitchen", desc: "A contemporary two-tone modular kitchen balancing sleek aesthetics with everyday functionality." },
  { img: img3, cat: "Modern Living Room", title: "Vibrant Arc Living", desc: "A striking contemporary living space featuring terracotta accents and custom arched wall details." },
  { img: img4, cat: "Premium Master Bedroom", title: "Noir Velvet Suite", desc: "A sophisticated master suite defined by rich wood paneling and moody, elegant textiles.", span: "md:row-span-2" },
  { img: img5, cat: "Apartment Interior", title: "Sage Open Plan", desc: "An airy apartment layout seamlessly integrating natural wood textures and calming sage green tones." },
];

const PROCESS = [
  { icon: Compass, title: "Consultation", desc: "Understanding your lifestyle, taste and brief." },
  { icon: Ruler, title: "Site Measurement", desc: "Precise survey and technical documentation." },
  { icon: Pencil, title: "Concept Design", desc: "Mood boards, layouts and 3D visualisations." },
  { icon: Layers, title: "Material Selection", desc: "Curated finishes, fabrics and bespoke furniture." },
  { icon: Hammer, title: "Execution", desc: "On-site supervision with premium craftsmanship." },
  { icon: KeyRound, title: "Handover", desc: "A styled, move-in ready space delivered on time." },
];

const WHY = [
  "Personalized Designs", "Space Optimization", "Premium Materials",
  "End-to-End Solutions", "Transparent Process", "Timely Delivery",
];

const TESTIMONIALS = [
  { name: "Aarav & Riya Mehta", role: "Residential — Pune", text: "Sarthak Jethe transformed our apartment into a serene, light-filled retreat. The attention to every detail — from joinery to lighting — is unmatched." },
  { name: "Saurabh Kulkarni", role: "Commercial — Mumbai", text: "Our office now feels like a destination. Studio Ionic 9 delivered an elegant, on-brand space ahead of schedule." },
  { name: "Priya Deshmukh", role: "Villa — Nashik", text: "Working with Studio Ionic 9 is effortless. The design process is transparent and the finished home feels timeless." },
];

const MARQUEE_PROJECTS = [
  { img: img1, title: "Luxury Residence" },
  { img: img2, title: "Modular Kitchen" },
  { img: img3, title: "Modern Living Room" },
  { img: img4, title: "Luxury Bedroom" },
  { img: img5, title: "Modern Workspace" },
  { img: img6, title: "Accent Wall" },
  { img: img7, title: "Elegant Dining" },
  { img: img8, title: "Vanity Unit" },
  { img: img9, title: "Children's Room" },
  { img: img10, title: "Dental Clinic" },
];

function MarqueeSection() {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastX = useRef(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth / 2);
      }
    };
    const t = setTimeout(updateWidth, 100);
    window.addEventListener("resize", updateWidth);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useAnimationFrame((time, delta) => {
    if (isPaused || width === 0 || isDragging) return;
    let moveBy = -(width / 40000) * delta;
    let newX = baseX.get() + moveBy;
    if (newX <= -width) {
      newX += width;
    } else if (newX > 0) {
      newX -= width;
    }
    baseX.set(newX);
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;
    let newX = baseX.get() + delta;
    if (newX <= -width) newX += width;
    else if (newX > 0) newX -= width;
    baseX.set(newX);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const allProjects = [...MARQUEE_PROJECTS, ...MARQUEE_PROJECTS];

  return (
    <section className="pt-3 md:pt-5 pb-16 md:pb-20 bg-[#FAF8F5] overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center reveal">
        <span className="text-[10px] tracking-luxe uppercase text-gold">OUR WORK</span>
        <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
          Spaces crafted with <span className="italic">timeless elegance.</span>
        </h2>
        <div className="h-px w-16 bg-gold mx-auto mt-6 mb-8" />
        <p className="max-w-2xl mx-auto text-foreground/70 leading-relaxed text-sm md:text-base">
          Every project reflects our attention to detail, refined materials, and thoughtful design. Explore a curated selection of our completed residential and commercial interiors.
        </p>
      </div>

      <div className="relative flex max-w-[100vw]">
        {/* Left/Right Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        
        <motion.div
          ref={containerRef}
          className="flex gap-4 md:gap-5 min-w-max cursor-grab active:cursor-grabbing px-6"
          style={{ x: baseX }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {allProjects.map((p, i) => (
            <a 
              key={i} 
              href="#portfolio"
              className="relative group w-[160px] sm:w-[200px] md:w-[240px] lg:w-[270px] h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] rounded-2xl overflow-hidden shrink-0 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500 block"
              draggable="false"
            >
              <motion.img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end text-warm-white translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                <h3 className="font-display text-base md:text-lg mb-1">{p.title}</h3>
                <div className="flex items-center gap-1.5 text-[9px] md:text-[11px] tracking-luxe uppercase text-gold">
                  View Project <ArrowUpRight size={10} />
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LoadingScreen />
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 w-full z-[9999] backdrop-blur-[12px] bg-[#faf7f2eb] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <img src={logo} alt="Studio Ionic 9" className="w-auto object-contain h-[38px] md:h-[45px] lg:h-[50px]" />
          </a>
          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-xs tracking-[0.22em] uppercase text-foreground/80 hover:text-gold transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase border-b border-gold pb-1 text-gold hover:gap-3 transition-all">
            Book Consultation <ArrowUpRight size={14} />
          </a>
          <button className="md:hidden text-foreground" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-warm-white animate-fade-in">
          <div className="flex justify-between items-center h-20 px-6">
            <img src={logo} alt="Studio Ionic 9" className="h-10 object-contain" />
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} /></button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 mt-20">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-display text-3xl">{n.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-6 text-xs tracking-[0.22em] uppercase border-b border-gold pb-1 text-gold">Book Consultation</a>
          </nav>
        </div>
      )}

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <img src={hero} alt="Luxury interior" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white/40 via-warm-white/30 to-warm-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.978_0.005_75/0.4)_100%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 w-full">
          <div className="max-w-3xl">
            <div className="reveal flex items-center gap-3 mb-8" style={{ transitionDelay: "0.1s" }}>
              <div className="h-px w-12 bg-gold" />
              <span className="text-[10px] tracking-luxe uppercase text-gold">STUDIO IONIC 9 / Luxury Interior Design Studio</span>
            </div>
            <h1 className="reveal font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] mb-6" style={{ transitionDelay: "0.2s" }}>
              Studio Ionic 9
            </h1>
            <h2 className="reveal font-display italic text-gold text-3xl md:text-5xl mb-8" style={{ transitionDelay: "0.3s" }}>
              Luxury Interior Design
            </h2>

            <div className="reveal mb-8 flex flex-col items-start" style={{ transitionDelay: "0.35s" }}>
              <div className="w-24 h-[1px] bg-gold/30 mb-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold" style={{ animation: "slideRight 2.5s ease-in-out infinite" }} />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">
                Sarthak Jethe
              </h3>
              <p className="text-[10px] tracking-luxe uppercase text-gold font-medium">
                Founder & Principal Interior Designer
              </p>
            </div>

            <p className="reveal text-base md:text-lg text-foreground/70 max-w-xl mb-10 leading-relaxed" style={{ transitionDelay: "0.4s" }}>
              Studio Ionic 9 creates luxurious residential and commercial interiors that blend elegance, functionality, and innovation. We deliver customized interior solutions with premium craftsmanship and timeless design.
            </p>
            <div className="reveal flex flex-wrap gap-4" style={{ transitionDelay: "0.6s" }}>
              <a href="#portfolio" className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-gold transition-colors">
                View Portfolio <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-3 border border-charcoal text-charcoal px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-charcoal hover:text-warm-white transition-colors">
                Book Consultation
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-luxe uppercase text-foreground/50 flex flex-col items-center gap-3">
          <span>Scroll</span>
          <div className="w-px h-12 bg-foreground/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gold animate-[slide-down_2s_ease-in-out_infinite]" style={{ animation: "slideDown 2s ease-in-out infinite" }} />
          </div>
        </div>
        <style>{`
          @keyframes slideDown { 0% { transform: translateY(-100%) } 100% { transform: translateY(100%) } }
          @keyframes slideRight { 0% { transform: translateX(-100%) } 100% { transform: translateX(100%) } }
        `}</style>
      </section>

      {/* MARQUEE */}
      <div className="border-t border-border pt-6 pb-2 overflow-hidden bg-beige/30">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_40s_linear_infinite]">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-16 items-center">
              {["Residential", "Commercial", "Modular Kitchens", "Space Planning", "3D Concepts", "Turnkey", "Furniture", "Lighting Design"].map((t) => (
                <span key={t} className="font-display italic text-2xl text-foreground/40 flex items-center gap-16">
                  {t} <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      <MarqueeSection />

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-36 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto reveal">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-luxe uppercase text-gold">About the Founder</span>
            <h2 className="font-display text-4xl md:text-6xl mt-4 mb-6 leading-tight">
              Sarthak Jethe —<br/><span className="italic">an architect of feeling.</span>
            </h2>
            <div className="h-px w-16 bg-gold mx-auto mb-8" />
          </div>
          
          <div className="text-center">
            <p className="text-foreground/70 leading-relaxed mb-6">
              Studio Ionic 9 was founded on a simple belief: a space should feel
              as considered as it looks. Led by Sarthak Jethe, the studio crafts
              residences and commercial environments that balance architectural
              clarity with warmth, material honesty and a quiet sense of luxury.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-12">
              From early concept sketches to the final styled handover, every
              project is shaped by attentive listening, disciplined planning and
              an obsession with the details that make a space truly yours.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border text-center">
            {[
              ["120+", "Projects Delivered"],
              ["10+", "Years Experience"],
              ["95%", "Repeat Clients"],
              ["8", "Cities Served"],
            ].map(([n, l]) => (
              <div key={l} className="bg-background p-6">
                <div className="font-display text-3xl text-charcoal">{n}</div>
                <div className="text-[10px] tracking-luxe uppercase text-foreground/60 mt-2">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-36 px-6 lg:px-12 bg-beige/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div className="reveal">
              <span className="text-[10px] tracking-luxe uppercase text-gold">What We Do</span>
              <h2 className="font-display text-4xl md:text-6xl mt-4 leading-tight max-w-2xl">
                A studio for every<br/><span className="italic">interior ambition.</span>
              </h2>
            </div>
            <p className="reveal max-w-sm text-foreground/70">
              From single rooms to full turnkey homes and commercial fit-outs —
              comprehensive design under one elegant roof.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="reveal group bg-background p-10 hover:bg-warm-white transition-all duration-500 relative overflow-hidden" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="absolute top-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
                <div className="flex items-start justify-between mb-8">
                  <s.icon size={28} strokeWidth={1} className="text-gold" />
                  <span className="font-display text-xs text-foreground/30">0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] tracking-luxe uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  Enquire <ArrowUpRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Portfolio />

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-36 px-6 lg:px-12 bg-charcoal text-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <span className="text-[10px] tracking-luxe uppercase text-gold">The Method</span>
            <h2 className="font-display text-4xl md:text-6xl mt-4 leading-tight max-w-3xl">
              Six steps from<br/><span className="italic text-gold">brief to handover.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-2">
            {PROCESS.map((p, i) => (
              <div key={p.title} className="reveal flex gap-6 border-b border-warm-white/10 py-8 group" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="font-display text-3xl text-gold w-12 shrink-0">0{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p.icon size={20} strokeWidth={1} className="text-gold" />
                    <h3 className="font-display text-2xl">{p.title}</h3>
                  </div>
                  <p className="text-warm-white/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 md:py-36 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 reveal">
            <span className="text-[10px] tracking-luxe uppercase text-gold">Why Studio Ionic 9</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
              Built on <span className="italic">trust,</span> delivered with <span className="italic">care.</span>
            </h2>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-px bg-border">
            {WHY.map((w, i) => (
              <div key={w} className="reveal bg-background p-8 flex items-center gap-5 group hover:bg-beige/40 transition-colors" style={{ transitionDelay: `${i * 0.05}s` }}>
                <span className="font-display text-2xl text-gold">0{i + 1}</span>
                <span className="font-display text-xl">{w}</span>
                <ArrowUpRight size={16} className="ml-auto text-foreground/30 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-36 px-6 lg:px-12 bg-beige/40">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] tracking-luxe uppercase text-gold">Kind Words</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 mb-12 leading-tight">From our clients</h2>
          <div className="relative min-h-[260px]">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`absolute inset-0 transition-all duration-700 ${i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                <div className="flex justify-center gap-1 mb-6 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" strokeWidth={0} />)}
                </div>
                <p className="font-display italic text-2xl md:text-3xl leading-relaxed mb-8">"{t.text}"</p>
                <div className="font-display text-lg">{t.name}</div>
                <div className="text-[10px] tracking-luxe uppercase text-foreground/60 mt-1">{t.role}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} className={`h-px transition-all ${i === active ? "w-12 bg-gold" : "w-6 bg-foreground/30"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-36 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16">
          <div className="md:col-span-5 reveal">
            <img src={logo} alt="Studio Ionic 9" className="h-16 md:h-20 object-contain mb-8" />
            <span className="text-[10px] tracking-luxe uppercase text-gold">Begin a Project</span>
            <h2 className="font-display text-4xl md:text-6xl mt-4 mb-8 leading-tight">
              Let's design<br/><span className="italic">your story.</span>
            </h2>
            <div className="h-px w-16 bg-gold mb-10" />
            <p className="text-foreground/70 mb-10 max-w-md">
              Tell us about your space. We respond personally within one
              business day to schedule a consultation.
            </p>
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
            className="md:col-span-7 reveal space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const msg = `Hi Sarthak Jethe, I'm ${data.get("name")} (${data.get("phone")}). ${data.get("message")}`;
              window.open(`https://wa.me/918468826123?text=${encodeURIComponent(msg)}`, "_blank");
            }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <Field name="name" label="Your Name" />
              <Field name="phone" label="Phone" type="tel" />
            </div>
            <Field name="email" label="Email" type="email" />
            <div>
              <label className="text-[10px] tracking-luxe uppercase text-foreground/60 block mb-3">Tell us about your space</label>
              <textarea name="message" required rows={6} className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 transition-colors resize-none font-sans" />
            </div>
            <button type="submit" className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-10 py-5 text-xs tracking-[0.22em] uppercase hover:bg-gold transition-colors">
              Send Enquiry <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal text-warm-white/70 px-6 lg:px-12 pt-20 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 pb-16 border-b border-warm-white/10">
          <div className="md:col-span-5">
            <img src={logo} alt="Studio Ionic 9" className="h-14 md:h-16 object-contain mb-6" />
            <p className="text-sm max-w-sm leading-relaxed font-display text-xl text-warm-white mb-2">
              Studio Ionic 9
            </p>
            <p className="text-sm max-w-sm leading-relaxed">
              Luxury Interior Design Studio
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-luxe uppercase text-gold mb-5">Studio</div>
            <ul className="space-y-3 text-sm">
              {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold transition-colors">{n.label}</a></li>)}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="text-[10px] tracking-luxe uppercase text-gold mb-5">Connect</div>
            <ul className="space-y-3 text-sm">
              <li><a href="tel:+918468826123" className="hover:text-gold">+91 84688 26123</a></li>
              <li><a href="https://instagram.com/studioionic9" target="_blank" rel="noreferrer" className="hover:text-gold">@studioionic9</a></li>
              <li><a href="mailto:studioiconic@gmail.com" className="hover:text-gold">studioiconic@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-warm-white/40">
          <div>© {new Date().getFullYear()} Studio Ionic 9. All rights reserved.</div>
          <div>Crafted with care · Sarthak Jethe</div>
        </div>
      </footer>
    </div>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] tracking-luxe uppercase text-foreground/60 block mb-3">{label}</label>
      <input name={name} type={type} required className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 transition-colors font-sans" />
    </div>
  );
}
