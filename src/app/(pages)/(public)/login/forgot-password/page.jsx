"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "../actions";
import { usePasswordReset } from "../_hooks/usePasswordReset";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [state, formAction, isLoading] = useActionState(resetPassword);
  const { email, emailChecks, isEmailValid, handleEmailChange } = usePasswordReset();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        {state?.success ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">{state.message}</p>
            </div>
            <Link
              href="/login"
              className="text-pink-600 hover:text-pink-500 underline"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form className="space-y-6" action={formAction}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              
              {/* Email validation feedback */}
              <ul className="mt-2 text-sm space-y-1">
                {emailChecks.map((check) => (
                  <li
                    key={check.label}
                    className={`flex items-center gap-2 ${
                      check.valid ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {check.valid
                      ? "✔ Email is valid"
                      : "✖ Email is not valid"}
                  </li>
                ))}
              </ul>
            </div>

            {state?.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">{state.error}</p>
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading || !isEmailValid}
              className="w-full"
            >{isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-pink-600 hover:text-pink-500 underline"
              >
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
