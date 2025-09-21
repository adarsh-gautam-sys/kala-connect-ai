import { Sparkles, Upload, Globe } from "lucide-react";

type ValueItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string; // bg color class
};

type Props = {
  items: ReadonlyArray<ValueItem>;
};

export function ValueProps({ items }: Props) {
  return (
    <section className="py-14 md:py-18 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="p-6 border rounded-xl bg-gradient-to-br from-[#faf6f2] to-white dark:from-neutral-900 dark:to-neutral-950 dark:border-white/10">
              <div className={`w-11 h-11 rounded-full ${it.color} text-white flex items-center justify-center mb-4`}>
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{it.title}</h3>
              <p className="text-gray-600 dark:text-neutral-300 text-sm">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}