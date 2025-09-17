import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Plus, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const crafts = useQuery(api.crafts.getUserCrafts);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploading":
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "uploading":
        return "अपलोड हो रहा है";
      case "processing":
        return "प्रोसेसिंग हो रही है";
      case "completed":
        return "तैयार है";
      case "failed":
        return "असफल";
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                नमस्ते, {user.name || "कलाकार"}
              </h1>
              <p className="text-gray-600">आपके शिल्प का डैशबोर्ड</p>
            </div>
            <Button
              onClick={() => navigate("/upload")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              नया शिल्प जोड़ें
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!crafts || crafts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              अभी तक कोई शिल्प नहीं
            </h3>
            <p className="text-gray-600 mb-6">
              अपना पहला शिल्प अपलोड करें और अपना उत्पाद पेज बनाएं
            </p>
            <Button
              onClick={() => navigate("/upload")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              शुरू करें
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crafts.map((craft, index) => (
              <motion.div
                key={craft._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{craft.artisanName}</CardTitle>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(craft.status)}
                        <span className="text-sm text-gray-600">
                          {getStatusText(craft.status)}
                        </span>
                      </div>
                    </div>
                    <CardDescription>
                      {new Date(craft._creationTime).toLocaleDateString("hi-IN")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {craft.craftPhotoUrl && (
                      <div className="aspect-square rounded-lg overflow-hidden mb-4">
                        <img
                          src={craft.craftPhotoUrl}
                          alt="Craft"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      {craft.status === "completed" ? (
                        <Button
                          onClick={() => navigate(`/craft/${craft._id}`)}
                          className="flex-1"
                          variant="default"
                        >
                          पेज देखें
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="flex-1"
                          variant="outline"
                        >
                          {craft.status === "processing" ? "प्रोसेसिंग..." : "प्रतीक्षा करें"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
