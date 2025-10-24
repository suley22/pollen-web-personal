"use client";
import { ProfileForm } from "@/employers/form";
import { use } from "react";
import { notFound } from "next/navigation";

export default function Page({ params }) {
  // Await the params to get the actual parameters
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  if (!id) {
    return notFound();
  }

  return <ProfileForm id={id} />;
}
