"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export function StatusInfo({ statusInfo, employerProfile }) {
    const router = useRouter();

    return (
        statusInfo && (
            <Card className={`mb-6 border-l-4 ${statusInfo.borderColor} ${statusInfo.bgColor}`}>
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        <statusInfo.icon className={`w-5 h-5 ${statusInfo.iconColor}`} />
                        <div>
                            <h3 className={`font-semibold ${statusInfo.textColor}`} style={{ fontFamily: 'Sora' }}>
                                {statusInfo.title}
                            </h3>
                            <p className={`${statusInfo.textColor} text-sm`} style={{ fontFamily: 'Poppins' }}>
                                {statusInfo.message}
                            </p>
                            {statusInfo.feedback && (
                                <div className="bg-white border border-red-200 rounded-lg p-4 mt-3">
                                    <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2" style={{ fontFamily: 'Sora' }}>
                                        <MessageCircle className="w-4 h-4" />
                                        Feedback from Pollen Team
                                    </h4>
                                    <button
                                        onClick={() => router.push('/employer-messages?conversation=pollen-team&feedback=profile-review')}
                                        className="text-pink-600 hover:text-pink-700 text-sm underline flex items-center gap-2"
                                        style={{ fontFamily: 'Poppins' }}
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        View detailed feedback message
                                    </button>
                                </div>
                            )}
                            {employerProfile?.lastUpdated && statusInfo.type === 'changes_pending' && (
                                <p className={`${statusInfo.textColor} text-xs mt-1 opacity-75`} style={{ fontFamily: 'Poppins' }}>
                                    Last updated: {new Date(employerProfile.lastUpdated).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    );
}