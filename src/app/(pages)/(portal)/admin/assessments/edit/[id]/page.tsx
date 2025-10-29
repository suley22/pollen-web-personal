import { notFound } from "next/navigation";
import AssessmentCreateView from "@/app/(pages)/(portal)/admin/assessments/create/_view/assessment-create-view";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return <AssessmentCreateView id={id} />;
}
