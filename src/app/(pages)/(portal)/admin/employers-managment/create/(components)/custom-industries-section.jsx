import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";

export function CustomIndustriesSection({
  customIndustries,
  setCustomIndustries,
  placeholder,
}) {
  const handleAddIndustry = (value) => {
    if (value && !customIndustries.includes(value)) {
      setCustomIndustries([...customIndustries, value]);
    }
  };

  const handleRemoveIndustry = (industry) => {
    setCustomIndustries(customIndustries.filter((i) => i !== industry));
  };

  return (
    <div className="space-y-3">
      {/* Hidden input to export custom industries as comma-separated string */}
      <input
        type="hidden"
        name="custom_industries"
        value={customIndustries?.join(",")}
      />
      {/* Selected custom industries */}
      {customIndustries?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customIndustries.map((industry) => (
            <Badge
              key={industry}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {industry}
              <button
                type="button"
                onClick={() => handleRemoveIndustry(industry)}
                className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
      {/* Add new custom industry */}
      <div className="flex space-x-2">
        <Input
          placeholder={placeholder || "Add a custom industry and press Enter"}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              const value = e.currentTarget.value.trim();
              handleAddIndustry(value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}
