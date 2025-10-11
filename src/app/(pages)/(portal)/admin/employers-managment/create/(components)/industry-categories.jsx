import { Checkbox } from "@/app/components/ui/checkbox";
import { CustomIndustriesSection } from "./custom-industries-section";
import { useState } from "react";

export function IndustryCategoriesSection() {
  const [checked, setChecked] = useState(false);
  const [customIndustries, setCustomIndustries] = useState([]);

  // Handler para el checkbox 'Other'
  const handleOtherCheckedChange = (value) => {
    setChecked(!!value);
  };

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
  return (
    <>
      <div className="grid grid-cols-3 gap-4 text-sm">
        {items.map((item) => {
          const isOther = item.value === "other";
          return (
            <div className="flex flex-col space-y-2" key={item.value}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name={`industries.${item.value}`}
                  value={item.value}
                  checked={isOther ? !!checked : undefined}
                  onCheckedChange={
                    isOther ? handleOtherCheckedChange : undefined
                  }
                />
                <span>{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {checked && (
        <div className="md:col-span-2">
          <CustomIndustriesSection
            customIndustries={customIndustries}
            setCustomIndustries={setCustomIndustries}
            placeholder={"Add your custom industry types and press Enter"}
          />
        </div>
      )}
    </>
  );
}
