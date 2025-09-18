import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

const TEAM = [
  {
    name: "Divyansh Agarwal",
    role: "Vision & Strategy",
    bio: "Leads product vision and partnerships to scale artisan impact.",
    img: "https://placehold.co/400x400?text=Divyansh",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Adarsh Gautam",
    role: "Technology & Product",
    bio: "Builds the platform and AI workflows that power KalaConnect.",
    img: "https://placehold.co/400x400?text=Adarsh",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Harsh Sharma",
    role: "Community & Growth",
    bio: "Works with artisan communities and drives growth initiatives.",
    img: "https://placehold.co/400x400?text=Harsh",
    linkedin: "#",
    github: "#",
  },
] as const;

export default function Team() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold">Our Team</h1>
          <p className="mt-2 opacity-90">The people behind KalaConnect.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEAM.map(m => (
          <Card key={m.name} className="overflow-hidden">
            <div className="aspect-square">
              <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{m.name}</CardTitle>
              <div className="text-neutral-600">{m.role}</div>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700">{m.bio}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="icon" asChild><a href={m.linkedin} aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a></Button>
                <Button variant="outline" size="icon" asChild><a href={m.github} aria-label="GitHub"><Github className="h-4 w-4" /></a></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
