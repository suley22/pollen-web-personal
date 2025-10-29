import { FormCard } from "@/components/design-system/form-card";
import { CheckCircle } from "lucide-react";

export function InfoCard({ title, children, icon = null }) {
  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg gap-2">
      <div className="flex flex-row items-center gap-2">
        {icon && <div className="text-gray-500">{icon}</div>}
        <div className="text-lg font-semibold"> {title} </div>
      </div>
      <div className="font-poppins font-extralight">
        {children ? children : "Not specified"}
      </div>
    </div>
  );
}

export function InfoListCard({ title, items, icon = null }) {
  return (
    <FormCard title={title} icon={icon}>
      <div className="space-y-3">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
              <p className="text-sm leading-6 text-gray-700">{item}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No items listed</p>
        )}
      </div>
    </FormCard>
  );
}
