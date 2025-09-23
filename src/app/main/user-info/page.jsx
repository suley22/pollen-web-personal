"use client";

import { useState } from "react";
import { updateUserAction } from "./actions"; // 👈 la server action
import { PrimaryButton } from "@/components/ui/buttons/primary-button";
import { Card } from "@/components/ui/card";

export default function Page() {
  const [form, setForm] = useState({
    nombre: "Juan",
    apellido: "Pérez",
    pronouns: "He/Him",
  });

  const [, setIsEditing] = useState(false);
  const [, isLoading] = useState(false);

  const handleChange = (e) => {
    const propertyName = [e.target.name];
    const propertyValue = [e.target.value];

    setForm({ ...form, [propertyName]: propertyValue });
  };

  const handleSave = async () => {
    isLoading(true);
    try {
      await updateUserAction(form); // 👈 aquí pasas el id del usuario
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      isLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center">
      <Card className="shadow-lg p-6 space-y-6 mt-10 w-full max-w-3xl">
        {/* Text */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold !mb-0">¡Ya casi!</h2>
          <p>Completa la información para continuar</p>
        </div>
        {/* Forms */}
        <div className="space-y-2">
          {/* Names */}
          <div className="flex gap-2">
            {/* Nombre */}
            <div className="flex flex-col">
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
            {/* Apellido */}
            <div className="flex flex-col">
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
          {/* Pronouns */}
          <div className="flex flex-col">
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
        </div>
        {/* Button */}
          <div className="flex flex-row">
            <PrimaryButton
              size="lg"
              text="Save changes"
              onClick={handleSave}
            />
          </div>
      </Card>
    </div>
  );
}
