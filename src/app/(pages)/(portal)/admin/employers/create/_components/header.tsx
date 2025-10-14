"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/buttons/button";

export function Header() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onBack() {
    startTransition(() => {
      router.back();
    });
  }

  return (
    <div className="w-full flex items-center justify-start space-x-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex flex-col">
        <div className="text-2xl font-sora font-bold">Create Employer</div>
        <p className="text-muted-foreground">
          Complete the form below to create a new employer profile
        </p>
      </div>
    </div>
  );
}
