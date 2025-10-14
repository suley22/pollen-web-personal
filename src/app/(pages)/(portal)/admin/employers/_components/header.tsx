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
        <div>
          <div className="text-2xl font-sora font-bold">Employers</div>
          <p className="text-muted-foreground">
            Manage and review employer company profiles
          </p>
        </div>
      </div>

      <PrimaryButton
        className="max-w-xs font-sora"
        text="Create"
        size="default"
        onClick={() =>
          startTransition(() => {
            router.push(AdminRoutes.employersCreate);
          })
        }
        icon={<Plus className="w-4 h-4" />}
      />
    </div>
  );
}
