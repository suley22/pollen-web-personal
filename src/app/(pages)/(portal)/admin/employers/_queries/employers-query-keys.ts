const all = ["employers"] as const;
const list = (filters?: any) =>
  [...EMPLOYERS_QUERY_KEYS.all, "list", filters] as const;
const profile = (id: string) =>
  [...EMPLOYERS_QUERY_KEYS.all, "profile", id] as const;
const statistics = (filters?: any) =>
  [...EMPLOYERS_QUERY_KEYS.all, "statistics", filters] as const;

export const EMPLOYERS_QUERY_KEYS = {
  all,
  list,
  profile,
  statistics,
};
