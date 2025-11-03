import { notFound } from "next/navigation";
import AssessmentCreateUnifiedView from "@/assessments/create/_view/assessment-create-unified-view";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return <AssessmentCreateUnifiedView id={id} />;
}
