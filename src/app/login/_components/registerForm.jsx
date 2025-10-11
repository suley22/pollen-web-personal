"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/icons/icons";
import { useRegister } from "../_hooks/useRegister";
import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";

export function RegisterForm({ className, signup, onChangeLogin, ...props }) {
  const { form } = useRegister();
  const [state, formAction, isLoading] = useActionState(signup);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create an account
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
          Sign up with Google
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <form action={formAction} className="flex flex-col gap-6">
          {state &&
            (state.success ? (
              <Alert
                title={state?.message}
                description={state?.description}
                type="success"
              />
            ) : (
              <Alert
                title={state?.message}
                description={state?.description}
                type="error"
              />
            ))}

          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id={form.fields.emailId}
              type="email"
              name="email"
              placeholder="m@example.com"
              onChange={(e) =>
                form.handleOnChange(form.fields.emailId, e.target.value)
              }
            />
            <ul className="mt-2 text-sm space-y-1">
              {form.checks.email.map((check) => (
                <li
                  key={check.label}
                  className={`flex items-center gap-2 ${
                    check.valid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {check.valid
                    ? "✔ Email is valid"
                    : "✖ Email is not valid"}
                </li>
              ))}
            </ul>
          </div>

          {/* Password */}
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id={form.fields.passwordFieldId}
              type="password"
              onChange={(e) =>
                form.handleOnChange(form.fields.passwordFieldId, e.target.value)
              }
            />

            {/* Lista de requisitos */}
            <ul className="mt-2 text-sm space-y-1">
              {form.checks.password.map((check) => (
                <li
                  key={check.label}
                  className={`flex items-center gap-2 ${
                    check.valid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {check.valid ? "✔" : "✖"} {check.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Botón Sign up */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !form.valid}
          >
            {isLoading ? "Loading..." : "Sign up"}
          </Button>
        </form>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a
          href="#"
          onClick={() => onChangeLogin(true)}
          className="text-pink-600 underline underline-offset-4"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}
