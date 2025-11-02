import PlaygroundView from "./_view/playground-view";

export default function PlaygroundPage() {
  // TODO: En el futuro, recibir jobId desde params o searchParams
  // Ejemplo: const jobId = params.jobId || searchParams.get('jobId')
  // TODO(playground): Migrar a ruta dinámica /admin/playground/[jobId] y validar UUID.
  const MOCK_JOB_ID = "139ad003-8062-4cf2-8aee-354451d51798"; // UUID temporal para desarrollo

  return <PlaygroundView jobId={MOCK_JOB_ID} />;
}
