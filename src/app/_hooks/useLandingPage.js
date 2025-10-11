import { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";

import { LoginRoutes } from "@/login/router";
import { JobSeekerRoutes } from "@/job-seeker/router";
import { AdminRoutes } from "@/admin/router";

import { useRouter } from "next/navigation";

export const useLandingPage = () => {
  const router = useRouter();

  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [user, setUser] = useState(null);

  const checkSession = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setUser({
          id: data.session.user.id,
          email: data.session.user.email,
          avatar: data.session.user.user_metadata.avatar_url,
          name: data.session.user.user_metadata.name,
        });

        // Redireccionar automáticamente si está autenticado
        const isAdmin = data.session.user.user_metadata.role === "admin";
        const redirectUrl = isAdmin ? AdminRoutes.home : JobSeekerRoutes.home;

        setRedirectUrl(redirectUrl);
      }
    } catch (error) {
      console.error("Error al verificar la sesión:", error);
      setIsAuthenticated(false);
      setRedirectUrl(LoginRoutes.login);
    } finally {
      setIsCheckingSession(false);
    }
  };

  const handleLogin = () => {
    router.push(redirectUrl || LoginRoutes.login);
  };

  // Verificar sesión al cargar la página
  useEffect(() => {
    checkSession();
  }, []);

  return {
    isCheckingSession,
    isAuthenticated,
    handleLogin,
    user,
  };
};
