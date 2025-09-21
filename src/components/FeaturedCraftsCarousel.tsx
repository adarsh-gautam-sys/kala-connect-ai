import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type FeaturedItem = {
  _id: string;
  imageUrl: string | null;
  productName?: string;
  artisanName?: string;
  price?: number | null;
};

export default function FeaturedCraftsCarousel() {
  const items = useQuery(api.crafts.getFeaturedPublic) as FeaturedItem[] | undefined;

  const list = React.useMemo<FeaturedItem[]>(() => {
    if (!items || items.length === 0) return [];
    return items;
  }, [items]);

  if (items === undefined) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Featured Crafts from Across India
          </h2>
          <div className="h-48 rounded-xl bg-gray-50 border animate-pulse" />
        </div>
      </section>
    );
  }

  if (list.length === 0) return null;

  // Duplicate list for seamless looping
  const doubled = [...list, ...list];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Featured Crafts from Across India
        </h2>
        <div className="group overflow-hidden rounded-xl border bg-white">
          <div
            className="featured-marquee flex items-stretch gap-4 whitespace-nowrap group-hover:[animation-play-state:paused]"
            aria-label="Featured crafts marquee"
          >
            {doubled.map((item, idx) => (
              <article
                key={`${item._id}-${idx}`}
                className="min-w-[220px] sm:min-w-[260px] w-[220px] sm:w-[260px] shrink-0 rounded-xl border bg-white hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-gray-100">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.productName || item.artisanName || "Featured craft"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100" />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {item.productName || "Handcrafted Piece"}
                  </h3>
                  <p className="text-xs text-gray-600 truncate">
                    {item.artisanName ? `by ${item.artisanName}` : "by Artisan"}
                  </p>
                  {typeof item.price === "number" ? (
                    <p className="mt-1 text-sm font-semibold text-gray-900">₹{item.price}</p>
                  ) : (
                    <p className="mt-1 text-sm text-gray-700">₹ —</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
