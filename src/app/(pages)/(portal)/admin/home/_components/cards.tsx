"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { HomeCardsSkeleton } from "./cards-skeleton";
import { DashboardStats } from "@/types/dashboard-stats";

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
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalCommunityMembers: 0,
    newSignupsToday: 0,
    totalEmployers: 0,
    newEmployersRequiringApproval: 0,
    liveJobs: 0,
    pendingJobApprovals: 0,
  });

  useEffect(() => {
    // Fetch real data from API
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error("Failed to fetch stats");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <HomeCardsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Job Seekers Card */}
      <Card className="border-2 border-purple-200 bg-purple-50 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between pointer-events-none">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Community
              </p>
              <p className="text-2xl font-bold">
                {stats?.totalCommunityMembers.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2 text-sm text-green-600 font-medium pointer-events-none">
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
                router.push(AdminRoutes.allJobSeekers);
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>

            {/* TODO: */}
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-purple-50 hover:bg-purple-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push("");
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
          <div className="flex items-start justify-between mb-6 pointer-events-none">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Employers
              </p>
              <p className="text-2xl font-bold">
                {stats?.totalEmployers.toLocaleString()}
              </p>
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
          <div className="flex items-start justify-between mb-6 pointer-events-none">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Jobs</p>
              <p className="text-2xl font-bold">{stats?.liveJobs}</p>
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
              onClick={(e) => {
                e.stopPropagation();
                router.push(AdminRoutes.jobsCreate);
              }}
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
