export const EMPLOYERS_QUERY_KEYS = {
  all: ["employers"] as const,
  list: (filters?: any) =>
    [...EMPLOYERS_QUERY_KEYS.all, "list", filters] as const,
  profile: (id: string) =>
    [...EMPLOYERS_QUERY_KEYS.all, "profile", id] as const,
  statistics: (filters?: any) =>
    [...EMPLOYERS_QUERY_KEYS.all, "statistics", filters] as const,
};
