import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SimpleFilter({
  options,
  placeholder,
  value,
  onValueChange,
  className = "",
}) {
  return (
    <div className="flex gap-2 items-center">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="">
              <span className="flex items-center p-2">{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function MCFilter() {}
