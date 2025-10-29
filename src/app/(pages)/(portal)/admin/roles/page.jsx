"use client";

import { useState } from "react";
import { PageHeader } from "@/components/design-system/page-header";
import { PageContainer, Filters } from "@/components/design-system";
import { useRolesPage } from "./_hooks/roles-page-hook";
import { RolesList } from "./_components/roles-list";

export default function RoleManagmentPage() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const {
    users,
    loading,
    error,
    handleRoleChange,
    isUpdatingRole,
    handleDeleteUser,
    isDeletingUser,
  } = useRolesPage(debouncedSearchTerm);

  return (
    <PageContainer>
      <PageHeader
        title="Role Management"
        subtitle="Manage user roles and permissions"
      />

      <Filters
        onSearchChange={setDebouncedSearchTerm}
        searchPlaceholder="Search users by name or email..."
        filters={[]}
      />

      <div className="flex flex-col gap-4">
        <RolesList
          users={users}
          loading={loading}
          onRoleChange={handleRoleChange}
          isUpdatingRole={isUpdatingRole}
          onDeleteUser={handleDeleteUser}
          isDeletingUser={isDeletingUser}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm mt-2">
          Error: {error}
        </div>
      )}
    </PageContainer>
  );
}