"use client";

import { SearchBar } from "../(components)/search-bar";
import { useState } from "react";
import { List } from "./list";

export function Content({ employerList }) {
  const [listState, setListState] = useState(employerList);

  const addButtonOnClick = () => {
    console.log("Funciona");
  };

  const filterEmployersFunction = (searchTerm, selectedStatus) => {
    if (searchTerm === "" && selectedStatus === "all") {
      setListState(employerList);
    }

    const listFiltered = employerList.filter((app) => {
      const matchesSearch =
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.industries.some((industry) =>
          industry.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesStatus =
        selectedStatus === "all" || app.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    setListState(listFiltered);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mx-auto px-4 py-4">
          Employers Management
        </h1>
      </div>

      <SearchBar
        addButtonOnClick={addButtonOnClick}
        filterFunction={filterEmployersFunction}
      />

      <List employerList={listState} />
    </div>
  );
}
