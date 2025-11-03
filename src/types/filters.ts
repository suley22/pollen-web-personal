/**
 * Represents a single option in a filter dropdown
 */
export interface FilterOption {
  label: string;
  value: string;
}

/**
 * Configuration for a single filter component
 */
export interface FilterConfig {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  options: FilterOption[];
  onValueChange: (value: string) => void;
}

/**
 * Props for the Filters component
 */
export interface FiltersProps {
  onSearchChange: (searchTerm: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  debounceMs?: number;
  /**
   * When true, the dynamic filters are hidden behind a toggle button.
   * The search input remains visible. Default is false.
   */
  collapsible?: boolean;
  /**
   * Initial collapsed state when `collapsible` is true. Default is true.
   */
  defaultCollapsed?: boolean;
  /**
   * Optional label for the toggle button.
   */
  toggleButtonLabel?: string;
}
