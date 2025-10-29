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
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg gap-2">
      <div className="flex flex-row items-center gap-2">
        {icon && <div>{icon}</div>}
        <div className="text-lg font-semibold"> {title} </div>
      </div>
      <ul className="flex flex-col gap-3">
        {items && Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <li key={index} className="flex flex-row items-center">
              <CheckCircle className="h-5 w-5 mr-2 mt-1 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 text-md font-poppins font-extralight">
                {item}
              </span>
            </li>
          ))
        ) : (
          <span className="text-gray-700">Not specified</span>
        )}
      </ul>
    </div>
  );
}
