"use client";

import { useState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Eye, EyeOff, Pencil, Trash2, Plus } from "lucide-react";
import { ResultsCount } from "@/app/(pages)/(portal)/admin/employers/_components/employers-page-results-count";
import { SettingEditDialog } from "./setting-edit-dialog";
import { SettingDeleteDialog } from "./setting-delete-dialog";
import { SettingCreateDialog } from "./setting-create-dialog";

export function SettingsList({
  settings,
  loading,
  onUpdateSetting,
  isUpdatingSetting,
  onDeleteSetting,
  isDeletingSetting,
  onCreateSetting,
  isCreatingSetting,
  pagination,
  handlePageChange,
  handlePageSizeChange,
}) {
  const [visibleValues, setVisibleValues] = useState({});
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    setting: null,
  });
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    settingId: "",
    settingKey: "",
  });
  const [createDialog, setCreateDialog] = useState({
    isOpen: false,
  });

  const toggleValueVisibility = (settingId) => {
    setVisibleValues((prev) => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));
  };

  const handleEditRequest = (setting) => {
    setEditDialog({
      isOpen: true,
      setting: setting,
    });
  };

  const confirmEdit = async (updatedSetting) => {
    try {
      await onUpdateSetting(updatedSetting);
      setEditDialog({
        isOpen: false,
        setting: null,
      });
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  };

  const closeEditDialog = () => {
    setEditDialog({
      isOpen: false,
      setting: null,
    });
  };

  const handleDeleteRequest = (settingId, settingKey) => {
    setDeleteDialog({
      isOpen: true,
      settingId: settingId,
      settingKey: settingKey,
    });
  };

  const confirmDelete = async () => {
    const { settingId } = deleteDialog;
    try {
      await onDeleteSetting(settingId);
      setDeleteDialog({
        isOpen: false,
        settingId: "",
        settingKey: "",
      });
    } catch (error) {
      console.error("Error deleting setting:", error);
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      settingId: "",
      settingKey: "",
    });
  };

  const handleCreateRequest = () => {
    setCreateDialog({
      isOpen: true,
    });
  };

  const confirmCreate = async (newSetting) => {
    try {
      await onCreateSetting(newSetting);
      setCreateDialog({
        isOpen: false,
      });
    } catch (error) {
      console.error("Error creating setting:", error);
    }
  };

  const closeCreateDialog = () => {
    setCreateDialog({
      isOpen: false,
    });
  };

  const formatValue = (value, isSensitive, settingId) => {
    if (isSensitive && !visibleValues[settingId]) {
      return "••••••••";
    }
    return value;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <div className="flex justify-between items-center">
          <ResultsCount
            pagination={pagination}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
          <Button
            onClick={handleCreateRequest}
            disabled={isCreatingSetting}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Setting
          </Button>
        </div>

        <div className="w-full bg-white rounded-lg border overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-1/6">
                  Key
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-1/4">
                  Value
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-1/4">
                  Description
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-900 w-1/12">
                  Sensitive
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-1/6">
                  Updated At
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-900 w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {settings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No settings found. Click &quot;Add New Setting&quot; to create one.
                  </td>
                </tr>
              ) : (
                settings.map((setting) => (
                  <tr key={setting.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="text-sm font-mono font-medium text-blue-600">
                        {setting.key}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900 font-mono break-all">
                          {formatValue(
                            setting.value,
                            setting.is_sensitive,
                            setting.id
                          )}
                        </span>
                        {setting.is_sensitive && (
                          <button
                            onClick={() => toggleValueVisibility(setting.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {visibleValues[setting.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {setting.description || "-"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      {setting.is_sensitive ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          No
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-xs text-gray-500">
                        {formatDate(setting.updated_at)}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditRequest(setting)}
                          disabled={isUpdatingSetting}
                          className="flex items-center gap-1"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleDeleteRequest(setting.id, setting.key)
                          }
                          disabled={isDeletingSetting}
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ResultsCount
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>

      <SettingEditDialog
        isOpen={editDialog.isOpen}
        onClose={closeEditDialog}
        onConfirm={confirmEdit}
        setting={editDialog.setting}
      />

      <SettingDeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        settingKey={deleteDialog.settingKey}
      />

      <SettingCreateDialog
        isOpen={createDialog.isOpen}
        onClose={closeCreateDialog}
        onConfirm={confirmCreate}
      />
    </>
  );
}
