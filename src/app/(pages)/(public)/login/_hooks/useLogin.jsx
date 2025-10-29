import { useState } from "react";
import { signInWithGoogle } from "@/login/actions";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle(window.location.origin);
      
      // Si llegamos aquí, significa que hubo un error (no redirección)
      if (result?.error) {
        console.error("Google sign in error:", result.error);
        // Mostrar error al usuario
      }
    } catch (error) {
      // Verificar si es una redirección de Next.js o un error real
      if (error?.digest?.startsWith('NEXT_REDIRECT')) {
        // Es una redirección exitosa, no hacer nada
        console.log("Redirecting to Google OAuth...");
        return;
      }
      
      // Es un error real
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
