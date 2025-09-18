import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function Artisans() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold">For Artisans</h1>
          <p className="mt-2 opacity-90">How it works, pricing & benefits, and success stories.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">How It Works</h2>
          <ol className="list-decimal pl-5 text-neutral-700 space-y-1">
            <li>Upload a photo of your craft</li>
            <li>Record a short voice note describing your craft</li>
            <li>AI generates your product page: enhanced image, description, captions</li>
            <li>Share your page and receive buyer messages via WhatsApp</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">Pricing & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="font-semibold text-lg">Starter</div>
                <div className="text-3xl font-bold mt-2">Free</div>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> 3 product pages</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Basic AI descriptions</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="font-semibold text-lg">Pro</div>
                <div className="text-3xl font-bold mt-2">₹499/mo</div>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Unlimited pages</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Photo enhancement</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Priority processing</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="font-semibold text-lg">Studio</div>
                <div className="text-3xl font-bold mt-2">₹1,499/mo</div>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Team accounts</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Advanced captions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Analytics export</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center border rounded-xl p-8 bg-[#f7f7f5]">
          <h3 className="text-xl font-semibold text-neutral-900">Ready to share your craft?</h3>
          <p className="text-neutral-700 mt-1">Join KalaConnect and upload your first craft in minutes.</p>
          <div className="mt-4 flex gap-2 justify-center">
            <Button className="bg-neutral-900 hover:bg-neutral-800 text-white" onClick={() => navigate("/auth")}>Join as Artisan</Button>
            <Button variant="outline" onClick={() => navigate("/upload")}>Upload a Craft</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
