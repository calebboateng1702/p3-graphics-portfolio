"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Tilt from "@/components/Tilt";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stats = [
  { value: "2+ Years", label: "Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "24–72 hrs", label: "Typical Turnaround" },
];

const trustItems = [
  "Brand Identity",
  "Motion Graphics",
  "Web Design",
  "Visual Communication",
];

const services = [
  {
    title: "Brand Identity",
    desc: "Logo systems, brand direction, and visual assets designed for clarity, consistency, and growth.",
  },
  {
    title: "Motion Design",
    desc: "Promos, logo reveals, and social motion pieces that make brands feel more alive and engaging.",
  },
  {
    title: "Digital Design",
    desc: "Modern web visuals and interface-focused design built to communicate clearly and feel premium.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    desc: "I begin by understanding the brand, audience, and communication problem before exploring visuals.",
  },
  {
    number: "02",
    title: "Define",
    desc: "The direction, tone, and visual structure are clarified so the project has focus from the start.",
  },
  {
    number: "03",
    title: "Design",
    desc: "The strongest ideas are developed, refined, and pushed into a polished creative outcome.",
  },
  {
    number: "04",
    title: "Deliver",
    desc: "Final assets are organized and prepared professionally for use, launch, or presentation.",
  },
];

const testimonials = [
  {
    quote:
      "P3 Graphics delivered a clean identity system that made our brand look premium instantly.",
    name: "Akwesi Faro",
    role: "Founder, Fada’s Wood",
  },
  {
    quote:
      "Fast turnaround, clear communication, and the design quality was top-tier.",
    name: "Lady Britney",
    role: "Founder, L.B Foundation",
  },
  {
    quote: "The motion graphics elevated our content and improved engagement.",
    name: "Prempeh Service",
    role: "Rental Business",
  },
];

