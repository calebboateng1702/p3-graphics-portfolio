"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const sectionFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function HomeClient({ projects }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 22 });

  // Luxury-minimal: subtle hero parallax
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 28]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.72]);

  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* Top progress bar (Apple-ish) */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[999] h-[2px] w-full origin-left bg-orange-500"
      />

      {/* Sticky glass header */}
      <header className="fixed top-0 left-0 right-0 z-[100]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
            <a href="#" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="P3 Graphics Logo"
                width={34}
                height={34}
                style={{ objectFit: "contain" }}
              />
              <span className="font-semibold tracking-tight">
                P3 <span className="text-orange-500">Graphics</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
              <a className="hover:text-white transition" href="#about">
                About
              </a>
              <a className="hover:text-white transition" href="#services">
                Services
              </a>
              <a className="hover:text-white transition" href="#work">
                Work
              </a>
              <a className="hover:text-white transition" href="#process">
                Process
              </a>
            </nav>

            <a
              href="#contact"
              className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
            >
              Start a Project
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-28">
        {/* soft spotlight */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[38%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-7 flex justify-center"
          >
            <img
              src="/logo.png"
              alt="P3 Graphics Logo"
              width={92}
              height={92}
              style={{ objectFit: "contain" }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            P3 Graphics |Luxury,Creative
            <span className="text-orange-500"> Studio.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 mx-auto max-w-2xl text-gray-300"
          >
            P3 Graphics, founded by Caleb Boateng is a creative studio crafting premium brand identities, digital experiences, and motion systems for startups and ambitious businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#work"
              className="px-8 py-4 rounded-2xl bg-orange-500 text-black font-semibold hover:opacity-90 transition"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              Request a Quote
            </a>
          </motion.div>

          {/* scroll hint */}
          <div className="mt-14 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-xs text-gray-400">
              <span>Scroll</span>
              <span className="h-8 w-[2px] rounded-full bg-white/20 overflow-hidden">
                <span className="block h-1/2 w-full bg-orange-500/70 animate-pulse" />
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TRUST + STATS */}
      <motion.section
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                Premium visuals that build trust and sell.
              </h3>
              <p className="mt-3 text-gray-400">
                Strategy-led design with clean execution. Fast communication. Deliverables that fit real-world production.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { k: "2+ yrs", v: "Experience" },
                { k: "50+", v: "Deliveries" },
                { k: "24–72h", v: "Turnaround" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
                >
                  <div className="text-2xl font-bold text-orange-500">{s.k}</div>
                  <div className="mt-1 text-xs text-gray-300/80">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-80">
            {["Brako Nations", "EmmConsult Agency ", "Naya's Palor", "Fada's Wood"].map((c) => (
              <div
                key={c}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center text-sm text-gray-300"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
          >
            About the Studio
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-gray-400 leading-relaxed"
          >
            P3 Graphics is a multidisciplinary studio focused on luxury-minimal visual systems.
            We combine taste, structure, and motion to help brands look premium and communicate clearly.
          </motion.p>
        </div>
      </section>
{/* ABOUT CALEB (SEO) */}
<section className="py-24 px-6 bg-black border-t border-white/5">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
      About Caleb Boateng
    </h2>

    <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
      Caleb Boateng is a branding and motion designer and the founder of P3 Graphics.
      He specializes in structured brand systems, visual identity development, and
      performance-driven digital design for ambitious startups and growing businesses.
    </p>

    <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mt-6">
      A Communication Design student at KNUST, Caleb approaches branding with discipline,
      hierarchy, and scalable system thinking rather than decoration.
    </p>
  </div>
</section>
      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight"
          >
            What We Do
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Brand Identity",
                desc: "Logos, systems, guidelines, and identity rollouts built for growth.",
              },
              {
                title: "Motion & Animation",
                desc: "Explainers, product promos, social animations, and brand motion systems.",
              },
              {
                title: "Digital Design",
                desc: "Web/UI visuals, landing pages, and high-converting marketing design.",
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-2xl bg-zinc-900 border border-white/5 hover:border-orange-500/35 transition"
              >
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight"
          >
            </motion.h2>
          {/* WORK */}
<section id="work" className="py-24 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
      Selected Work
    </h2>
    <p className="text-center text-gray-400 mb-16">
      Case studies for strategy + galleries for volume.
    </p>

    {/* 1) FEATURED CASE STUDIES (MDX) */}
    <div className="mb-16">
      <div className="flex items-end justify-between mb-6">
        <h3 className="text-xl font-semibold">Featured Case Studies</h3>
        <a href="/projects/branding" className="text-sm text-gray-300 hover:text-white">
          View all →
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <a
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="relative h-72 rounded-2xl overflow-hidden group border border-white/10 bg-zinc-900"
          >
            {/* Optional hover teaser */}
            <video
              src={p.teaserVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Fallback image if video not available */}
            {p.heroImage ? (
              <img
                src={p.heroImage}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
              />
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

            <div className="relative z-10 h-full p-6 flex flex-col justify-end">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{p.title}</span>
                <span className="text-xs text-gray-300/80">Case study →</span>
              </div>

              <p className="mt-2 text-sm text-gray-300/80">
                {p.subtitle || "Problem → system → deliverables."}
              </p>
            </div>
          </a>
        ))}
      </div>

      
    </div>

    {/* 2) WORK GALLERIES (UPLOAD ONLY) */}
    <div>
      <div className="flex items-end justify-between mb-6">
        <h3 className="text-xl font-semibold">Explore Galleries</h3>
       
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <a
          href="/work/motion"
          className="relative h-80 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group"
        >
          <img
            src="/work/motion/cover.jpg"
            alt="Motion Graphics"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 h-full flex items-end p-6">
            <div>
              <div className="text-xs text-gray-300/80">Gallery</div>
              <div className="text-2xl font-bold">Motion Graphics</div>
            </div>
          </div>
        </a>

        <a
          href="/work/graphic-design"
          className="relative h-80 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group"
        >
          <img
            src="/work/graphic-design/cover.jpg"
            alt="Graphic Design"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 h-full flex items-end p-6">
            <div>
              <div className="text-xs text-gray-300/80">Gallery</div>
              <div className="text-2xl font-bold">Graphic Design</div>
            </div>
          </div>
        </a>
      </div>

    </div>
  </div>
</section>
 
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Our Process
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-3 text-gray-400"
            >
              Clear steps. No confusion. You always know what’s next and what you’re getting.
            </motion.p>
          </div>

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {[
              { t: "01. Discover", d: "Brief, goals, audience, references, timelines." },
              { t: "02. Design", d: "Concepts, systems, iterations, direction lock." },
              { t: "03. Build", d: "Final assets, brand kit, exports, formats." },
              { t: "04. Launch", d: "Delivery, handover, support, next steps." },
            ].map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-orange-500 font-semibold">{p.t}</div>
                <p className="mt-2 text-gray-400 text-sm">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center tracking-tight"
          >
            Testimonials
          </motion.h2>
          
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                q: "P3 Graphics delivered a clean identity system that made our brand look premium instantly.",
                n: "Akwesi Ferro",
                r: "Founder, fada's Wood",
              },
              {
                q: "Fast turnaround, clear communication, and the design quality was top-tier.",
                n: "L.B Foundations",
                r: "Founder, Lady Britney",
              },
              {
                q: "The motion graphics elevated our content and improved engagement.",
                n: "Brako Nations",
                r: "Content Creator",
              },
            ].map((t, i) => (
              <motion.div
                key={t.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-gray-200/90">“{t.q}”</p>
                <div className="mt-5 text-sm">
                  <div className="font-semibold">{t.n}</div>
                  <div className="text-gray-400">{t.r}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          >
            Start a Project
          </motion.h2>
          <p className="text-gray-400">
            Share your goals, timeline, and budget range. We typically reply within 24 hours.
          </p>

          <form
          
            action="https://formspree.io/f/mvzbwkee"
  method="POST"
  className="mt-10 mx-auto max-w-xl text-left grid gap-4"
          >
            <div>
              <label className="text-sm text-gray-300">Name</label>
              <input name="name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-orange-500/60"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                name="email"
                type="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-orange-500/60"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Project details</label>
              <textarea
              name="message"
                className="mt-2 w-full min-h-[140px] rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-orange-500/60"
                placeholder="What do you need? Timeline? Budget range?"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-black hover:opacity-90 transition"
            >
              Send Inquiry
            </button>

            <div className="text-xs text-gray-500">
              Prefer email? Write to{" "}
              <a className="text-gray-300 hover:text-white" href="mailto:calebboateng890@gmail.com">
                calebboateng890@gmail.com
              </a>
            </div>
          </form>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} P3 Graphics Studio — Founded by Caleb Boateng
      </footer>
    </main>
  );
}
