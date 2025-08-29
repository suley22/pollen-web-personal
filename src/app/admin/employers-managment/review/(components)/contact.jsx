"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

import { useRouter } from "next/navigation";
import {
  Globe,
  Linkedin,
  UserCheck,




} from "lucide-react";

export default function Contact({ employerProfile }) {
  const router = useRouter();

  return (
    <Card className="p-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-bold font-sora text-2xl pb-4">
          Company Information
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/account/settings`)}
          className="hover:bg-gray-100"
        >
          <Edit className="w-4 h-4" />
          <span className="ml-1 text-sm">Edit</span>
        </Button>
      </CardHeader>


      <CardContent className="space-y-3">
        {employerProfile.website && (
          <div className="flex items-center gap-2 text-sm ">
            <Globe className="w-4 h-4 text-gray-400" />
            <a
              href={employerProfile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              {employerProfile.website}
            </a>
          </div>
        )}

        {employerProfile.linkedinPage && (
          <div className="flex items-center gap-2 text-sm">
            <Linkedin className="w-4 h-4 text-gray-400" />
            <a
              href={employerProfile.linkedinPage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        )}








        <button
          onClick={() => window.open("/company-profile/2", "_blank")}
          className="flex items-center gap-2 text-sm text-pink-600 hover:underline"
        >
          <UserCheck className="w-4 h-4 text-gray-400" />
          View Careers Page
        </button>
      </CardContent>
    </Card>
  );
}
