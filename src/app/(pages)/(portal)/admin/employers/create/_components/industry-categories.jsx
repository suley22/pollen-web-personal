import { CheckboxGroup } from "@/components/design-system";
import { INDUSTRY_OPTIONS } from "@/lib/configs/constants/industries";

/**
 * Componente para seleccionar industrias con opción de agregar personalizadas
 * Guarda los labels (no los values) en la base de datos
 */
export function IndustryCategoriesSection({
  initialSelectedIndustries = [],
  onChange,
  allowCustomItems = true,
}) {
  return (
    <CheckboxGroup
      items={INDUSTRY_OPTIONS}
      name="industries"
      initialSelectedItems={initialSelectedIndustries}
      onChange={onChange}
      allowCustomItems={allowCustomItems}
      customItemsPlaceholder="Add your custom industry and press Enter"
      columns={3}
    />
  );
}
