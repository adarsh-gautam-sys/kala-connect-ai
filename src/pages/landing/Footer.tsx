type Props = {
  t: Record<string, string>;
};

export function Footer({ t }: Props) {
  return (
    <footer id="footer" className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img
              src="https://harmless-tapir-303.convex.cloud/api/storage/7ee63668-6e97-4a67-8eac-1ace3a277f56"
              alt={`${t.brand} Logo`}
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">{t.brand}</span>
          </div>
          <div className="flex items-center space-x-6 text-gray-600">
            <a href="#" className="hover:text-neutral-900 transition-colors">
              {t.footerPrivacy}
            </a>
            <a href="#" className="hover:text-neutral-900 transition-colors">
              {t.footerTerms}
            </a>
            <a href="#" className="hover:text-neutral-900 transition-colors">
              {t.footerContact}
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-500">
          <p>© 2024 {t.brand}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}