"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePassword } from "../../actions";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [state, formAction, isLoading] = useActionState(updatePassword);
  const [isValidSession, setIsValidSession] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Verificar diferentes formatos de URL que puede usar Supabase
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const tokenHash = urlParams.get("token_hash");
        const type = urlParams.get("type");

        console.log("URL Parameters:", { code, tokenHash, type });
        console.log("Full URL:", window.location.href);

        if (code || (tokenHash && type === "recovery")) {
          // Para reset de contraseña, validamos que el código/token existe
          setIsValidSession(true);
        } else {
          // También verificar en el hash por si acaso
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1),
          );
          const hashCode = hashParams.get("access_token");
          const hashType = hashParams.get("type");

          if (hashCode && hashType === "recovery") {
            setIsValidSession(true);
          } else {
            setIsValidSession(false);
          }
        }
      } catch (error) {
        console.error("Error initializing session:", error);
        setIsValidSession(false);
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-gray-900">Loading...</h2>
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Invalid Reset Link
          </h2>
          <p className="text-gray-600">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <Link
            href="/login/forgot-password"
            className="inline-block bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Set New Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below. This link expires in 1 hour.
          </p>
        </div>

        <form className="space-y-6" action={formAction}>
          {/* Hidden fields para pasar el código/token */}
          <input
            type="hidden"
            name="code"
            value={
              new URLSearchParams(window.location.search).get("code") || ""
            }
          />
          <input
            type="hidden"
            name="token_hash"
            value={
              new URLSearchParams(window.location.search).get("token_hash") ||
              ""
            }
          />
          <input
            type="hidden"
            name="type"
            value={
              new URLSearchParams(window.location.search).get("type") || ""
            }
          />

          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="mt-1"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              className="mt-1"
              placeholder="Confirm new password"
            />
          </div>

          {state?.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm font-medium">{state.error}</p>
              {(state.expired || state.invalid) && (
                <div className="mt-3">
                  <Link
                    href="/forgot-password"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Request New Reset Link
                  </Link>
                </div>
              )}
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Updating..." : "Update Password"}
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
      </div>
    </div>
  );
}
