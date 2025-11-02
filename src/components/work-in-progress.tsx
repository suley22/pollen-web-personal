export function WorkInProgress({ name }) {
  return (
    <div className="p-4 max-w-4xl mx-auto text-center align-middle">
      <h1>{name}</h1>
      {/* Add your profile information and editing capabilities here */}
      <p className="text-gray-500">Work in progress...</p>
    </div>
  );
}
