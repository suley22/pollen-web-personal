"use client";
import EmployerProfileView from "@/app/(pages)/(portal)/admin/employers/view/_view/employers-view";

import { use } from "react";

export default function EmployerReviewPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return <EmployerProfileView id={id} />;
}
