"use client";

import { Button } from "@/components/ui/buttons/button";
import { useUser } from "./providers";
import { useRouter } from "next/navigation";

export const FindJobsButton = () => {
  const user = useUser();
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(user?.redirectUrl)}
      size="lg"
      className="bg-white text-pink-600 hover:bg-gray-100 px-12 py-4 text-lg disabled:opacity-50"
      style={{ fontFamily: "Sora" }}
      variant={"solid"}
    >
      Find jobs now →
    </Button>
  );
};
