"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface SkillRatingProps {
  /**
   * Nombre del skill que se está calificando
   */
  skillName: string;

  /**
   * Valor actual de la calificación (1-5)
   */
  value: number;

  /**
   * Si el componente está en modo editable
   */
  isEditable?: boolean;

  /**
   * Callback cuando cambia el valor
   */
  onChange?: (value: number) => void;

  /**
   * Tamaño de las estrellas
   */
  size?: "sm" | "md" | "lg";

  /**
   * Mostrar el valor numérico junto a las estrellas
   */
  showValue?: boolean;

  /**
   * Descripción o ayuda para el criterio
   */
  description?: string;

  /**
   * Color de las estrellas activas
   */
  activeColor?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function SkillRating({
  skillName,
  value,
  isEditable = false,
  onChange,
  size = "md",
  showValue = true,
  description,
  activeColor = "text-yellow-400",
}: SkillRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (rating: number) => {
    if (isEditable && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (isEditable) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (isEditable) {
      setHoverValue(null);
    }
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">
            {skillName}
          </label>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= displayValue;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleClick(star)}
                  onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave}
                  disabled={!isEditable}
                  className={`
                    ${sizeClasses[size]}
                    transition-all duration-150
                    ${isEditable ? "cursor-pointer hover:scale-110" : "cursor-default"}
                    ${!isEditable && "opacity-75"}
                  `}
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`
                      w-full h-full
                      ${isFilled ? `fill-current ${activeColor}` : "text-gray-300"}
                      ${isEditable && hoverValue !== null && star <= hoverValue ? "scale-110" : ""}
                    `}
                    strokeWidth={1.5}
                  />
                </button>
              );
            })}
          </div>
          {showValue && (
            <span
              className={`
                text-sm font-semibold min-w-[2rem] text-center
                ${isEditable && hoverValue !== null ? "text-blue-600" : "text-gray-700"}
              `}
            >
              {displayValue}/5
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface SkillRatingGroupProps {
  /**
   * Lista de skills con sus valores
   */
  skills: Array<{
    id: string;
    name: string;
    value: number;
    description?: string;
  }>;

  /**
   * Si el grupo está en modo editable
   */
  isEditable?: boolean;

  /**
   * Callback cuando cambia un valor
   */
  onChange?: (skillId: string, value: number) => void;

  /**
   * Título del grupo
   */
  title?: string;

  /**
   * Tamaño de las estrellas
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Componente que agrupa múltiples SkillRating
 */
export function SkillRatingGroup({
  skills,
  isEditable = false,
  onChange,
  title,
  size = "md",
}: SkillRatingGroupProps) {
  const handleChange = (skillId: string, value: number) => {
    if (onChange) {
      onChange(skillId, value);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="space-y-4">
        {skills.map((skill) => (
          <SkillRating
            key={skill.id}
            skillName={skill.name}
            value={skill.value}
            description={skill.description}
            isEditable={isEditable}
            onChange={(value) => handleChange(skill.id, value)}
            size={size}
            showValue={true}
          />
        ))}
      </div>
    </div>
  );
}
