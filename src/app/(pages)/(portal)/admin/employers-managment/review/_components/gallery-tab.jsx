import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, Camera } from "lucide-react";
import { useState } from "react";

export default function GalleryTab() {
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <TabsContent value="gallery">
      <Card className={"p-6"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle style={{ fontFamily: "Sora" }}>
              Company Gallery
            </CardTitle>
            <Button
              onClick={() =>
                setExpandedSection(
                  expandedSection === "gallery" ? null : "gallery",
                )
              }
              variant="outline"
              style={{ fontFamily: "Sora" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Photos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {expandedSection === "gallery" ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3" style={{ fontFamily: "Sora" }}>
                  Upload Photos
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Photo Category
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Office Space</option>
                      <option>Team Events</option>
                      <option>Work Environment</option>
                      <option>Company Culture</option>
                      <option>Social Activities</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">
                        Drag & drop images here or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Caption (optional)
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Add a caption for these photos..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" style={{ fontFamily: "Sora" }}>
                      Upload Photos
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setExpandedSection(null)}
                      style={{ fontFamily: "Sora" }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600" style={{ fontFamily: "Poppins" }}>
                Share authentic photos of your team, office space, and company
                events to give candidates a feel for your culture.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
