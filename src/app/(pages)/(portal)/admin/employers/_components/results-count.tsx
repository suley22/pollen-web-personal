"use client";

import { useEmployerManagementContext } from "@/admin/employers/_context/EmployerManagementContext";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultsCount() {
  const { employers, loading, selectedStatus, searchTerm } =
    useEmployerManagementContext();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "approved";
      case "pending":
        return "pending";
      case "rejected":
        return "rejected";
      default:
        return "";
    }
  };

  const getFilterDescription = () => {
    const parts = [];

    if (searchTerm.trim()) {
      parts.push(`matching "${searchTerm}"`);
    }

    if (selectedStatus !== "all") {
      parts.push(`with status ${getStatusLabel(selectedStatus)}`);
    }

    return parts.length > 0 ? ` ${parts.join(" and ")}` : "";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-48 bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {employers.length}
        </span>{" "}
        {employers.length === 1 ? "company" : "companies"}
        {getFilterDescription()}
      </p>
    </div>
  );
}
