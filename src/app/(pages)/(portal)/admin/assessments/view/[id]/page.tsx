import AssessmentView from "../_view/assessment-view-page";

export default async function AssessmentViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AssessmentView id={id} />;
}
