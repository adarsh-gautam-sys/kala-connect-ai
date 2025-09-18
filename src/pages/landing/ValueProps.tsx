import { Sparkles, Upload, Globe } from "lucide-react";

export function ValueProps() {
  return (
    <section className="py-14 md:py-18 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl bg-gradient-to-br from-[#faf6f2] to-white">
            <div className="w-11 h-11 rounded-full bg-[#a4553b] text-white flex items-center justify-center mb-4">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">AI-Powered Storytelling</h3>
            <p className="text-gray-600 text-sm">Turn voice notes into compelling product stories and captions.</p>
          </div>

          <div className="p-6 border rounded-xl bg-gradient-to-br from-[#faf6f2] to-white">
            <div className="w-11 h-11 rounded-full bg-[#8f4731] text-white flex items-center justify-center mb-4">
              <Upload className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Instant Digital Storefront</h3>
            <p className="text-gray-600 text-sm">Create a polished page for your craft in minutes.</p>
          </div>

          <div className="p-6 border rounded-xl bg-gradient-to-br from-[#faf6f2] to-white">
            <div className="w-11 h-11 rounded-full bg-[#73402b] text-white flex items-center justify-center mb-4">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Global Reach for Local Crafts</h3>
            <p className="text-gray-600 text-sm">Share with buyers worldwide and grow your audience.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
