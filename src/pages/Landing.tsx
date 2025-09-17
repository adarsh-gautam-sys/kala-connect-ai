import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { 
  Camera, 
  Mic, 
  Sparkles, 
  Users, 
  Globe, 
  ArrowRight,
  Upload,
  MessageCircle,
  Share2
} from "lucide-react";
import { useNavigate } from "react-router";

export default function Landing() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  const features = [
    {
      icon: Camera,
      title: "फोटो अपलोड करें",
      description: "अपने शिल्प की सुंदर तस्वीर लें और अपलोड करें"
    },
    {
      icon: Mic,
      title: "आवाज़ रिकॉर्ड करें",
      description: "अपने शिल्प के बारे में अपनी आवाज़ में बताएं"
    },
    {
      icon: Sparkles,
      title: "AI जादू",
      description: "हमारा AI आपके लिए प्रोफेशनल पेज बनाता है"
    },
    {
      icon: Share2,
      title: "शेयर करें",
      description: "सोशल मीडिया पर अपना शिल्प दुनिया के साथ साझा करें"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img
                src="./logo.svg"
                alt="कलाConnect Logo"
                width={40}
                height={40}
                className="rounded-lg cursor-pointer"
                onClick={() => navigate("/")}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                कलाConnect
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600">
                हमारे बारे में
              </Button>
              <Button 
                onClick={handleGetStarted}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isAuthenticated ? "डैशबोर्ड" : "शुरू करें"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                आपकी कला को
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}दुनिया तक{" "}
                </span>
                पहुंचाएं
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                सिर्फ एक फोटो और आवाज़ के साथ, AI की मदद से अपने हस्तशिल्प का 
                प्रोफेशनल प्रोडक्ट पेज बनाएं। कोई तकनीकी ज्ञान की जरूरत नहीं।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  अभी शुरू करें
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-3"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  डेमो देखें
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Camera className="h-16 w-16 text-blue-500" />
          </motion.div>
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="h-20 w-20 text-purple-500" />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              कैसे काम करता है?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              सिर्फ तीन आसान स्टेप्स में अपना प्रोडक्ट पेज तैयार करें
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              भारत के कलाकारों का भरोसा
            </h2>
            <p className="text-xl opacity-90 mb-12">
              हजारों कलाकार अपने शिल्प को दुनिया तक पहुंचा रहे हैं
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-lg opacity-90">खुश कलाकार</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">5000+</div>
                <div className="text-lg opacity-90">प्रोडक्ट पेज बनाए गए</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-lg opacity-90">भाषाओं में सपोर्ट</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              आज ही अपना पहला प्रोडक्ट पेज बनाएं
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              मुफ्त में शुरू करें। कोई क्रेडिट कार्ड की जरूरत नहीं।
            </p>
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-12 py-4"
            >
              <Upload className="mr-2 h-5 w-5" />
              अभी शुरू करें
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="./logo.svg"
                alt="कलाConnect Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">कलाConnect</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">
                प्राइवेसी पॉलिसी
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                नियम और शर्तें
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                संपर्क करें
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-500">
            <p>© 2024 कलाConnect. सभी अधिकार सुरक्षित।</p>
            <p className="mt-2 text-sm">
              Powered by{" "}
              <a
                href="https://vly.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                vly.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}