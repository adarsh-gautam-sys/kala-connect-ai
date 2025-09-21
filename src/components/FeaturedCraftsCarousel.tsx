import React from "react";

type FeaturedItem = {
  _id: string;
  imageUrl: string | null;
  productName?: string;
  artisanName?: string;
  price?: number | null;
};

export default function FeaturedCraftsCarousel() {
  // Add: curated examples (replaces current products)
  const examples: FeaturedItem[] = [
    {
      _id: "ex-1",
      imageUrl:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop",
      productName: "Terracotta Vase",
      artisanName: "Asha Verma",
      price: 1499,
    },
    {
      _id: "ex-2",
      imageUrl:
        "https://images.unsplash.com/photo-1523419409543-05aece9b77be?q=80&w=800&auto=format&fit=crop",
      productName: "Handcrafted Bowl",
      artisanName: "Ravi Kumar",
      price: 899,
    },
    {
      _id: "ex-3",
      imageUrl:
        "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop",
      productName: "Clay Planter",
      artisanName: "Meera Singh",
      price: 1299,
    },
    {
      _id: "ex-4",
      imageUrl:
        "https://images.unsplash.com/photo-1543599538-a6c4d7f9a63c?q=80&w=800&auto=format&fit=crop",
      productName: "Glazed Pitcher",
      artisanName: "Irfan Ali",
      price: 1799,
    },
    {
      _id: "ex-5",
      imageUrl:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=800&auto=format&fit=crop",
      productName: "Artisan Mug",
      artisanName: "Sita Devi",
      price: 499,
    },
    {
      _id: "ex-6",
      imageUrl:
        "https://images.unsplash.com/photo-1549049950-48d5887197a1?q=80&w=800&auto=format&fit=crop",
      productName: "Decorative Plate",
      artisanName: "Nikhil Patil",
      price: 1199,
    },
    {
      _id: "ex-7",
      imageUrl:
        "https://images.unsplash.com/photo-1585384428579-2edcdd2bc89b?q=80&w=800&auto=format&fit=crop",
      productName: "Mini Planter Set",
      artisanName: "Rina Joshi",
      price: 999,
    },
    {
      _id: "ex-8",
      imageUrl:
        "https://images.unsplash.com/photo-1609951651576-cdc04f484332?q=80&w=800&auto=format&fit=crop",
      productName: "Studio Bowl",
      artisanName: "Vijay Sharma",
      price: 1099,
    },
    {
      _id: "ex-9",
      imageUrl:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop",
      productName: "Sculpted Cup",
      artisanName: "Leela Rao",
      price: 699,
    },
    {
      _id: "ex-10",
      imageUrl:
        "https://images.unsplash.com/photo-1591195853828-11db59f5d2ca?q=80&w=800&auto=format&fit=crop",
      productName: "Textured Vase",
      artisanName: "Arun Das",
      price: 1599,
    },
    {
      _id: "ex-11",
      imageUrl:
        "https://images.unsplash.com/photo-1518134346374-184f7cc09f5c?q=80&w=800&auto=format&fit=crop",
      productName: "Stoneware Jar",
      artisanName: "Pooja Nair",
      price: 1399,
    },
    {
      _id: "ex-12",
      imageUrl:
        "https://images.unsplash.com/photo-1556910633-5099dc3971b3?q=80&w=800&auto=format&fit=crop",
      productName: "Serving Dish",
      artisanName: "Dev Patel",
      price: 1699,
    },
  ];

  // Use the examples for display and duplicate for seamless loop
  const list = React.useMemo<FeaturedItem[]>(() => examples, []);
  if (list.length === 0) return null;
  const doubled = [...list, ...list];

  return (
    <section id="shop" className="py-12 bg-white">
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