export default function HomeClient({ projects = [] }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
  });

  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* top progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[999] h-[2px] w-full origin-left bg-orange-500"
      />

      {/* header */}
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-xl">
            <a href="#" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="P3 Graphics Logo"
                width={34}
                height={34}
                className="object-contain"
              />
              <span className="font-semibold tracking-tight">
                P3 <span className="text-orange-500">Graphics</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
              <a href="#about" className="transition hover:text-white">
                About
              </a>
              <a href="#services" className="transition hover:text-white">
                Services
              </a>
              <a href="#work" className="transition hover:text-white">
                Work
              </a>
              <a href="#process" className="transition hover:text-white">
                Process
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </nav>

            <a
              href="#contact"
              className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Start a Project
            </a>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[38%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7 }}
          className="relative z-10 w-full max-w-5xl text-center"
        >
          <div className="mb-7 flex justify-center">
            <img
              src="/logo.png"
              alt="P3 Graphics Logo"
              width={92}
              height={92}
              className="object-contain"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            I design <span className="text-orange-500">brand systems</span>
            <br />
            that make businesses look premium
            <br />
            and communicate clearly.
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-gray-300 text-lg">
            I help startups and growing businesses move from inconsistent
            visuals to structured, high-quality design that builds trust and
            drives results.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
              Start a Project
            </a>
          </div>
          <p className="mt-6 text-sm text-white/45">
            Branding • Motion Graphics • Web Design • Visual Communication
          </p>
        </motion.div>
      </section>
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">
            Focus
          </p>

          <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
            Not just visuals. Systems that scale.
          </h3>

          <p className="mt-4 text-white/60 leading-7">
            I build structured design systems that stay consistent across
            campaigns, platforms, and brand touchpoints.
          </p>
        </div>
      </section>
      

      {/* proof / trust */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Premium visuals built with clarity, structure, and taste.
              </h2>
              <p className="mt-3 max-w-xl text-gray-400">
                Good design should not just look expensive. It should
                communicate well, build trust fast, and work in real business
                contexts.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
                >
                  <div className="text-2xl font-bold text-orange-500">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs text-gray-300/80">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {trustItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* about */}
      <section id="about" className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-start"
          >
            <Tilt max={10}>
              <img
                src="/caleb.png"
                alt="Caleb Boateng"
                className="w-[320px] object-contain md:w-[520px]"
              />
            </Tilt>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.06 }}
          >
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/45">
              About
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Design with intent, not decoration.
            </h2>

            <p className="mt-5 leading-8 text-gray-300">
              I’m Caleb Boateng, a communication designer and founder of P3
              Graphics. I build brand identities, motion pieces, and digital
              experiences with a strong focus on structure, clarity, and visual
              quality.
            </p>

            <p className="mt-4 leading-8 text-gray-400">
              As a Communication Design student at KNUST, I approach creative
              work as a system. Every visual decision should support
              communication, not just appearance.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Brand identity systems",
                "Logo design + guidelines",
                "Social design systems",
                "Motion promos + logo animation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* services */}
      <section id="services" className="bg-zinc-950 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/45">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              What I help brands do better.
            </h2>
            <p className="mt-4 text-gray-400">
              Focused creative services built to improve how brands look, move,
              and communicate.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/5 bg-zinc-900 p-8 transition hover:border-orange-500/35"
              >
                <h3 className="mb-3 text-xl font-semibold text-orange-500">
                  {service.title}
                </h3>
                <p className="leading-7 text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* work */}
      <section id="work" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">
              Selected Work
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              A selection of projects focused on clarity, structure, and
              performance.
            </h2>
          </div>

          {/* FEATURED CASE STUDIES */}
          <div className="mt-16">
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-lg font-medium text-white/80">
                Case Studies
              </h3>
              <a
                href="/projects/branding"
                className="text-sm text-white/50 hover:text-white"
              >
                View all →
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <a
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group relative h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900"
                >
                  {/* Video hover */}
                  <video
                    src={p.teaserVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
                  />

                  {/* Fallback */}
                  {p.heroImage && (
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition duration-500"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                    <div className="text-sm text-white/60">
                      {p.services?.join(" • ")}
                    </div>

                    <div className="mt-1 text-xl font-semibold">{p.title}</div>

                    <p className="mt-2 text-sm text-white/60 max-w-sm">
                      {p.subtitle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* GALLERIES */}
          <div className="mt-24">
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-lg font-medium text-white/80">Galleries</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <a
                href="/work/motion"
                className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900"
              >
                <img
                  src="/work/motion/cover.jpg"
                  alt="Motion Graphics"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 h-full flex items-end p-6">
                  <div>
                    <div className="text-xs text-white/50">Gallery</div>
                    <div className="text-2xl font-semibold">Motion</div>
                  </div>
                </div>
              </a>

              <a
                href="/work/graphic-design"
                className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900"
              >
                <img
                  src="/work/graphic-design/cover.jpg"
                  alt="Graphic Design"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 h-full flex items-end p-6">
                  <div>
                    <div className="text-xs text-white/50">Gallery</div>
                    <div className="text-2xl font-semibold">Graphic Design</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* process */}
      <section id="process" className="bg-zinc-950 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/45">
              Process
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              A simple process. A sharper result.
            </h2>
            <p className="mt-4 text-gray-400">
              Strong creative work should feel organized from the start. The
              process stays clear, the communication stays direct, and the
              result stays intentional.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-sm tracking-[0.2em] text-orange-500/90">
                  {step.number}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/45">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Trusted by clients and collaborators.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="leading-8 text-gray-200/90">“{item.quote}”</p>
                <div className="mt-5 text-sm">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-400">{item.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="bg-zinc-950 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-14 backdrop-blur-xl sm:px-10 md:px-14"
          >
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/45">
                Start a Project
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Let’s build something worth remembering.
              </h2>
              <p className="mt-5 text-base leading-8 text-gray-400">
                Share your goals, timeline, and budget range. I usually reply
                within 24 hours.
              </p>
            </div>

            <form
              action="https://formspree.io/f/mvzbwkee"
              method="POST"
              className="mx-auto mt-10 grid max-w-2xl gap-4 text-left"
            >
              <div>
                <label className="text-sm text-gray-300">Name</label>
                <input
                  name="name"
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
                  className="mt-2 min-h-[140px] w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-orange-500/60"
                  placeholder="What do you need? Timeline? Budget range?"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-black transition hover:opacity-90"
              >
                Send Inquiry
              </button>

              <div className="text-center text-xs text-gray-500">
                Prefer email? Write to{" "}
                <a
                  className="text-gray-300 transition hover:text-white"
                  href="mailto:calebboateng890@gmail.com"
                >
                  calebboateng890@gmail.com
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} P3 Graphics — Founded by Caleb Boateng
      </footer>
    </main>
  );
}
