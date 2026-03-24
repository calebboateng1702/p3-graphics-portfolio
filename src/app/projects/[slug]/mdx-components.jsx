export const mdxComponents = {
  h1: (props) => (
    <h1
      className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] js-reveal"
      {...props}
    />
  ),

  h2: (props) => (
    <h2
      className="mt-16 text-2xl md:text-3xl font-semibold tracking-tight js-reveal"
      {...props}
    />
  ),

  h3: (props) => (
    <h3
      className="mt-10 text-xl md:text-2xl font-semibold tracking-tight js-reveal"
      {...props}
    />
  ),

  p: (props) => (
    <p
      className="mt-5 max-w-[65ch] text-[15px] leading-8 text-white/75 md:text-[16px] js-reveal"
      {...props}
    />
  ),

  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-white/75 js-reveal"
      {...props}
    />
  ),

  li: (props) => <li className="leading-7" {...props} />,

  a: (props) => (
    <a
      className="text-orange-400 underline underline-offset-4 transition hover:text-orange-300"
      {...props}
    />
  ),

  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-orange-500/60 pl-6 italic text-white/80 js-reveal"
      {...props}
    />
  ),

  hr: () => (
    <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  ),

  Video: ({ src, poster }) => (
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      className="mt-10 w-full rounded-3xl border border-white/10 bg-black js-reveal"
    />
  ),

  Figure: ({ src, caption }) => (
    <figure className="mt-10 js-reveal">
      <img
        src={src}
        alt={caption || "Project image"}
        className="w-full rounded-3xl border border-white/10 object-cover"
      />
      {caption ? (
        <figcaption className="mt-3 text-sm text-white/45">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  ),

  Callout: ({ children }) => (
    <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/5 px-5 py-4 text-sm text-white/80 js-reveal">
      {children}
    </div>
  ),

  Highlight: ({ children }) => (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-white js-reveal">
      {children}
    </div>
  ),

  Metric: ({ label, value }) => (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center js-reveal">
      <div className="text-2xl font-bold text-orange-500">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-white/50">
        {label}
      </div>
    </div>
  ),
};