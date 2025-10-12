import { Button } from "@/components/ui/buttons/button";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/app/providers";
import { useRouter } from "next/navigation";
import { LoginRoutes } from "@/login/router";

export const LoginStatusButton = () => {
  const user = useUser();
  const router = useRouter();

  const onClick = () => {
    router.push(user?.redirectUrl || LoginRoutes.login);
  };

  return (
    <div className="flex flex-row items-center min-w-[150px]">
      {user.isCheckingSession && <Loader />}

      {!user.isLogged && !user.isCheckingSession && (
        <Button
          onClick={onClick}
          className="bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50"
          size="sm"
          variant="solid"
        >
          Login
        </Button>
      )}

      {user.isLogged && !user.isCheckingSession && (
        <div className="flex flex-row gap-2 cursor-pointer" onClick={onClick}>
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user.avatar}
              alt={user.name}
              className="rounded-lg"
            />
            <AvatarFallback className="rounded-lg">
              {user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      )}
    </div>
  );
};
