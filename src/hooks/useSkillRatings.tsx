"use client";

import { useState, useEffect, useCallback } from "react";

export interface Skill {
  id: string;
  name: string;
  description?: string;
}

export interface SkillRating extends Skill {
  value: number;
}

interface UseSkillRatingsOptions {
  /**
   * Lista de skills a calificar
   */
  skills: Skill[];

  /**
   * Calificaciones iniciales (opcional)
   * Si no se proporciona, todas las skills empiezan en 0
   */
  initialRatings?: Record<string, number>;

  /**
   * Callback que se ejecuta cuando cambia una calificación
   */
  onChange?: (
    skillId: string,
    value: number,
    allRatings: Record<string, number>,
  ) => void;

  /**
   * Callback que se ejecuta cuando se guardan todas las calificaciones
   */
  onSave?: (ratings: Record<string, number>) => void | Promise<void>;
}

interface UseSkillRatingsReturn {
  /**
   * Skills con sus valores actuales
   */
  skillRatings: SkillRating[];

  /**
   * Calificaciones en formato objeto
   */
  ratings: Record<string, number>;

  /**
   * Actualizar la calificación de un skill
   */
  updateRating: (skillId: string, value: number) => void;

  /**
   * Actualizar múltiples calificaciones a la vez
   */
  updateRatings: (ratings: Record<string, number>) => void;

  /**
   * Resetear a los valores iniciales
   */
  reset: () => void;

  /**
   * Resetear todas las calificaciones a 0
   */
  clear: () => void;

  /**
   * Guardar las calificaciones actuales
   */
  save: () => Promise<void>;

  /**
   * Indica si hay cambios sin guardar
   */
  hasChanges: boolean;

  /**
   * Indica si se está guardando
   */
  isSaving: boolean;

  /**
   * Promedio de todas las calificaciones
   */
  averageRating: number;

  /**
   * Total de puntos
   */
  totalScore: number;
}

/**
 * Hook para gestionar calificaciones de skills
 *
 * @example
 * // Con calificaciones iniciales
 * const { skillRatings, updateRating, save, hasChanges } = useSkillRatings({
 *   skills: [
 *     { id: 'skill1', name: 'JavaScript', description: 'Programming language' },
 *     { id: 'skill2', name: 'React' }
 *   ],
 *   initialRatings: { skill1: 4, skill2: 3 },
 *   onChange: (skillId, value, allRatings) => {
 *     console.log(`${skillId} changed to ${value}`);
 *   },
 *   onSave: async (ratings) => {
 *     await api.saveRatings(ratings);
 *   }
 * });
 *
 * @example
 * // Sin calificaciones iniciales
 * const { skillRatings, updateRating, save } = useSkillRatings({
 *   skills: [
 *     { id: 'skill1', name: 'JavaScript' },
 *     { id: 'skill2', name: 'React' }
 *   ],
 *   onSave: async (ratings) => {
 *     await api.createRatings(ratings);
 *   }
 * });
 */
export function useSkillRatings({
  skills,
  initialRatings = {},
  onChange,
  onSave,
}: UseSkillRatingsOptions): UseSkillRatingsReturn {
  // Crear ratings iniciales basados en skills y initialRatings
  const createInitialRatings = useCallback(() => {
    const ratings: Record<string, number> = {};
    skills.forEach((skill) => {
      ratings[skill.id] = initialRatings[skill.id] ?? 0;
    });
    return ratings;
  }, [skills, initialRatings]);

  const [ratings, setRatings] =
    useState<Record<string, number>>(createInitialRatings);
  const [originalRatings, setOriginalRatings] =
    useState<Record<string, number>>(createInitialRatings);
  const [isSaving, setIsSaving] = useState(false);

  // Actualizar solo cuando el jobSeeker cambie (usando un string serializado de initialRatings)
  const initialRatingsKey = JSON.stringify(initialRatings);
  useEffect(() => {
    const newRatings = createInitialRatings();
    setRatings(newRatings);
    setOriginalRatings(newRatings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRatingsKey]);

  // Verificar si hay cambios
  const hasChanges = Object.keys(ratings).some(
    (key) => ratings[key] !== originalRatings[key],
  );

  // Actualizar una calificación
  const updateRating = useCallback(
    (skillId: string, value: number) => {
      setRatings((prev) => {
        const newRatings = {
          ...prev,
          [skillId]: value,
        };

        // Llamar al callback de onChange
        if (onChange) {
          onChange(skillId, value, newRatings);
        }

        return newRatings;
      });
    },
    [onChange],
  );

  // Actualizar múltiples calificaciones
  const updateRatings = useCallback(
    (newRatings: Record<string, number>) => {
      setRatings((prev) => {
        const updated = { ...prev, ...newRatings };

        // Llamar al callback de onChange para cada cambio
        if (onChange) {
          Object.keys(newRatings).forEach((skillId) => {
            if (prev[skillId] !== newRatings[skillId]) {
              onChange(skillId, newRatings[skillId], updated);
            }
          });
        }

        return updated;
      });
    },
    [onChange],
  );

  // Resetear a valores originales
  const reset = useCallback(() => {
    setRatings(originalRatings);
  }, [originalRatings]);

  // Limpiar todas las calificaciones
  const clear = useCallback(() => {
    const clearedRatings: Record<string, number> = {};
    skills.forEach((skill) => {
      clearedRatings[skill.id] = 0;
    });
    setRatings(clearedRatings);
  }, [skills]);

  // Guardar las calificaciones
  const save = useCallback(async () => {
    if (!onSave) {
      console.warn("useSkillRatings: onSave callback not provided");
      return;
    }

    setIsSaving(true);
    try {
      await onSave(ratings);
      // Actualizar originalRatings después de guardar exitosamente
      setOriginalRatings(ratings);
    } catch (error) {
      console.error("Error saving ratings:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [ratings, onSave]);

  // Crear array de skillRatings
  const skillRatings: SkillRating[] = skills.map((skill) => ({
    ...skill,
    value: ratings[skill.id] ?? 0,
  }));

  // Calcular promedio
  const averageRating =
    skills.length > 0
      ? Object.values(ratings).reduce((sum, val) => sum + val, 0) /
        skills.length
      : 0;

  // Calcular total
  const totalScore = Object.values(ratings).reduce((sum, val) => sum + val, 0);

  return {
    skillRatings,
    ratings,
    updateRating,
    updateRatings,
    reset,
    clear,
    save,
    hasChanges,
    isSaving,
    averageRating,
    totalScore,
  };
}
