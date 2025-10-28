"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Building2 } from "lucide-react";
import { RoleChangeConfirmDialog } from "../role-change-confirm-dialog";

const ROLE_OPTIONS = [
  { id: "1", name: "Admin", value: "admin" },
  { id: "2", name: "JobSeeker", value: "job_seeker" },
];

export function RolesList({ users, loading, onRoleChange, isUpdatingRole }) {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    userId: "",
    userName: "",
    currentRole: "",
    newRole: "",
  });

  const handleRoleChangeRequest = (userId, newRole) => {
    const user = users.find((u) => u.id === userId);
    if (!user || user.role === newRole) return;

    setConfirmDialog({
      isOpen: true,
      userId: userId,
      userName: `${user.first_name} ${user.last_name}`,
      currentRole: user.role,
      newRole: newRole,
    });
  };

  const confirmRoleChange = async () => {
    const { userId, newRole } = confirmDialog;
    try {
      await onRoleChange(userId, newRole);
      setConfirmDialog({
        isOpen: false,
        userId: "",
        userName: "",
        currentRole: "",
        newRole: "",
      });
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      userId: "",
      userName: "",
      currentRole: "",
      newRole: "",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading profiles...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-lg border overflow-hidden">
        <table className="flex flex-col w-full table-auto">
          <thead className="flex bg-gray-50 border-b">
            <tr className="flex w-full">
              <th className="flex flex-1 text-left py-3 px-4 font-medium text-gray-900">
                User
              </th>
              <th className="flex flex-1 text-left py-3 px-4 font-medium text-gray-900">
                Email
              </th>
              <th className="flex flex-1 text-right py-3 px-4 font-medium text-gray-900">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          className="rounded-md"
                          src={user.avatar_url}
                          alt={`${user.first_name}`}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          <Building2 className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-sm font-medium">
                      {user.first_name} {user.last_name}
                    </span>
                  </div>
                </td>

                <td className="py-2 px-4">
                  <span className="text-sm text-gray-600">{user.email}</span>
                </td>

                <td className="py-2 px-4">
                  <div className="flex justify-end">
                    <Select
                      key={`${user.id}-${user.role}`}
                      onValueChange={(role) => handleRoleChangeRequest(user.id, role)}
                      value={user.role}
                      disabled={isUpdatingRole}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Assign a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE_OPTIONS.map((role) => (
                          <SelectItem key={role.id} value={role.value}>
                            {role.name}
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

      <RoleChangeConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmRoleChange}
        userName={confirmDialog.userName}
        currentRole={confirmDialog.currentRole}
        newRole={confirmDialog.newRole}
      />
    </>
  );
}