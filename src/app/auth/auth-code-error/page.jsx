export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-6">
          There was an error during the authentication process. Please try again.
        </p>
        <a
          href="/login"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}
