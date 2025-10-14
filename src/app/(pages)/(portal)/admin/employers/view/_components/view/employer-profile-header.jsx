"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert";
import {
  ArrowLeft,
  Edit,
  Globe,
  CheckCircle,
  EyeOff,
  Save,
  Trash2,
  X,
} from "lucide-react";

export function EmployerProfileHeader({
  companyName,
  companyStatus,
  isEditing,
  editData,
  onBack,
  onInputChange,
  onSave,
  onCancel,
  onEdit,
  onSetLive,
  onHideProfile,
  onDelete,
  onOpenEmployerPortal,
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          {isEditing ? (
            <Input
              type="text"
              value={editData?.company_name || ""}
              onChange={(e) => onInputChange("company_name", e.target.value)}
              placeholder="Company name"
              className="text-3xl font-bold bg-transparent border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div className="text-3xl font-bold">{companyName}</div>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button onClick={onSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </>
        ) : (
          <>
            {companyStatus === "draft" && (
              <Button
                size="sm"
                onClick={onSetLive}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Set Live
              </Button>
            )}
            {companyStatus === "live" && (
              <Button
                variant="outline"
                size="sm"
                onClick={onHideProfile}
                className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Profile
              </Button>
            )}
            {companyStatus === "hidden" && (
              <Button
                size="sm"
                onClick={onSetLive}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Set Live
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Company Profile</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {companyName}? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={onDelete}
              >
                Delete Profile
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
