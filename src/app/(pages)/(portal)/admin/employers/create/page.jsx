import { ProfileForm } from "@/employers/form";
import { createEmployerAction } from "@/employers/actions";

export default async function Page({ params }) {
  return <ProfileForm action={createEmployerAction} />;
}
