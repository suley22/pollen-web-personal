import { BarChart3, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeFooter() {
  return (
    <div className="bg-white rounded-lg shadow-sm border ">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            size="md"
            variant="outline"
            className="justify-start h-12"
            //  onClick={() => setLocation("/admin/comprehensive-analytics")} //TODO:
          >
            <BarChart3 className="w-5 h-5 mr-3 text-blue-600" />
            <div className="text-left">
              <div className="font-medium">Analytics Dashboard</div>
              <div className="text-xs text-gray-500">
                View comprehensive insights
              </div>
            </div>
          </Button>
          <Button
            size="md"
            variant="outline"
            className="justify-start h-12"
            //  onClick={() => setLocation("/admin/hidden-jobs")} //TODO:
          >
            <Eye className="w-5 h-5 mr-3 text-purple-600" />
            <div className="text-left">
              <div className="font-medium">Hidden Jobs Board</div>
              <div className="text-xs text-gray-500">
                Manage exclusive opportunities
              </div>
            </div>
          </Button>

          <Button
            size="md"
            variant="outline"
            className="justify-start h-12"
            //  onClick={() => setLocation("/admin/all-job-seekers")} //TODO:
          >
            <Users className="w-5 h-5 mr-3 text-green-600" />
            <div className="text-left">
              <div className="font-medium">Community</div>
              <div className="text-xs text-gray-500">Manage user profiles</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
