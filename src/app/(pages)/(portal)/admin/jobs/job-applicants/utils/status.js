const SUB_STATUS_LABELS = {
  under_review: "Under Review",
  unopened: "Unopened",
  invited_to_pollen_interview: "Invited to Pollen Interview",
  pollen_interview_complete: "Pollen Interview Complete",
  awaiting_employer: "Awaiting Employer",
  interview_requested: "Interview Requested",
  interview_booked: "Interview Booked",
  interview_complete: "Interview Complete",
  offer_issued: "Offer Issued",
  not_progressing: "Not Progressing",
  hired: "Hired",
};

const toTitleCase = (value = "") =>
  value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const getAvailableSubStatuses = (
  primaryStatusFilter,
  subStatusToPrimaryStatus,
) => {
  if (!subStatusToPrimaryStatus) {
    return [];
  }

  if (!primaryStatusFilter || primaryStatusFilter.length === 0) {
    return Object.keys(subStatusToPrimaryStatus);
  }

  return Object.keys(subStatusToPrimaryStatus).filter((subStatus) =>
    primaryStatusFilter.includes(subStatusToPrimaryStatus[subStatus]),
  );
};

export const getSubStatusLabel = (subStatus) =>
  SUB_STATUS_LABELS[subStatus] ?? toTitleCase(subStatus);
