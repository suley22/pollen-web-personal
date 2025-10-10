"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/icons/icons";
import { useActionState } from "react";
import { useLogin } from "./useLogin";

export function LoginForm({ className, loginAction, onChangeLogin, ...props }) {
  const { form } = useLogin();
  const [state, formAction, isLoading] = useActionState(loginAction);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={form.handleGoogleSignIn}
          disabled={form.googleLoading}
        >
          <GoogleIcon className="mr-2 h-4 w-4" />
          {form.googleLoading ? "Connecting to Google..." : "Login with Google"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <form className="flex flex-col gap-6" action={formAction}>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
              value={form.email}
              onChange={(e) => form.setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={(e) => form.setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <p className="text-red-500">{state?.error}</p>
        </form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a
          href="#"
          onClick={() => onChangeLogin(false)}
          className="text-pink-600 underline underline-offset-4"
        >
          Sign up
        </a>
      </div>
    </div>
  );
}
