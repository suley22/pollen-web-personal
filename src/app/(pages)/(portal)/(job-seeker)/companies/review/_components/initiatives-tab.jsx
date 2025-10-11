import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, GraduationCap } from "lucide-react";

export default function InitiativesTab() {
    const [expandedSection, setExpandedSection] = useState(null);
  return (
    <Card className={"p-6"}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle style={{ fontFamily: "Sora" }}>
            Development Initiatives
          </CardTitle>
          <Button
            onClick={() =>
              setExpandedSection(
                expandedSection === "programmes" ? null : "programmes",
              )
            }
            variant="outline"
            style={{ fontFamily: "Sora" }}
          >
            <Plus className="w-4 h-4 mr-2" />
            {expandedSection === "programmes"
              ? "Cancel"
              : "Configure Initiatives"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {expandedSection === "programmes" ? (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-4" style={{ fontFamily: "Sora" }}>
                Entry-Level Development Initiatives
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Describe the specific development initiatives you offer to
                entry-level hires. Start with one and add more as needed:
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initiative 1
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="e.g. Graduate Mentorship Initiative"
                    />
                    <textarea
                      className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      rows={3}
                      placeholder="Describe this initiative, its duration, key components, and what new hires can expect..."
                    />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3 border-dashed border-pink-300 text-pink-600 hover:bg-pink-50"
                onClick={() => {
                  // Add new initiative functionality would go here
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Initiative
              </Button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-4" style={{ fontFamily: "Sora" }}>
                Additional Growth Opportunities
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Select the additional growth opportunities you offer (displayed
                as simple statements to job seekers):
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Clear career progression paths
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Leadership development initiatives
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Cross-functional project opportunities
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Conference speaking opportunities
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    External training and certifications
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Industry networking support
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    International assignment opportunities
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Innovation project participation
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button size="sm" style={{ fontFamily: "Sora" }}>
                Save Initiatives
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
        ) : (
          <div className="text-center py-8">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600" style={{ fontFamily: "Poppins" }}>
              Configure your development initiatives and growth opportunities to
              attract top entry-level talent.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
