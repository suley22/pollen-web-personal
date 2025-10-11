import { useState } from "react";
import { signInWithGoogle } from "@/login/actions";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle(window.location.origin);
      if (error) {
        console.error("Google sign in error:", error);
        // Aquí podrías mostrar el error al usuario si quieres
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return {
    form: {
      email,
      password,
      googleLoading,
      handleGoogleSignIn: handleGoogleSignIn,
      setEmail: setEmail,
      setPassword: setPassword,
    },
  };
}
