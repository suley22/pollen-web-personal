"use client";

import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useJobManagement } from "./useJobManagement";
import {
  Users,
  Eye,
  Search,
  Star,
  Building2,
  Calendar,
  UserCircle,
} from "lucide-react";
import Filters from "./_components/filters";
import JobListSection from "./_components/JobListSection";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "../router";
import { PageHeader } from "@/components/design-system/page-header";
import { PrimaryButton } from "@/components/design-system/primary-button";

export default function JobsManagmentPage() {
  const router = useRouter();
  const { form } = useJobManagement();

  return (
    <div className="min-h-screen w-full bg-gray-50 ">
      <div className="py-6">
        <PageHeader title="Jobs" description="Manage your job listings">
          <PrimaryButton
            icon={<Plus />}
            text="Create"
            //TODO: habilitar creación de trabajos
          />
        </PageHeader>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Filters form={form} />

        <JobListSection form={form} />
      </div>
    </div>
  );
}
