import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you soon.");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f7f3ee] border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Contact Us</h1>
          <p className="mt-2 text-neutral-700">Business email: <a className="underline" href="mailto:support@kalaconnect.com">support@kalaconnect.com</a></p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input name="name" placeholder="Your name" required />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea name="message" placeholder="How can we help?" required rows={5} />
              </div>
              <Button type="submit" disabled={loading} className="bg-neutral-900 hover:bg-neutral-800 text-white">
                {loading ? "Sending..." : "Send"}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
