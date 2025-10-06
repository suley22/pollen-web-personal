// El estado ahora se maneja en el padre, no aquí

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function AccoladesSection({ accolades, setAccolades, placeholder }) {
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
      {/* Hidden input to export accolades as comma-separated string */}
      <input
        type="hidden"
        name="company_accolades"
        value={accolades.join(",")}
      />
      {/* Selected accolades */}
      {accolades.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {accolades.map((accolade) => (
            <Badge
              key={accolade}
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
          placeholder={placeholder || "Add an accolade and press Enter"}
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
    </div>
  );
}
