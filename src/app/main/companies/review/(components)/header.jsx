import { Button } from "@/components/ui/buttons/button";
import { Eye } from "lucide-react";

export function Header({ employerProfile }) {
  return (
    <div className="bg-white border-b">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "Sora" }}>
              Company Profile
            </h1>
            <p className="text-gray-600 mt-1" style={{ fontFamily: "Poppins" }}>
              Manage the information shared with our talent community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
