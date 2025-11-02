"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/design-system/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Componente de selección múltiple con checkboxes que guarda los labels en lugar de values
 * Permite agregar items personalizados dinámicamente
 */
export function CheckboxGroup({
  items = [],
  name = "checkbox-group",
  initialSelectedItems = [],
  onChange,
  allowCustomItems = false,
  customItemsPlaceholder = "Add custom item and press Enter",
  columns = 3,
  className = "",
}) {
  // Initialize custom items by extracting items from initialSelectedItems that aren't predefined
  const [customItems, setCustomItems] = React.useState(() => {
    // Extract predefined item labels for comparison during initialization
    const predefinedLabels = items.map((item) => item.label || item);
    const customItemsFromInitial = initialSelectedItems.filter(
      (item) => !predefinedLabels.includes(item),
    );
    console.log("Initializing customItems:", customItemsFromInitial);
    console.log("Predefined labels:", predefinedLabels);
    console.log("Initial selected items:", initialSelectedItems);
    return customItemsFromInitial;
  });

  // Lista de items seleccionados (puede incluir predefinidos y customs)
  // Inicializar solo una vez con initialSelectedItems
  const [selectedItems, setSelectedItems] = React.useState(() => {
    console.log("Initializing selectedItems:", initialSelectedItems);
    return initialSelectedItems;
  });

  // Extract predefined item labels for comparison throughout the component
  const predefinedLabels = React.useMemo(() => {
    return items.map((item) => item.label || item);
  }, [items]);

  // Combinar items predefinidos con personalizados - esta es la lista completa disponible
  const allAvailableItems = React.useMemo(() => {
    const predefinedItems = items.map((item) => ({
      label: item.label || item,
      isCustom: false,
    }));
    const customItemsList = customItems.map((item) => ({
      label: item,
      isCustom: true,
    }));
    const combined = [...predefinedItems, ...customItemsList];
    console.log("CheckboxGroup - allAvailableItems:", combined);
    console.log("CheckboxGroup - selectedItems:", selectedItems);
    return combined;
  }, [items, customItems, selectedItems]);

  // Manejar cambio de checkbox
  const handleCheckboxChange = (label, isChecked, isCustom) => {
    console.log("handleCheckboxChange:", { label, isChecked, isCustom });

    // No permitir cambios en items personalizados
    if (isCustom) {
      console.log("Prevented change on custom item");
      return;
    }

    const newSelectedItems = isChecked
      ? [...selectedItems, label]
      : selectedItems.filter((item) => item !== label);

    console.log("New selected items:", newSelectedItems);
    setSelectedItems(newSelectedItems);
    onChange?.(newSelectedItems);
  };

  // Agregar item personalizado
  const handleAddCustomItem = (value) => {
    const trimmedValue = value.trim();
    console.log("handleAddCustomItem:", trimmedValue);

    // Validar que no exista en customs ni en predefinidos
    const alreadyExists =
      customItems.includes(trimmedValue) ||
      items.some((item) =>
        typeof item === "string"
          ? item === trimmedValue
          : item.label === trimmedValue,
      );

    if (trimmedValue && !alreadyExists) {
      console.log("Adding custom item:", trimmedValue);

      // Agregar a la lista de items personalizados
      setCustomItems((prev) => {
        const newCustomItems = [...prev, trimmedValue];
        console.log("Updated customItems:", newCustomItems);
        return newCustomItems;
      });

      // Auto-seleccionar el item agregado
      setSelectedItems((prev) => {
        const newSelectedItems = [...prev, trimmedValue];
        console.log(
          "Auto-selecting custom item, new selectedItems:",
          newSelectedItems,
        );
        // Notificar al padre en el siguiente tick
        setTimeout(() => onChange?.(newSelectedItems), 0);
        return newSelectedItems;
      });
    } else {
      console.log("Item already exists or is empty");
    }
  };

  // Eliminar item personalizado
  const handleRemoveCustomItem = (itemToRemove) => {
    // Remover de la lista de items personalizados
    setCustomItems((prev) => prev.filter((item) => item !== itemToRemove));

    // Remover de la lista de seleccionados
    setSelectedItems((prev) => {
      const newSelectedItems = prev.filter((item) => item !== itemToRemove);
      // Notificar al padre en el siguiente tick
      setTimeout(() => onChange?.(newSelectedItems), 0);
      return newSelectedItems;
    });
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Grid de checkboxes */}
      <div
        className={cn("grid gap-3 text-sm", `grid-cols-${columns}`)}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {allAvailableItems.map((item) => {
          const isSelected = selectedItems.includes(item.label);

          return (
            <div className="flex items-center space-x-2" key={item.label}>
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(item.label, checked, item.isCustom)
                }
              />
              <label
                className={cn(
                  "flex-1 select-none flex items-center gap-2",
                  "cursor-pointer",
                )}
                onClick={(e) => {
                  // Prevenir si es custom o si se hace clic en el botón de eliminar
                  if (item.isCustom || (e.target as HTMLElement).closest("button")) {
                    return;
                  }
                  // Toggle el estado del checkbox
                  handleCheckboxChange(item.label, !isSelected, item.isCustom);
                }}
              >
                <span
                  className={item.isCustom ? "text-gray-700 font-medium" : ""}
                >
                  {item.label}
                </span>
                {item.isCustom && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveCustomItem(item.label);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={`Remove ${item.label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </label>
            </div>
          );
        })}
      </div>

      {/* Input para agregar items personalizados */}
      {allowCustomItems && (
        <CustomItemInput
          placeholder={customItemsPlaceholder}
          onAdd={handleAddCustomItem}
        />
      )}

      {/* Hidden inputs para enviar con el formulario */}
      {selectedItems.map((item, index) => (
        <input
          key={`${name}-hidden-${index}`}
          type="hidden"
          name={name}
          value={item}
        />
      ))}
    </div>
  );
}

/**
 * Input para agregar items personalizados
 */
function CustomItemInput({ placeholder, onAdd }) {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        onAdd(inputValue);
        setInputValue("");
      }
    }
  };

  return (
    <div className="w-full pt-1">
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
