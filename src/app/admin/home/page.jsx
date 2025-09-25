"use client";

import {
  Bell,
  Badge,
  MessageSquare,
  BarChart3,
  Building2,
  FileText,
  Plus,
  Eye,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AdminHomePage() {
  const router = useRouter();
  const notifications = [];
  const stats = {
    totalCommunityMembers: 1247,
    newSignupsToday: 8,
    totalEmployers: 184,
    newEmployersRequiringApproval: 11,
    liveJobs: 23,
    pendingJobApprovals: 7,
  };

  return (
    <div className="min-h-screen bg-gray-50 admin-compact-mode pb-16">
      {/* Header with Alerts */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="font-bold text-gray-900 welcome-message">
              Welcome back, Holly 💛
            </h1>

            {/* Notification and Message Alerts */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                //TODO:
                // onClick={() => setLocation("/admin/notifications")}
                className="relative"
              >
                <Bell className="h-4 w-4 mr-1" />
                Notifications
                <Badge className="ml-2 bg-red-100 text-red-800 text-xs">
                  1
                </Badge>
              </Button>

              <Button
                variant="outline"
                size="sm"
                //TODO:
                //  onClick={() => setLocation("/admin/messages")}
                className="relative"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Messages
                <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">
                  8
                </Badge>
              </Button>

              {/* User Profile Icon */}
              <Button
                variant="outline"
                size="sm"
                //TODO:
                //  onClick={() => setLocation("/admin/settings")}
                className="relative p-1"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-sm bg-purple-500 text-white font-medium">
                    HS
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>

            {/* Notification Alerts */}
            {notifications.length > 0 && (
              <div className="pb-4 space-y-2">
                {notifications.map((notification) => (
                  <Alert
                    key={notification.id}
                    className={`cursor-pointer transition-colors ${
                      notification.type === "urgent"
                        ? "border-orange-200 bg-orange-50"
                        : "border-blue-200 bg-blue-50"
                    }`}
                    //TODO:
                    // onClick={() => setLocation(notification.route)}
                  >
                    <Bell className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <span>{notification.message}</span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Review →
                      </Button>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Top Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Job Seekers Card */}
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-blue-50 shadow-md p-6"
              onClick={() => router.push("/admin/community/members")}
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className="text-sm font-medium text-gray-900 flex items-center"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats?.totalCommunityMembers.toLocaleString()}
                  </div>
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
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    +{stats?.newSignupsToday} today
                  </span>
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
        </div>
      </div>
    </div>
  );
}
