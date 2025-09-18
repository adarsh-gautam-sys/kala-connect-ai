import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  material: string;
  artisan: string;
  category: "Ceramics" | "Paintings" | "Textiles" | "Sculptures" | "Jewelry";
};

const ALL_PRODUCTS: ReadonlyArray<Product> = [
  { id: "c1", title: "Terracotta Vase", price: 1499, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop", material: "Clay", artisan: "Asha", category: "Ceramics" },
  { id: "c2", title: "Wheel-thrown Bowl", price: 1199, image: "https://images.unsplash.com/photo-1523419409543-05aece9b77be?q=80&w=800&auto=format&fit=crop", material: "Clay", artisan: "Ravi", category: "Ceramics" },
  { id: "p1", title: "Watercolor Landscape", price: 3499, image: "https://images.unsplash.com/photo-1484312152213-d713e8b7c053?q=80&w=800&auto=format&fit=crop", material: "Watercolor", artisan: "Mira", category: "Paintings" },
  { id: "t1", title: "Handloom Scarf", price: 999, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop", material: "Cotton", artisan: "Rohit", category: "Textiles" },
  { id: "s1", title: "Wooden Figurine", price: 2799, image: "https://images.unsplash.com/photo-1544551763-7ef03864b6bd?q=80&w=800&auto=format&fit=crop", material: "Wood", artisan: "Neel", category: "Sculptures" },
  { id: "j1", title: "Brass Earrings", price: 1299, image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=800&auto=format&fit=crop", material: "Brass", artisan: "Kavya", category: "Jewelry" },
] as const;

const CATEGORIES = ["Ceramics", "Paintings", "Textiles", "Sculptures", "Jewelry"] as const;
const MATERIALS = ["Any", "Clay", "Watercolor", "Cotton", "Wood", "Brass"] as const;

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialCategory = (params.get("category") as Product["category"]) || "Ceramics";

  const [category, setCategory] = useState<Product["category"]>(initialCategory);
  const [material, setMaterial] = useState<(typeof MATERIALS)[number]>("Any");
  const [artisan, setArtisan] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);

  const filtered = useMemo(() => {
    return ALL_PRODUCTS.filter(p =>
      p.category === category &&
      (material === "Any" || p.material === material) &&
      p.price >= priceRange[0] && p.price <= priceRange[1] &&
      p.artisan.toLowerCase().includes(artisan.toLowerCase())
    );
  }, [category, material, priceRange, artisan]);

  const handleCategoryClick = (c: Product["category"]) => {
    setCategory(c);
    navigate(`/shop?category=${encodeURIComponent(c)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-[#f7f3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Shop {category}</h1>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <Button key={c} variant={c === category ? "default" : "outline"} onClick={() => handleCategoryClick(c)}>
                  {c}
                </Button>
              ))}
            </div>
          </div>
          <p className="text-neutral-700 mt-2">Discover handcrafted {category.toLowerCase()} from talented artisans.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <div className="font-semibold mb-2">Price (₹)</div>
            <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={5000} step={100} />
            <div className="text-sm text-neutral-600 mt-1">₹{priceRange[0]} - ₹{priceRange[1]}</div>
          </div>

          <div>
            <div className="font-semibold mb-2">Material</div>
            <Select value={material} onValueChange={(v) => setMaterial(v as (typeof MATERIALS)[number])}>
              <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
              <SelectContent>
                {MATERIALS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="font-semibold mb-2">Artisan Name</div>
            <Input placeholder="e.g., Asha" value={artisan} onChange={(e) => setArtisan(e.target.value)} />
          </div>

          <Button variant="outline" onClick={() => { setMaterial("Any"); setArtisan(""); setPriceRange([0,5000]); }}>
            Reset Filters
          </Button>
        </aside>

        <main>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-600">No items match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary">{item.material}</Badge>
                            <Badge variant="outline">{item.artisan}</Badge>
                          </div>
                        </div>
                        <div className="text-right font-semibold text-gray-900">₹{item.price}</div>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
