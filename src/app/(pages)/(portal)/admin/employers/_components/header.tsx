import { Button } from "@/components/ui/buttons/button";
import { Plus } from "lucide-react";

export function Header() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col">
        <div>
          <div className="text-2xl font-sora font-bold">Jobs Management</div>
          <p className="text-muted-foreground">
            Manage job postings and track application progress
          </p>
        </div>
      </div>
      <Button
        variant="primary"
        size="sm"
        // TODO: implementar navegación a creación de perfil
        // onClick={() => router.push("/admin/company-profiles/create")}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Create Company Profile
      </Button>
    </div>
  );
}
