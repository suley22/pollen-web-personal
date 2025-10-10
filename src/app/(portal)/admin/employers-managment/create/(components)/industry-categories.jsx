import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

export function IndustryCategoriesSection({ value, onValueChange }) {
  const items = [
    { label: "Technology", value: "technology" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Finance", value: "finance" },
    { label: "Education", value: "education" },
    { label: "Retail", value: "retail" },
    { label: "Manufacturing", value: "manufacturing" },
    { label: "Hospitality", value: "hospitality" },
    { label: "Transportation", value: "transportation" },
    { label: "Construction", value: "construction" },
    { label: "Real Estate", value: "real_estate" },
    { label: "Media & Entertainment", value: "media_entertainment" },
    { label: "Non-Profit", value: "non_profit" },
    { label: "Government", value: "government" },
    { label: "Energy", value: "energy" },
    { label: "Telecommunications", value: "telecommunications" },
    { label: "Agriculture", value: "agriculture" },
    { label: "Pharmaceuticals", value: "pharmaceuticals" },
    { label: "Aerospace", value: "aerospace" },
    { label: "Automotive", value: "automotive" },
    { label: "Consulting", value: "consulting" },
    { label: "Legal", value: "legal" },
    { label: "Marketing & Advertising", value: "marketing_advertising" },
    { label: "Human Resources", value: "human_resources" },
    { label: "Travel & Tourism", value: "travel_tourism" },
    { label: "Food & Beverage", value: "food_beverage" },
    { label: "Sports & Recreation", value: "sports_recreation" },
    { label: "Arts & Culture", value: "arts_culture" },
    { label: "Environmental Services", value: "environmental_services" },
    { label: "Security Services", value: "security_services" },
    { label: "Other", value: "other" },
  ];
  const other = value === "other";
  return (
    <>
      <RadioGroup
        name="industries"
        value={value}
        onValueChange={onValueChange}
        className="grid grid-cols-3 gap-4 text-sm"
      >
        {items.map((item) => (
          <div className="flex flex-col space-y-2" key={item.value}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={item.value} id={item.value} />
              <label htmlFor={item.value}>{item.label}</label>
            </div>
          </div>
        ))}
      </RadioGroup>
      {other && (
        <div className="mt-4">
          <label htmlFor="other-industry" className="block text-sm font-medium">
            Please specify other industry
          </label>
          <Input
            type="text"
            name="other_industry"
            placeholder="Other industry"
          />
        </div>
      )}
    </>
  );
}
