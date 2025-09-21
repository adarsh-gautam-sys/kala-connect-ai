import { Button } from "@/components/ui/button";

type Props = {
  onShopNow: () => void;
  onGetStarted: () => void;
  title: string;
  subtitleStrong: string;
  subtitleRest: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export function Hero({ onShopNow, onGetStarted, title, subtitleStrong, subtitleRest, body, ctaPrimary, ctaSecondary }: Props) {
  return (
    <section className="border-b">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="flex items-center"
          style={{
            background:
              "radial-gradient(1200px 600px at -10% 20%, rgba(230, 212, 192, 0.6), transparent 60%), linear-gradient(180deg, #f7f3ee 0%, #efe7de 100%)",
          }}
        >
          <div className="w-full max-w-2xl mx-auto px-6 py-16 md:py-24">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {title}
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-200">
                <span className="font-semibold">{subtitleStrong}</span>{" "}
                {subtitleRest}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300">
                {body}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-[#a4553b] hover:bg-[#8f4731] text-white transition-colors" onClick={onShopNow}>
                  {ctaPrimary}
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-neutral-900"
                  onClick={onGetStarted}
                >
                  {ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[420px] md:h-[560px] lg:h-full">
          <img
            src="https://harmless-tapir-303.convex.cloud/api/storage/d8a1de6d-57da-44b9-a928-9e6322def17a"
            alt="Artisan pottery in progress"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}