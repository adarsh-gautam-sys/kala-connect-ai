import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

type Props = {
  features: ReadonlyArray<Feature>;
  title: string;
  subtitle: string;
};

export function HowItWorks({ features, title, subtitle }: Props) {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              viewport={{ once: true }}
            >
              <Card className="text-left p-6 h-full border-0 bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="pt-4">
                  <div className="w-12 h-12 bg-neutral-900/90 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}