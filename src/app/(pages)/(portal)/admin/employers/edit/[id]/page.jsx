"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ProfileForm } from "@/app/(pages)/(portal)/admin/employers/create/_view/employers-create-form";

export default function Page({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  if (!id) {
    return notFound();
  }

  return <ProfileForm id={id} />;
}
