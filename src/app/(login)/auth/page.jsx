"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";

import { LoginForm } from "@/app/(login)/(components)/loginForm";
import { RegisterForm } from "@/app/(login)/(components)/registerForm";

import { TestimonialSlider } from "../(components)/testimonialSlider";
import { login as loginAction } from "./actions";
import { signup as signupAction } from "./actions";

export default function LoginPage() {
  const [isLogging, setIsLogging] = useState(true);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Pollen
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {isLogging ? (
              <LoginForm
                loginAction={loginAction}
                onChangeLogin={setIsLogging}
              />
            ) : (
              <RegisterForm
                signup={signupAction}
                onChangeLogin={setIsLogging}
              />
            )}
          </div>
        </div>
      </div>

      {/* Panel derecho con testimonio */}
      <div className="bg-gray-50 relative hidden lg:flex lg:items-center lg:justify-center lg:p-10">
        <TestimonialSlider />
      </div>
    </div>
  );
}
