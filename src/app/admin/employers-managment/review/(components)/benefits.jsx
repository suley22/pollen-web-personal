

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";

export default function Benefits({ employerProfile }) {
    const [isEditing, setIsEditing] = useState(false);

    // Normalize benefits data (array or string) into a newline-separated string for editing
    const initialBenefits = Array.isArray(employerProfile?.benefits)
        ? employerProfile.benefits.join("\n")
        : (employerProfile?.benefits || "");
    const [editValue, setEditValue] = useState(initialBenefits);
    // Normalize perks data (array or string) into a newline-separated string for editing
    const initialPerks = Array.isArray(employerProfile?.perks)
        ? employerProfile.perks.join("\n")
        : (employerProfile?.perks || "");
    const [editPerksValue, setEditPerksValue] = useState(initialPerks);

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
        // Benefits items: array or current editValue (newline-separated)
        const benefitsItems = (Array.isArray(employerProfile?.benefits)
            ? employerProfile.benefits
            : (editValue || "").split("\n"))
            .map((s) => (typeof s === "string" ? s.trim() : ""))
            .filter(Boolean);

        // Perks items: array or string -> newline-separated
        const perksItems = (Array.isArray(employerProfile?.perks)
            ? employerProfile.perks
            : (typeof employerProfile?.perks === "string" ? employerProfile.perks.split("\n") : []))
            .map((s) => (typeof s === "string" ? s.trim() : ""))
            .filter(Boolean);

        if (benefitsItems.length === 0 && perksItems.length === 0) {
            return (
                <p className="text-gray-500" style={{ fontFamily: "Poppins" }}>
                    No benefits or perks added yet.
                </p>
            );
        }

        const List = ({ items }) => (
            <ul className="space-y-2">
                {items.map((text, index) => (
                    <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700" style={{ fontFamily: "Poppins" }}>
                            {text}
                        </span>
                    </li>
                ))}
            </ul>
        );

        return (
            <div className="space-y-6">
                {benefitsItems.length > 0 && (
                    <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-900" style={{ fontFamily: "Sora" }}>Benefits</div>
                        <List items={benefitsItems} />
                    </div>
                )}
                {perksItems.length > 0 && (
                    <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-900" style={{ fontFamily: "Sora" }}>Perks</div>
                        <List items={perksItems} />
                    </div>
                )}
            </div>
        );
    }

    function _buildEditForm(editValue, setEditValue, editPerksValue, setEditPerksValue) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900" style={{ fontFamily: "Sora" }}>Benefits</div>
                    <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        rows={4}
                        placeholder="List your benefits, one per line..."
                        style={{ fontFamily: "Poppins" }}
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900" style={{ fontFamily: "Sora" }}>Perks</div>
                    <textarea
                        value={editPerksValue}
                        onChange={(e) => setEditPerksValue(e.target.value)}
                        className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        rows={4}
                        placeholder="List your perks, one per line..."
                        style={{ fontFamily: "Poppins" }}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => {
                            setIsEditing(false);
                            setEditValue(editValue);
                            setEditPerksValue(editPerksValue);
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
                            setEditValue(initialBenefits);
                            setEditPerksValue(initialPerks);
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
                    What We Offer
                </CardTitle>

                {!isEditing && _buildEditButton()}
            </CardHeader>

            <CardContent className="mt-4">
                {isEditing ?
                    _buildEditForm(editValue, setEditValue, editPerksValue, setEditPerksValue)
                    : _buildStaticContent(employerProfile)}
            </CardContent>
        </Card>
    );
}
