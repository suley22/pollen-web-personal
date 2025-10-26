import { JobForm } from "./_view/jobs-create-view";
import { createJobAction } from "../actions";

export default function Page() {
  return <JobForm action={createJobAction} />;
}
