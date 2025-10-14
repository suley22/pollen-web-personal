"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Award } from "lucide-react";

export function AccoladesAccreditations({ accolades, setAccolades }) {
  const handleAddAccolade = (value) => {
    if (value && !accolades.includes(value)) {
      setAccolades([...accolades, value]);
    }
  };

  const handleRemoveAccolade = (accolade) => {
    setAccolades(accolades.filter((a) => a !== accolade));
  };

  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Accolades & Accreditations</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6">
        <div className="space-y-3">
          {/* Hidden input to export accolades as comma-separated string */}
          <input
            type="hidden"
            name="company_accolades"
            value={accolades?.join(",")}
          />

          {/* Add new accolades */}
          <div className="flex space-x-2">
            <Input
              placeholder="Add an accolade or accreditation and press Enter"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  const value = e.currentTarget.value.trim();
                  handleAddAccolade(value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>

          {/* Selected accolades */}
          {accolades?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {accolades.map((accolade) => (
                <Badge
                  key={accolade}
                  variant="outline"
                  className="bg-gray-50 text-gray-600 border-gray-200 font-medium px-2 py-1"
                >
                  {accolade}
                  <button
                    type="button"
                    onClick={() => handleRemoveAccolade(accolade)}
                    className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
