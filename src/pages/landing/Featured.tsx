import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Demo = {
  id: string;
  title: string;
  price: string;
  image: string;
  blurb: string;
};

type Props = {
  demos: ReadonlyArray<Demo>;
  lang: "en" | "hi";
  onGetStarted: () => void;
};

export function Featured({ demos, lang, onGetStarted }: Props) {
  return (
    <section id="shop" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {lang === "en" ? "Featured Crafts" : "विशेष शिल्प"}
          </h2>
          <p className="text-lg text-gray-600">
            {lang === "en"
              ? "A glimpse of how artisan products will look in your storefront"
              : "आपके स्टोरफ्रंट में उत्पाद ऐसे दिखाई देंगे"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.blurb}</p>
                    </div>
                    <div className="text-right font-semibold text-gray-900">{item.price}</div>
                  </div>
                  <div className="mt-4">
                    <Button
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
                      onClick={onGetStarted}
                    >
                      {lang === "en" ? "View Details" : "विवरण देखें"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
