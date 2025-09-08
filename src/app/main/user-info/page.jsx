"use client";

import { useState } from "react";
import { updateUserAction } from "./actions"; // 👈 la server action
import { PrimaryButton } from "@/components/ui/buttons/primary-button";

export default function Page() {
  const [form, setForm] = useState({
    nombre: "Juan",
    apellido: "Pérez",
    pronouns: "He/Him",
  });

  const [, setIsEditing] = useState(false);
  const [, setPending] = useState(false);

  const handleChange = (e) => {
    const propertyName = [e.target.name];
    const propertyValue = [e.target.value];

    setForm({ ...form, [propertyName]: propertyValue });
  };

  const handleSave = async () => {
    setPending(true);
    try {
      await updateUserAction(form); // 👈 aquí pasas el id del usuario
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold !mb-0">¡Ya casi!</h2>
          <p>Completa la información para continuar</p>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="mb-1 font-semibold">Nombre</p>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Nombre"
              />
            </div>
            <div className="flex-1">
              <p className="mb-1 font-semibold">Apellido</p>
              <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Apellido"
              />
            </div>
          </div>
          <div>
            <p className="mb-1 font-semibold">Pronouns</p>
            <select
              placeholder="Select pronouns"
              name="pronouns"
              value={form.pronouns}
              onChange={handleChange}
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
              onClick={handleSave}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
