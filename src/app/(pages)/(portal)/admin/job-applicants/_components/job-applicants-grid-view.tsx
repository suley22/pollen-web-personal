"use client";

import GridRow from "./job-applicants-grid-row";

// TODO(playground):
// - Considerar semántica de tabla (<table>) para accesibilidad y navegación.
// - Añadir paginación/virtualización si el volumen de filas es grande.
// - Extraer cabecera a un componente reutilizable si hay más vistas tipo grid.
export function GridView({ jobSeekers, onJobSeekerClick }) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 bg-gray-50 p-4 border-b border-gray-200 font-semibold text-sm">
          <div>Candidate</div>
          <div>Score</div>
          <div>Applied</div>
          <div>SubStatus</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200">
          {jobSeekers.map((jobSeeker) => (
            <GridRow
              key={jobSeeker.id}
              jobSeeker={jobSeeker}
              onClick={onJobSeekerClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
