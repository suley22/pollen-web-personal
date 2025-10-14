export const subStatusToPrimaryStatus = {
  unopened: "new_applicants",
  under_review: "new_applicants",
  invited_to_pollen_interview: "in_progress",
  pollen_interview_complete: "in_progress",
  awaiting_employer: "matched_to_employer",
  interview_requested: "matched_to_employer",
  interview_complete: "matched_to_employer",
  interview_booked: "matched_to_employer",
  offer_issued: "matched_to_employer",
  hired: "complete",
  not_progressing: "complete",
};
