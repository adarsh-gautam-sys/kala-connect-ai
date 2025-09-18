export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f7f3ee] border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">About KalaConnect</h1>
          <p className="mt-3 text-neutral-700 max-w-3xl">
            KalaConnect bridges tradition with modern discovery. We empower artisans with simple tools to showcase their crafts,
            tell authentic stories, and reach buyers around the world.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-neutral-900">Mission</h2>
          <p className="mt-2 text-neutral-700">
            Our mission is to bridge tradition with modern discovery — making local craftsmanship visible, valuable, and accessible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900">Vision</h2>
          <p className="mt-2 text-neutral-700">
            A world where every artisan can build a sustainable livelihood by sharing their craft and story with a global audience.
          </p>
        </section>
      </div>
    </div>
  );
}
