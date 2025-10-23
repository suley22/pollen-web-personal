"use client";
import EmployerProfileView from "@/employers/view/view";

import { use } from "react";

export default function EmployerReviewPage({ params }) {
  // Await the params to get the actual parameters
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return <EmployerProfileView id={id} />;
}
