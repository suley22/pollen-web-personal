// src/lib/candidateUtils.js

export function getUnifiedCandidateData(candidateId, candidates = []) {
  const candidate = candidates.find((c) => c.id === candidateId);

  if (!candidate) {
    return {
      applicationCount: 0,
      hasPollenInteraction: false,
      lastInteractionDate: null,
      lastPollenTeamMember: null,
      isFastTrack: false,
    };
  }

  // Esto podrías mejorarlo cuando tengas endpoint real de interacciones
  const hasPollenInteraction = Boolean(
    candidate.lastInteractionDate || candidate.lastPollenTeamMember,
  );

  return {
    applicationCount: candidate.applicationCount || 1,
    hasPollenInteraction,
    lastInteractionDate: candidate.lastInteractionDate || null,
    lastPollenTeamMember: candidate.lastPollenTeamMember || null,
    isFastTrack: candidate.isFastTrack || false,
  };
}

export function getInteractionDisplayText(candidateData) {
  if (
    candidateData.hasPollenInteraction &&
    candidateData.lastPollenTeamMember
  ) {
    return `Last spoke with ${candidateData.lastPollenTeamMember}${
      candidateData.lastInteractionDate
        ? ` on ${candidateData.lastInteractionDate}`
        : ""
    }`;
  }

  if (candidateData.applicationCount > 1) {
    return `${candidateData.applicationCount} applications with Pollen`;
  }

  return `1 application with Pollen`;
}
