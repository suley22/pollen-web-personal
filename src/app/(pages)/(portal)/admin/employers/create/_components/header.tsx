"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";
import { useTransition } from "react";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";

export function Header() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col">
        <div className="text-2xl font-sora font-bold">Create Employer</div>
        <p className="text-muted-foreground">
          Complete the form below to create a new employer profile
        </p>
      </div>
    </div>
  );
}
