import AssessmentView from "../_view/assessment-view-page";

export default function AssessmentViewPage({
  params,
}: {
  params: { id: string };
}) {
  return <AssessmentView id={params.id} />;
}
