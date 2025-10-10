import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

const RadioGroup = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <RadioGroupPrimitive.Root ref={ref} className={className} {...props}>
      {children}
    </RadioGroupPrimitive.Root>
  ),
);
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={
        "w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center " +
        (className || "")
      }
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="border-red-500 bg-primary rounded-full w-2 h-2" />
      {children}
    </RadioGroupPrimitive.Item>
  ),
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
