"use client";

import { Button } from "@/components/ui/buttons/button";
import { useUser } from "../providers";
import { useRouter } from "next/navigation";

const buttonVariants = {
  primary: "findJobsSolid",
  secondary: "findJobs",
  solid: "findJobsSolid",
  outline: "findJobsOutline",
};

export const FindJobsButton = ({
  btnStyle = "primary",
  text = "Find jobs now →",
}) => {
  const user = useUser();
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(user?.redirectUrl)}
      size="default"
      variant={buttonVariants[btnStyle]}
      className="px-12 py-6 text-base font-semibold"
    >
      {text}
    </Button>
  );
};
