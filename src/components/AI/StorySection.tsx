import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface StorySectionProps {
  aiStory?: string;
  aiCaption?: string;
  aiTags?: string[];
}

export function StorySection({ aiStory, aiCaption, aiTags }: StorySectionProps) {
  if (!aiStory && !aiCaption && !aiTags?.length) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI-Generated Story
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiStory && (
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Product Story</h4>
            <p className="text-gray-900 leading-relaxed">{aiStory}</p>
          </div>
        )}
        
        {aiCaption && (
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Social Media Caption</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm whitespace-pre-line">{aiCaption}</p>
            </div>
          </div>
        )}
        
        {aiTags && aiTags.length > 0 && (
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">AI-Generated Tags</h4>
            <div className="flex flex-wrap gap-2">
              {aiTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
