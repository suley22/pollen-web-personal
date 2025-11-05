"use client";

import { useState } from "react";
import { PageHeader } from "@/components/design-system/page-header";
import { PageContainer, Filters } from "@/components/design-system";
import { useAppSettingsPage } from "./_hooks/app-settings-hook";
import { SettingsList } from "./_components/settings-list";

export default function AppConfigPage() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const {
    settings,
    loading,
    error,
    pagination,
    handleCreateSetting,
    isCreatingSetting,
    handleUpdateSetting,
    isUpdatingSetting,
    handleDeleteSetting,
    isDeletingSetting,
    handlePageChange,
    handlePageSizeChange,
  } = useAppSettingsPage(debouncedSearchTerm);

  return (
    <PageContainer>
      <PageHeader
        title="Application Settings"
        subtitle="Manage application configuration and environment variables"
      />

      <Filters
        onSearchChange={setDebouncedSearchTerm}
        searchPlaceholder="Search settings by key or description..."
        filters={[]}
      />

      <div className="flex flex-col gap-4">
        <SettingsList
          settings={settings}
          loading={loading}
          onCreateSetting={handleCreateSetting}
          isCreatingSetting={isCreatingSetting}
          onUpdateSetting={handleUpdateSetting}
          isUpdatingSetting={isUpdatingSetting}
          onDeleteSetting={handleDeleteSetting}
          isDeletingSetting={isDeletingSetting}
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
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
