import { motion } from "framer-motion";

type Props = {
  t: Record<string, string>;
};

export function Stats({ t }: Props) {
  return (
    <section className="py-16 md:py-20 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.trustedBy}</h2>
          <p className="text-lg opacity-90 mb-10">{t.trustedBody}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-1">{t.stat1}</div>
              <div className="opacity-90">{t.stat1Label}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-1">{t.stat2}</div>
              <div className="opacity-90">{t.stat2Label}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-1">{t.stat3}</div>
              <div className="opacity-90">{t.stat3Label}</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
