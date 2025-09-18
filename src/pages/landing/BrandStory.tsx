export function BrandStory() {
  return (
    <section id="brand-story" className="py-16 md:py-20 bg-[#f7f3ee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700">
              KalaConnect empowers artisans with AI tools to showcase their craft, tell their stories, and reach global
              buyers.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <img
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=600&auto=format&fit=crop"
              alt="Artisan at work 1"
              className="h-32 w-full object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1523419409543-05aece9b77be?q=80&w=600&auto=format&fit=crop"
              alt="Artisan ceramics 2"
              className="h-32 w-full object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=600&auto=format&fit=crop"
              alt="Clay shaping 3"
              className="h-32 w-full object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1508161250369-0c3b3e8a04a5?q=80&w=600&auto=format&fit=crop"
              alt="Pottery wheel 4"
              className="h-32 w-full object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=600&auto=format&fit=crop"
              alt="Handcrafted bowl 5"
              className="h-32 w-full object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1616499615995-11b8199e80a6?q=80&w=600&auto=format&fit=crop"
              alt="Fired ceramics 6"
              className="h-32 w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}