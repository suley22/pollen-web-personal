"use client";

import { useState } from "react";
import { updateUserAction } from "./actions"; // 👈 la server action

export default function Page() {
  const [form, setForm] = useState({
    nombre: "Juan",
    apellido: "Pérez",
    otherData: "Algo más",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">User Info</h2>

        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Nombre"
            />
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Apellido"
            />
            <input
              type="text"
              name="otherData"
              value={form.otherData}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Other Data"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                disabled={pending}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {pending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {form.nombre}</p>
            <p><strong>Apellido:</strong> {form.apellido}</p>
            <p><strong>Other Data:</strong> {form.otherData}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
