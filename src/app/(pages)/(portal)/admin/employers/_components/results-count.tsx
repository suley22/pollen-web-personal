"use client";

import { Pagination } from "@/components/design-system/pagination";

export function ResultsCount({
  pagination,
  handlePageChange,
  handlePageSizeChange,
}) {
  return (
    pagination && (
      <Pagination
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
    )
  );
}
