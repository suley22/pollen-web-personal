"use client";

import { Button } from "@/components/ui/buttons/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";
import { useTransition } from "react";

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
      <Button
        variant="default"
        size="default"
        onClick={() =>
          startTransition(() => {
            router.push(AdminRoutes.employersCreate);
          })
        }
        className="flex items-center gap-2 font-sora"
      >
        <Plus className="w-4 h-4" />
        Create
      </Button>
    </div>
  );
}
