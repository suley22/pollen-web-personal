export function Alert({ title, description, type }) {
  switch (type) {
    case 'success':
      return (
        <div className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3" role="alert">
          <p className="font-bold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      )
    case 'error':
      return (
        <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
          <p className="font-bold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      )
  }
}
