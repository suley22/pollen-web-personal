"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { useEmployerManagement } from "./useEmployerManagement";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";
import { Search, ArrowLeft } from "lucide-react";
import { EmployerList } from "./(components)/employer-list";

export default function AdminEmployersManagment() {
  const router = useRouter();
  const { form } = useEmployerManagement();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-row">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
        </Button>
        <h1 className="text-4xl px-4 font-bold text-gray-900">
          Employers Management
        </h1>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-grow relative bg-white">
            <Search
              className="absolute left-3 top-1/2
            transform -translate-y-1/2
            h-4 w-4
            text-gray-400"
            />
            <Input
              placeholder="Search companies or industries..."
              value={form.searchTerm}
              onChange={(e) => form.setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-grow">
            <select
              value={form.selectedStatus}
              onChange={(e) => form.setSelectedStatus(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex flex-grow justify-end items-center">
            <PrimaryButton
              text="Add +"
              onClick={router.push.bind(
                this,
                "/admin/employers-managment/create",
              )}
              className=""
            />
          </div>
        </div>
        <EmployerList />
      </div>
    </div>
  );
}
