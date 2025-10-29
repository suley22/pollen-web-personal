import {
  RecommendedCompaniesFormCard as FormCard,
  AllCompaniesFormCard,
} from "@/job-seeker/companies/_components/form-card";
import { Target } from "lucide-react";
import { Filters } from "@/components/design-system";
import { useAllCompaniesFilters } from "@/job-seeker/companies/_hooks/useAllCompaniesFilters";

export function RecommendedCompanies() {
  return (
    <div className="">
      <div className="border border-gray-100 bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-5">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="bg-pink-100 p-1 sm:p-2 rounded-lg">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
              Recommended For You
            </h2>
            <p
              className="text-xs sm:text-sm lg:text-base text-gray-600"
              style={{ fontFamily: "Poppins" }}
            >
              Based on your skills and preferences
            </p>
          </div>
        </div>
        <FormCard />
      </div>
    </div>
  );
}

export function AllCompanies() {
  const { filteredCompanies, loading, filterConfigs, onSearchChange } =
    useAllCompaniesFilters();

  return (
    <div className="mb-0">
      <div className="text-lg font-bold text-gray-900 mb-3">All Companies</div>

      <div className="mb-4">
        <Filters
          onSearchChange={onSearchChange}
          searchPlaceholder="Search companies, industries, or locations..."
          filters={filterConfigs}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4">
        <AllCompaniesFormCard companies={filteredCompanies} loading={loading} />
      </div>
    </div>
  );
}
