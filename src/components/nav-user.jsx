"use client";

import React from "react";
import { LogOut, ChevronsUpDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// ✅ CLIENT helper (no uses el de server en componentes client)
import { createBrowserClient } from "@supabase/ssr";

export function NavUser() {
  const { isMobile } = useSidebar();

  const [user, setUser] = React.useState({
    name: "Cargando...",
    email: "",
    avatar: "/avatars/default.jpg",
  });

  const [loading, setLoading] = React.useState(true);

  function initials(name = "") {
    const [a = "", b = ""] = name.split(" ");
    const val = (a[0] ?? "") + (b[0] ?? "");
    return val ? val.toUpperCase() : "US";
  }

  React.useEffect(() => {
    // ⚠️ leé URL y KEY desde variables públicas
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

    if (!url || !anon) {
      // Evita crash: muestra placeholder si faltan envs
      console.error("Faltan NEXT_PUBLIC_SUPABASE_URL o ANON/PUBLISHABLE key");
      setUser({ name: "Invitado", email: "", avatar: "/avatars/default.jpg" });
      setLoading(false);
      return;
    }

    const supabase = createBrowserClient(url, anon);

    const load = async () => {
      try {
        const { data: authData, error: authErr } = await supabase.auth.getUser();
        if (authErr) throw authErr;
        const authedUser = authData?.user;
        if (!authedUser) {
          setUser((u) => ({ ...u, name: "Invitado" }));
          return;
        }

        const { data: profile, error: profErr } = await supabase
          .from("profile")
          .select("first_name,last_name,avatar_url")
          .eq("id", authedUser.id)
          .single();

        if (profErr && profErr.code !== "PGRST116") {
          // PGRST116 = no rows, lo tratamos como perfil vacío
          throw profErr;
        }

        const displayName =
          (profile?.first_name || profile?.last_name)
            ? `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim()
            : (authedUser.email?.split("@")[0] ?? "Usuario");

        setUser({
          name: displayName || "Usuario",
          email: authedUser.email ?? "",
          avatar: profile?.avatar_url ?? "/avatars/default.jpg",
        });
      } catch (e) {
        // Podés loguearlo a Sentry/console si querés
        setUser({ name: "Usuario", email: "", avatar: "/avatars/default.jpg" });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              disabled={loading}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {loading ? "Cargando..." : user.name}
                </span>
                <span className="truncate text-xs">
                  {loading ? " " : user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {initials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={loading}
              onClick={async () => {
                const supabase = createBrowserClient(
                  process.env.NEXT_PUBLIC_SUPABASE_URL,
                  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                );
                await supabase.auth.signOut();
                window.location.href = "/"; // o la ruta de login
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}