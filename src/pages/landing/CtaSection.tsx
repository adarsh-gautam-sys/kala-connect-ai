import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  t: Record<string, string>;
  isLoading: boolean;
  onGetStarted: () => void;
};

export function CtaSection({ t, isLoading, onGetStarted }: Props) {
  return (
    <section className="py-16 md:py-20 bg-[#f7f7f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
          <p className="text-lg text-gray-600 mb-8">{t.ctaSub}</p>
          <Button
            size="lg"
            onClick={onGetStarted}
            disabled={isLoading}
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-lg px-10 py-4"
          >
            <Upload className="mr-2 h-5 w-5" />
            {t.ctaBtn}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
