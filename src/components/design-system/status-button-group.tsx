"use client";

import React from "react";
import { StatusBadge } from "./status-badge";
import { Save, X } from "lucide-react";
import {
  ApplicationStatus,
  ApplicationSubStatus,
  STATUS_SUB_STATUS_MAP,
} from "@/types/application-status";

interface StatusButtonGroupProps {
  /**
   * Estado actual del aplicante
   */
  currentStatus: ApplicationStatus;

  /**
   * Sub estado actual del aplicante
   */
  currentSubStatus: string | null;

  /**
   * Cambio de estado pendiente
   */
  pendingStatusChange?: {
    status: string;
    subStatus: string;
  } | null;

  /**
   * Handler para seleccionar un nuevo estado
   */
  onStatusSelect: (status: ApplicationStatus, subStatus: string) => void;

  /**
   * Handler para guardar el cambio de estado
   */
  onSaveStatusChange: () => void;

  /**
   * Handler para cancelar el cambio de estado
   */
  onCancelStatusChange: () => void;
}

/**
 * Mapeo de sub-estados a su siguiente status (para transiciones)
 */
const getNextStatus = (subStatus: ApplicationSubStatus): ApplicationStatus => {
  // Sub-estados que van a IN_PROGRESS
  if (
    subStatus === ApplicationSubStatus.INVITED_TO_POLLEN_INTERVIEW ||
    subStatus === ApplicationSubStatus.POLLEN_INTERVIEW_COMPLETE
  ) {
    return ApplicationStatus.IN_PROGRESS;
  }

  // Sub-estados que van a MATCHED_TO_EMPLOYER
  if (
    subStatus === ApplicationSubStatus.INTERVIEW_REQUESTED ||
    subStatus === ApplicationSubStatus.INTERVIEW_BOOKED ||
    subStatus === ApplicationSubStatus.INTERVIEW_COMPLETE ||
    subStatus === ApplicationSubStatus.AWAITING_EMPLOYER ||
    subStatus === ApplicationSubStatus.OFFER_ISSUED
  ) {
    return ApplicationStatus.MATCHED_TO_EMPLOYER;
  }

  // Sub-estados que van a COMPLETE
  if (
    subStatus === ApplicationSubStatus.NOT_PROGRESSING ||
    subStatus === ApplicationSubStatus.HIRED
  ) {
    return ApplicationStatus.COMPLETE;
  }

  // Sub-estados que van a NEW_APPLICANTS (Pending Review, Under Review)
  return ApplicationStatus.NEW_APPLICANTS;
};

/**
 * Determina la variante por defecto según el sub-estado
 */
const getDefaultVariant = (
  subStatus: ApplicationSubStatus,
): "available" | "destructive" | "success" => {
  if (subStatus === ApplicationSubStatus.NOT_PROGRESSING) {
    return "destructive";
  }
  if (subStatus === ApplicationSubStatus.HIRED) {
    return "success";
  }
  return "available";
};

/**
 * Componente para mostrar y manejar los botones de cambio de estado
 */
export function StatusButtonGroup({
  currentStatus,
  currentSubStatus,
  pendingStatusChange,
  onStatusSelect,
  onSaveStatusChange,
  onCancelStatusChange,
}: StatusButtonGroupProps) {
  /**
   * Determina la variante del badge basado en el estado actual y pendiente
   */
  const getVariant = (
    targetSubStatus: ApplicationSubStatus,
  ): "current" | "pending" | "available" | "destructive" | "success" => {
    if (pendingStatusChange?.subStatus === targetSubStatus) {
      return "pending";
    }
    if (currentSubStatus === targetSubStatus) {
      return "current";
    }
    return getDefaultVariant(targetSubStatus);
  };

  // Obtener todos los status posibles
  const allStatuses = Object.values(ApplicationStatus);

  return (
    <div className="flex flex-col mt-3 gap-4">
      {/* Iterar por cada status y mostrar sus sub-estados */}
      {allStatuses.map((status) => {
        const subStatuses = STATUS_SUB_STATUS_MAP[status];

        return (
          <div key={status} className="space-y-2">
            {/* Título del grupo de status */}
            <div
              className={`text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg ${
                status === ApplicationStatus.NEW_APPLICANTS
                  ? "bg-slate-100 text-slate-700"
                  : status === ApplicationStatus.IN_PROGRESS
                    ? "bg-blue-100 text-blue-700"
                    : status === ApplicationStatus.MATCHED_TO_EMPLOYER
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
              }`}
            >
              {status === ApplicationStatus.NEW_APPLICANTS && "New Applicants"}
              {status === ApplicationStatus.IN_PROGRESS && "In Progress"}
              {status === ApplicationStatus.MATCHED_TO_EMPLOYER &&
                "Matched to Employer"}
              {status === ApplicationStatus.COMPLETE && "Complete"}
            </div>

            {/* Botones de sub-estados */}
            <div className="grid grid-cols-2 gap-2">
              {subStatuses.map((subStatus) => (
                <StatusBadge
                  key={subStatus}
                  label={subStatus}
                  variant={getVariant(subStatus)}
                  size="sm"
                  onClick={() =>
                    onStatusSelect(getNextStatus(subStatus), subStatus)
                  }
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Pending Status Indicator with Save/Cancel */}
      {pendingStatusChange && (
        <div className="pt-3 border-t border-gray-200">
          <StatusBadge
            label={`Pending: ${pendingStatusChange.subStatus || "No status"}`}
            variant="pending"
            size="md"
            className="w-full"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={onSaveStatusChange}
              className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
            >
              <Save className="w-3 h-3" />
              Save
            </button>
            <button
              onClick={onCancelStatusChange}
              className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-1"
            >
              <X className="w-3 h-3" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
