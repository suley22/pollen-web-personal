"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerSchema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/icons/icons";

function getPasswordChecks(password) {
  return [
    { label: "Mínimo 8 caracteres", valid: password.length >= 8 },
    { label: "Al menos una mayúscula", valid: /[A-Z]/.test(password) },
    { label: "Al menos un número", valid: /[0-9]/.test(password) },
    { label: "Al menos un símbolo", valid: /[^a-zA-Z0-9]/.test(password) },
  ];
}

export function RegisterForm({ className, signup, onChangeLogin, ...props }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password") || "";
  const passwordChecks = getPasswordChecks(passwordValue);

  const onSubmit = async (data) => {
    await signup(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <Button variant="outline" className="w-full">
          <GoogleIcon className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />

            {/* Lista de requisitos */}
            <ul className="mt-2 text-sm space-y-1">
              {passwordChecks.map((check, idx) => (
                <li
                  key={idx}
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
          <Button type="submit" className="w-full" disabled={!isValid}>
            Sign up
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
