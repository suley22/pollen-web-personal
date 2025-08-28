import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function Mission({ statusInfo, employerProfile, editingSection, setEditingSection, editedValues, setEditedValues, setPendingApproval, setShowApprovalNotification }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle style={{ fontFamily: "Sora" }}>
                    Our Mission
                </CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        setEditingSection("mission");
                        setEditedValues({
                            mission: employerProfile?.about || "",
                        });
                    }}
                    className="hover:bg-gray-100"
                >
                    <Edit className="w-4 h-4" />
                    <span className="ml-1 text-sm">Edit</span>
                </Button>
            </CardHeader>
            <CardContent>
                {editingSection === "mission" ? (
                    <div className="space-y-4">
                        <textarea
                            value={editedValues.mission || ""}
                            onChange={(e) =>
                                setEditedValues({
                                    ...editedValues,
                                    mission: e.target.value,
                                })
                            }
                            className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            rows={4}
                            placeholder="Describe your company mission..."
                            style={{ fontFamily: "Poppins" }}
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={() => {
                                    setPendingApproval(true);
                                    setEditingSection(null);
                                    setShowApprovalNotification(true);
                                    setTimeout(
                                        () => setShowApprovalNotification(false),
                                        5000
                                    );
                                }}


                                className="bg-pink-600 hover:bg-pink-700 text-white"
                                style={{ fontFamily: "Sora" }}
                            >
                                Submit for Approval
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setEditingSection(null)}
                                style={{ fontFamily: "Sora" }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p
                            className="text-gray-700 leading-relaxed"
                            style={{ fontFamily: "Poppins" }}
                        >
                            To empower brands through innovative creative
                            solutions that drive meaningful connections and
                            deliver exceptional results for our clients.
                        </p>
                        {statusInfo?.type === "live" && (
                            <p
                                className="text-xs text-gray-500 mt-2 italic"
                                style={{ fontFamily: "Poppins" }}
                            >
                                Changes will require approval before going
                                live
                            </p>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}