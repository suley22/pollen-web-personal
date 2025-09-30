"use client";

import { PrimaryButton } from "@/components/ui/buttons/primary-button";
import { updateUserInfo as updateUserAction } from "./actions";
import { useUserInfo } from "./useUserInfo";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { form } = useUserInfo();
  const [state, formAction, isLoading] = useActionState(updateUserAction);

  useEffect(() => {
    if (state?.success && state?.redirect) {
      // Usar replace para limpiar el historial
      router.replace(state.redirect);
    }
  }, [state, router]);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold !mb-0">¡Ya casi!</h2>
          <p>Completa la información para continuar</p>
        </div>

        <div className="space-y-3">

          <form action={formAction} className="flex flex-col gap-6">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="first_name" className="mb-1 font-semibold">Nombre</Label>
                <Input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={form.handleChange}
                  className="w-full border p-2 rounded"
                  placeholder="Nombre"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="last_name" className="mb-1 font-semibold">Apellido</Label>
                <Input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={form.handleChange}
                  className="w-full border p-2 rounded"
                  placeholder="Apellido"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pronouns" className="mb-1 font-semibold">Pronouns</Label>
              <select
                id="pronouns"
                placeholder="Select pronouns"
                name="pronouns"
                value={form.pronouns}
                onChange={form.handleChange}
                className="w-full border p-2 rounded bg-white"
              >
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <PrimaryButton
                text="Save changes"
                className=""
                disabled={isLoading}
              />
            </div>
            {state?.message && (
              <p className={state?.success ? "text-green-500" : "text-red-500"}>
                {state.message}
              </p>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}
