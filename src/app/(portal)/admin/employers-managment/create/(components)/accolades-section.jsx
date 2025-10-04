import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function AccoladesSection() {
  const [accolades, setAccolades] = useState([]);

  const handleAddAccolade = (value) => {
    if (value && !accolades.includes(value)) {
      setAccolades([...accolades, value]);
    }
  };

  const handleRemoveAccolade = (accolade) => {
    setAccolades(accolades.filter((a) => a !== accolade));
  };

  return (
    <div className="space-y-3">
      {/* Selected accolades */}
      {accolades.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {accolades.map((accolade, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
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
      {/* Add new accolades */}
      <div className="flex space-x-2">
        <Input
          placeholder="Add accolade..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const value = e.currentTarget.value.trim();
              handleAddAccolade(value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}
