"use client";

import { Edit2, Save, X } from "lucide-react";
import { useState } from "react";

interface SkillSliderRatingProps {
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
   * Callback cuando cambia un valor
   */
  onChange?: (skillId: string, value: number) => void;

  /**
   * Callback para guardar los scores
   */
  onSave?: () => void | Promise<void>;

  /**
   * Título del grupo
   */
  title?: string;

  /**
   * Indica si se está guardando
   */
  isSaving?: boolean;

  /**
   * Indica si hay cambios sin guardar
   */
  hasChanges?: boolean;

  /**
   * Estado inicial de edición
   */
  initialEditMode?: boolean;
}

/**
 * Componente de calificación con sliders del 1-10 y botones de editar/guardar
 */
export function SkillSliderRating({
  skills,
  onChange,
  onSave,
  title = "Individual Assessment Scores",
  isSaving = false,
  hasChanges = false,
  initialEditMode = false,
}: SkillSliderRatingProps) {
  const [isEditMode, setIsEditMode] = useState(initialEditMode);

  const handleSliderChange = (skillId: string, value: number) => {
    if (isEditMode && onChange) {
      onChange(skillId, value);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleSave = async () => {
    if (onSave) {
      await onSave();
      setIsEditMode(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header with Edit/Save buttons */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Rate performance across key areas (1-10 scale)
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isEditMode ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Scores
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isSaving}
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${
                  hasChanges && !isSaving
                    ? "bg-pink-600 text-white hover:bg-pink-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Scores"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-2">
            {/* Label and Score */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {skill.name}
                  </span>
                  {skill.description && (
                    <span className="text-xs text-gray-500">
                      - {skill.description}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-lg font-bold text-pink-600 min-w-[3rem] text-right">
                {skill.value}/10
              </span>
            </div>

            {/* Slider */}
            <div className="relative">
              <input
                type="range"
                min="0"
                max="10"
                value={skill.value}
                onChange={(e) =>
                  handleSliderChange(skill.id, Number(e.target.value))
                }
                disabled={!isEditMode}
                className={`
                  w-full h-2 rounded-lg appearance-none
                  ${isEditMode ? "cursor-pointer" : "cursor-not-allowed opacity-70"}
                `}
                style={{
                  background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(skill.value / 10) * 100}%, #e5e7eb ${(skill.value / 10) * 100}%, #e5e7eb 100%)`,
                }}
              />
              {/* Tick marks */}
              <div className="flex justify-between mt-1 px-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => (
                  <span
                    key={tick}
                    className="text-xs text-gray-400 w-4 text-center"
                  >
                    {tick}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit mode indicator */}
      {isEditMode && (
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Edit Mode:</span> Adjust the sliders
            to update scores. Click &quot;Save Scores&quot; when finished or
            &quot;Cancel&quot; to discard changes.
          </p>
        </div>
      )}
    </div>
  );
}
