import {
  RecommendedCompaniesFormCard as FormCard,
  AllCompaniesFormCard,
} from "@/job-seeker/companies/_components/form-card";
import { Target } from "lucide-react";
import { Filters, Pagination } from "@/components/design-system";
import { useAllCompaniesPage } from "@/job-seeker/companies/_hooks/useAllCompaniesPage";

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
  const {
    companies,
    loading,
    pagination,
    filterConfigs,
    onSearchChange,
    handlePageChange,
    handlePageSizeChange,
  } = useAllCompaniesPage();

  return (
    <div className="flex flex-col gap-6 mb-0">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold text-gray-900">All Companies</div>

        <Filters
          onSearchChange={onSearchChange}
          searchPlaceholder="Search companies, industries, or locations..."
          filters={filterConfigs}
        />
      </div>
      {pagination && (
        <Pagination
          pageSizeOptions={[9, 18]}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
          from={pagination.from}
          to={pagination.to}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4">
          <AllCompaniesFormCard companies={companies} loading={loading} />
        </div>
      </div>
      {pagination && (
        <Pagination
          pageSizeOptions={[9, 18]}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
          from={pagination.from}
          to={pagination.to}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
