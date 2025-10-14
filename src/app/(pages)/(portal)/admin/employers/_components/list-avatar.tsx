import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";

export function ListAvatar({ company }) {
  return (
    <Avatar className="h-16 w-16">
      <AvatarImage
        className="rounded-md"
        src={company.logo}
        alt={company.company_name}
      />
      <AvatarFallback className="bg-muted text-muted-foreground">
        <Building2 className="h-8 w-8" />
      </AvatarFallback>
    </Avatar>
  );
}
