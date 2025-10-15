"use client";

import { useState } from "react";
import { Input } from "@/components/design-system";
import { FormCard } from "@/components/design-system/form-card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

/**
 * DynamicListInput - A reusable component for managing a list of items with configurable fields
 *
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.icon - Icon for the card header
 * @param {string} props.name - Name for the hidden input (used in form submission)
 * @param {Array} props.fields - Configuration for the input fields
 * @param {Array} props.initialItems - Initial list of items
 * @param {string} props.addButtonText - Text for the add button
 * @param {Function} props.renderItem - Custom render function for list items (optional)
 *
 * @example
 * // Social Media example
 * <DynamicListInput
 *   title="Social Media"
 *   icon={<Share2 className="h-5 w-5" />}
 *   name="social_medias"
 *   addButtonText="Add Social Media"
 *   fields={[
 *     {
 *       key: "platform",
 *       label: "Platform",
 *       placeholder: "e.g., LinkedIn, Twitter, Instagram...",
 *       type: "text"
 *     },
 *     {
 *       key: "url",
 *       label: "URL",
 *       placeholder: "https://...",
 *       type: "url"
 *     }
 *   ]}
 *   initialItems={[{ platform: "LinkedIn", url: "https://..." }]}
 * />
 */
export function DynamicListInput({
  title,
  icon,
  name,
  fields = [],
  initialItems = [],
  addButtonText = "Add Item",
  renderItem,
}) {
  // Initialize items with unique IDs
  const [items, setItems] = useState(
    initialItems.map((item) => ({
      ...item,
      id:
        item.id ||
        Date.now().toString() + Math.random().toString(36).substr(2, 9),
    })),
  );

  // Initialize field values state dynamically
  const [fieldValues, setFieldValues] = useState(
    fields.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {}),
  );

  // Handle field change
  const handleFieldChange = (key, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Check if all fields are filled
  const isFormValid = () => {
    return fields.every((field) => {
      const value = fieldValues[field.key];
      return value && value.trim() !== "";
    });
  };

  // Add new item
  const handleAddItem = () => {
    if (isFormValid()) {
      const newItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...Object.keys(fieldValues).reduce((acc, key) => {
          acc[key] = fieldValues[key].trim();
          return acc;
        }, {}),
      };

      setItems([...items, newItem]);

      // Reset field values
      setFieldValues(
        fields.reduce((acc, field) => {
          acc[field.key] = "";
          return acc;
        }, {}),
      );
    }
  };

  // Remove item
  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  // Default render function for items
  const defaultRenderItem = (item) => (
    <div className="flex flex-col gap-0 flex-1 min-w-0">
      {fields.map((field, index) => {
        const value = item[field.key];
        const isUrl = field.type === "url" && value?.startsWith("http");

        return (
          <div key={field.key}>
            {index === 0 ? (
              <span className="text-sm font-medium">{value}</span>
            ) : isUrl ? (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline truncate"
              >
                {value}
              </a>
            ) : (
              <span className="text-sm text-gray-600">{value}</span>
            )}
          </div>
        );
      })}
    </div>
  );

  const itemRenderer = renderItem || defaultRenderItem;

  return (
    <div className="flex flex-col gap-5">
      {/* Hidden input to export items as JSON string */}
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      {/* Add new item form */}
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            type={field.type || "text"}
            id={field.key}
            value={fieldValues[field.key]}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={field.placeholder || ""}
            required={field.required}
          />
        ))}

        <Button
          type="button"
          onClick={handleAddItem}
          variant="default"
          className="w-full"
          disabled={!isFormValid()}
        >
          <Plus className="h-4 w-4 mr-2" />
          {addButtonText}
        </Button>
      </div>

      {/* List of added items */}
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2"
            >
              {itemRenderer(item)}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveItem(item.id)}
                className="ml-2 h-8 w-8 p-0 text-gray-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
