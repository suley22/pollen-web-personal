"use client";

import { useRoleManagment } from "./useRoleManagment";
import { RoleChangeConfirmDialog } from "./role-change-confirm-dialog";
import { User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

export default function RoleManagmentPage() {
  const { form } = useRoleManagment();
  const role = [
    { id: "1", name: "Admin", value: "admin" },
    { id: "2", name: "JobSeeker", value: "job_seeker" },
  ];

  return form.loading ? (
    <div className="flex justify-center items-center py-8">
      <div className="text-gray-500">Loading profiles...</div>
    </div>
  ) : (
    <div>
      <div className="mx-auto p-4 space-y-4">
        <div className="text-left mb-6">
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3 mb-3">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, or industries..."
                  value={form.searchTerm}
                  onChange={(e) => form.setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Jobs Display */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="w-auto" style={{ width: "1%" }} />
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Email
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium text-gray-900 w-auto"
                    style={{ width: "1%" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {form.profiles.map((jobSeeker) => (
                  <tr key={jobSeeker.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 w-auto" style={{ width: "1%" }}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6  text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <span className="text-sm">
                          {jobSeeker.first_name} {jobSeeker.last_name}
                        </span>
                      </div>
                    </td>

                    <td className="py-2 px-4">
                      <div className="flex items-left">
                        <span className="text-sm">{jobSeeker.email}</span>
                      </div>
                    </td>

                    <td className="py-2 px-4 w-auto" style={{ width: "1%" }}>
                      <div className="flex">
                        <Select
                          key={`${jobSeeker.id}-${jobSeeker.role}`}
                          onValueChange={(role) =>
                            form.onHandleRoleChange(jobSeeker.id, role)
                          }
                          placeholder="Assign a role"
                          value={jobSeeker.role}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Assign a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {role.map((v) => (
                              <SelectItem
                                key={String(v.id)}
                                value={String(v.value)}
                              >
                                {v.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Diálogo de confirmación para cambio de rol */}
      <RoleChangeConfirmDialog
        isOpen={form.confirmDialog.isOpen}
        onClose={form.closeConfirmDialog}
        onConfirm={form.confirmRoleChange}
        userName={form.confirmDialog.userName}
        currentRole={form.confirmDialog.currentRole}
        newRole={form.confirmDialog.newRole}
      />
    </div>
  );
}
