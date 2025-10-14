"use client";

import { useUser } from "@/app/providers";

export function HomeHeader() {
  const user = useUser();

  return (
    <div className="py-2 flex w-full flex-col space-y-4">
      <div className="w-full flex flex-row justify-between">
        <div className="flex text-3xl font-sora font-bold text-gray-900 welcome-message">
          Welcome back, {user?.firstName} 💛
        </div>
      </div>
    </div>
  );
}
