"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  BarChart3,
  Building2,
  FileText,
  Plus,
  Eye,
  Users,
  TrendingUp,
} from "lucide-react";
import { AdminRoutes } from "../../router";

export function HomeCards() {
  const router = useRouter();

  const stats = {
    totalCommunityMembers: 1247,
    newSignupsToday: 8,
    totalEmployers: 184,
    newEmployersRequiringApproval: 11,
    liveJobs: 25,
    pendingJobApprovals: 7,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Job Seekers Card */}
      <Card className="border-2 border-purple-200 bg-purple-50 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between pointer-events-none mb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Community
              </p>
              <p className="text-3xl font-semibold">
                {stats?.totalCommunityMembers.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 pointer-events-none mb-2 text-sm text-green-600 font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>+{stats?.newSignupsToday} today</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-purple-50 hover:bg-purple-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/admin/community/members");
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-purple-50 hover:bg-purple-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/admin/community/analytics/");
              }}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Company Profiles Card */}
      <Card className="border-2 border-orange-200 bg-orange-50 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between pointer-events-none mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Company Profiles
              </p>
              <p className="text-3xl font-semibold">3</p>
            </div>
            <div className="rounded-full bg-orange-100 p-4">
              <Building2 className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-orange-50 hover:bg-orange-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push(AdminRoutes.employers);
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-orange-50 hover:bg-orange-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push(AdminRoutes.employersCreate);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Card */}
      <Card className="border-2 border-pink-200 bg-pink-50 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between pointer-events-none mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Jobs</p>
              <p className="text-3xl font-semibold">{stats?.liveJobs}</p>
            </div>
            <div className="rounded-full bg-pink-100 p-4">
              <FileText className="h-8 w-8 text-pink-600" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-pink-50 hover:bg-pink-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push(AdminRoutes.jobs);
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-pink-50 hover:bg-pink-100"
              //TODO:
              // onClick={(e) => {
              //   e.stopPropagation();
              //   router.push();
              // }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
