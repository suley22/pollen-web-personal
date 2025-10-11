"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import { Edit } from "lucide-react";
import { useState } from "react";

export default function Mission({ employerProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(employerProfile?.mission || "");

  function _buildEditButton() {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <Edit className="w-4 h-4" />
        <span className="ml-1 text-sm">Edit</span>
      </Button>
    );
  }

  function _buildStaticContent() {
    return (
      <>
        <p
          className="text-gray-700 leading-relaxed"
          style={{ fontFamily: "Poppins" }}
        >
          {editValue}
        </p>
      </>
    );
  }

  function _buildEditForm(editValue, setEditValue) {
    return (
      <div className="space-y-4">
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          rows={4}
          placeholder="Describe your company..."
          style={{ fontFamily: "Poppins" }}
        />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setIsEditing(false);
              setEditValue(editValue);
              // Here you would typically call an API to save changes
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white font-sora font-medium"
          >
            Submit for Approval
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setEditValue(employerProfile?.mission || "");
            }}
            style={{ fontFamily: "Sora" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-bold font-sora text-2xl">
          Our Mission
        </CardTitle>
        {!isEditing && _buildEditButton()}
      </CardHeader>

      <CardContent className="mt-4">
        {isEditing
          ? _buildEditForm(editValue, setEditValue)
          : _buildStaticContent(employerProfile)}
      </CardContent>
    </Card>
  );
}
