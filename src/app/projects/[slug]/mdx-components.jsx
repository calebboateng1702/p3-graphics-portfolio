export const mdxComponents = {
  h1: (props) => (
    <h1
      className="text-4xl md:text-6xl font-extrabold tracking-tight js-reveal"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 text-2xl md:text-3xl font-bold tracking-tight js-reveal"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mt-4 text-gray-300 leading-relaxed js-reveal" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-4 space-y-2 text-gray-300 list-disc pl-6 js-reveal"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a
      className="text-orange-400 hover:text-orange-300 underline underline-offset-4"
      {...props}
    />
  ),

  Video: ({ src, poster }) => (
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      className="mt-6 w-full rounded-2xl border border-white/10 bg-black js-reveal"
    />
  ),

  Figure: ({ src, caption }) => (
    <figure className="mt-6 js-reveal">
      <img
        src={src}
        alt={caption || "Project image"}
        className="w-full rounded-2xl border border-white/10 object-cover"
      />
      {caption ? (
        <figcaption className="mt-2 text-xs text-gray-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  ),
};