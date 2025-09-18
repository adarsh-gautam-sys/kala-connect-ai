import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const POSTS = [
  {
    id: "s1",
    title: "From Clay to Craft: Asha’s Journey",
    excerpt: "How a small-town artisan found global buyers with a single product page...",
    image: "https://images.unsplash.com/photo-1508161250369-0c3b3e8a04a5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "s2",
    title: "The Weave of Tradition",
    excerpt: "Handloom textiles that tell stories of heritage and patience...",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "s3",
    title: "Sculpting Hope",
    excerpt: "Carving wood, carving a future — Neel’s wooden figurines...",
    image: "https://images.unsplash.com/photo-1544551763-7ef03864b6bd?q=80&w=1000&auto=format&fit=crop",
  },
] as const;

export default function Stories() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold">Stories & Blogs</h1>
          <p className="mt-2 opacity-90">Behind the scenes, journeys, and success stories from our artisan community.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTS.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700">{p.excerpt}</p>
                <Button variant="outline" className="mt-4">Read More</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
