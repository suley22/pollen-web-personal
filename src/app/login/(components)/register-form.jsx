"use client";

import { useState } from "react";

import {
  UserInfoModel,
  passwordErrorMessages,
  emailErrorMessages,
} from "@/app/login/registerSchema";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/icons/icons";

export function RegisterForm({ className, signup, onChangeLogin, ...props }) {
  const passwordFieldId = "password";
  const emailId = "email";

  const [passwordChecks, setPasswordChecks] = useState([]);
  const [emailChecks, setEmailChecks] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  function validateFormChecks(name, errorList = []) {
    let errorMessageList = errorList.map((issue) => issue.message);

    switch (name) {
      case emailId: {
        const emailChecks = getErrorMessages(
          emailErrorMessages,
          errorMessageList,
        );
        setEmailChecks(emailChecks);
        setIsFormValid(emailChecks.every((check) => check.valid) && passwordChecks.every((check) => check.valid) && passwordChecks.length > 0);
        break;
      }
      case passwordFieldId: {
        const passwordChecks = getErrorMessages(
          passwordErrorMessages,
          errorMessageList,
        );

        setPasswordChecks(passwordChecks);
        setIsFormValid(passwordChecks.every((check) => check.valid) && emailChecks.every((check) => check.valid) && emailChecks.length > 0);
        break;
      }
    }
  }

  function getErrorMessages(messages, errorList) {
    return Object.entries(messages).map(([, message]) => ({
      label: message,
      valid: !errorList.includes(message),
    }));
  }

  const handleOnChange = (name, value) => {
    try {
      UserInfoModel.parse({ [name]: value });
      setPasswordChecks([]);
      setEmailChecks([]);
    } catch (error) {
      if (error) {
        console.log("error", error);
        validateFormChecks(name, error.issues ?? []);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

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

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id={emailId}
              type="email"
              name="email"
              placeholder="m@example.com"
              onChange={(e) => handleOnChange(emailId, e.target.value)}
            />
            <ul className="mt-2 text-sm space-y-1">
              {emailChecks.map((check, idx) => (
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

          {/* Password */}
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id={passwordFieldId}
              type="password"
              name="password"
              onChange={(e) => handleOnChange(passwordFieldId, e.target.value)}
            />

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
          <Button type="submit" className="w-full" disabled={!isFormValid}>
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
