import { JobForm } from "../form";
import { createJobAction } from "../actions";

export default function Page() {
  return <JobForm action={createJobAction} />;
}
