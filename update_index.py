import re

with open("src/routes/index.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Imports
content = content.replace(
    'import { motion, useAnimationFrame, useMotionValue } from "framer-motion";',
    'import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform } from "framer-motion";\nimport { TextReveal } from "@/components/TextReveal";\nimport { FloatingImage } from "@/components/FloatingImage";'
)

# Index hooks
content = content.replace(
    'const [active, setActive] = useState(0);',
    'const [active, setActive] = useState(0);\n\n  const { scrollY } = useScroll();\n  const bgY = useTransform(scrollY, [0, 1000], [0, 250]);\n  const btnY = useTransform(scrollY, [0, 1000], [0, 100]);'
)

# Navbar
content = content.replace(
    'className={`fixed top-0 inset-x-0 w-full z-[9999] backdrop-blur-[12px] bg-[#faf7f2eb] transition-colors duration-300`}',
    'className={`fixed top-0 inset-x-0 w-full z-[9999] transition-all duration-700 ${scrolled ? "backdrop-blur-[12px] bg-[#faf7f2eb] py-0 shadow-sm" : "bg-transparent py-4"}`}'
)

content = content.replace(
    '<img src={logo} alt="Studio Ionic 9" className="w-auto object-contain h-[38px] md:h-[45px] lg:h-[50px]" />',
    '<motion.img src={logo} alt="Studio Ionic 9" className="w-auto object-contain h-[38px] md:h-[45px] lg:h-[50px]" animate={{ y: [0, -4, 0], scale: scrolled ? 0.85 : 1 }} transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.5, ease: "easeInOut" } }} />'
)

content = content.replace(
    '<nav className="hidden md:flex items-center gap-10">',
    '<motion.nav className="hidden md:flex items-center gap-10" initial={{ opacity: 1 }} animate={{ opacity: scrolled ? 0.8 : 1 }} transition={{ duration: 0.5 }}>'
).replace(
    '</nav>',
    '</motion.nav>', 1
)

content = content.replace(
    '<a href="#contact" className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase border-b border-gold pb-1 text-gold hover:gap-3 transition-all">',
    '<motion.a href="#contact" className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase border-b border-gold pb-1 text-gold hover:gap-3 transition-all" initial={{ opacity: 1 }} animate={{ opacity: scrolled ? 0.8 : 1 }} transition={{ duration: 0.5 }}>'
)
# Fix the closing tag of that specific a
content = content.replace('Book Consultation <ArrowUpRight size={14} />\n          </a>', 'Book Consultation <ArrowUpRight size={14} />\n          </motion.a>')


# Hero
content = content.replace(
    '<img src={hero} alt="Luxury interior" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />',
    '<motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[120%] -top-[10%]"><img src={hero} alt="Luxury interior" className="w-full h-full object-cover" width={1920} height={1080} /></motion.div>'
)

content = content.replace(
    '<h1 className="reveal font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] mb-6" style={{ transitionDelay: "0.2s" }}>\n              Studio Ionic 9\n            </h1>',
    '<TextReveal text="Studio Ionic 9" className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] mb-6 block" delay={0.2} />'
)
content = content.replace(
    '<h2 className="reveal font-display italic text-gold text-3xl md:text-5xl mb-8" style={{ transitionDelay: "0.3s" }}>\n              Luxury Interior Design\n            </h2>',
    '<TextReveal text="Luxury Interior Design" className="font-display italic text-gold text-3xl md:text-5xl mb-8 block" delay={0.4} />'
)

# Hero buttons
content = content.replace(
    '<div className="reveal flex flex-wrap gap-4" style={{ transitionDelay: "0.6s" }}>',
    '<motion.div style={{ y: btnY }} className="flex flex-wrap gap-4 mt-12">'
)
content = content.replace(
    '<a href="#portfolio" className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-gold transition-colors">',
    '<motion.a href="#portfolio" className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-gold transition-colors" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}>'
).replace(
    'View Portfolio <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />\n              </a>',
    'View Portfolio <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />\n              </motion.a>'
)
content = content.replace(
    '<a href="#contact" className="inline-flex items-center gap-3 border border-charcoal text-charcoal px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-charcoal hover:text-warm-white transition-colors">',
    '<motion.a href="#contact" className="inline-flex items-center gap-3 border border-charcoal text-charcoal px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-charcoal hover:text-warm-white transition-colors" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}>'
).replace(
    'Book Consultation\n              </a>',
    'Book Consultation\n              </motion.a>'
)

content = content.replace(
    '</div>\n          </div>\n        </div>',
    '</motion.div>\n          </div>\n        </div>'
)

# Sections replacement using regex
services_new = """      <section id="services" className="py-24 md:py-36 px-6 lg:px-12 bg-beige/40">
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
      </section>"""
content = re.sub(r'<section id="services"[\s\S]*?</section>', services_new, content)

about_new = """      <section id="about" className="pt-6 md:pt-8 lg:pt-10 pb-24 md:pb-36 px-6 lg:px-12 relative overflow-hidden">
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
      </section>"""
content = re.sub(r'<section id="about"[\s\S]*?</section>', about_new, content)

process_new = """      <section id="process" className="py-24 md:py-36 px-6 lg:px-12 bg-charcoal text-warm-white">
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
      </section>"""
content = re.sub(r'<section id="process"[\s\S]*?</section>', process_new, content)

contact_new = """      <section id="contact" className="py-24 md:py-36 px-6 lg:px-12 relative overflow-hidden">
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
              const msg = `Hi Sarthak Jethe, I'm ${data.get("name")} (${data.get("phone")}). ${data.get("message")}`;
              window.open(`https://wa.me/918468826123?text=${encodeURIComponent(msg)}`, "_blank");
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
      </section>"""
content = re.sub(r'<section id="contact"[\s\S]*?</section>', contact_new, content)

return_start_new = """  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
    >"""
content = re.sub(r'return \(\s*<div className="min-h-screen bg-background text-foreground">', return_start_new, content)
content = re.sub(r'</div>\s*\);\s*}\s*function Field', '</motion.div>\n  );\n}\n\nfunction Field', content)

with open("src/routes/index.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated index.tsx")
