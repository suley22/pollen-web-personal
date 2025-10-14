"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdminRoutes } from "@/admin/router";
import {
  BarChart3,
  Building2,
  FileText,
  Plus,
  Eye,
  Users,
  TrendingUp,
} from "lucide-react";

export function HomeCards() {
  const router = useRouter();

  const stats = {
    totalCommunityMembers: 1247,
    newSignupsToday: 8,
    totalEmployers: 184,
    newEmployersRequiringApproval: 11,
    liveJobs: 23,
    pendingJobApprovals: 7,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Job Seekers Card */}
      <Card
        className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-blue-50 shadow-md p-6"
        onClick={() => router.push(AdminRoutes.allJobSeekers)}
      >
        <CardHeader className="pb-3 items-center">
          <CardTitle
            className="text-sm font-medium text-gray-900 flex "
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            <Users className="h-4 w-4 mr-2" />
            Community
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-baseline justify-between">
            <div className="px-1 text-2xl font-bold text-gray-900">
              {stats?.totalCommunityMembers.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center pt-2">
            <div className="flex flex-row items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                +{stats?.newSignupsToday} today
              </span>
            </div>
            <div className="flex flex-row">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs p-1"
                  //TODO:
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/admin/community/members");
                  }}
                >
                  <Users className="h-3 w-3 mr-1" />
                  View All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs p-1"
                  //TODO:
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/admin/community/analytics/");
                  }}
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Analytics
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Profiles Card */}
      <Card
        className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-orange-50 shadow-md p-6"
        onClick={() => router.push("/admin/employers-managment")}
      >
        <CardHeader className="pb-3">
          <CardTitle
            className="text-sm font-medium text-gray-900 flex items-center"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            <Building2 className="h-4 w-4 mr-2" />
            Company Profiles
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs p-1"
                //TODO:
                // onClick={(e) => {
                //   e.stopPropagation();
                //   router.push();
                // }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Create
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs p-1"
                //TODO:
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/admin/employers-managment");
                }}
              >
                <Eye className="h-3 w-3 mr-1" />
                View All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Card */}
      <Card
        className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-pink-50 shadow-md p-6"
        //TODO:
        onClick={() => router.push("/admin/jobs-managment")}
      >
        <CardHeader className="pb-3">
          <CardTitle
            className="text-sm font-medium text-gray-900 flex items-center"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            <FileText className="h-4 w-4 mr-2" />
            Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {stats?.liveJobs}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs p-1"
                //TODO:
                // onClick={(e) => {
                //   e.stopPropagation();
                //   router.push();
                // }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Create
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs p-1"
                //TODO:
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/admin/jobs-managment");
                }}
              >
                <Eye className="h-3 w-3 mr-1" />
                View All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
