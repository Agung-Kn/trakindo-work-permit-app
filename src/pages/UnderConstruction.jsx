export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 rounded-md shadow-md">
      <p className="text-indigo-600 font-semibold text-sm">Coming Soon</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Under Construction
      </h1>
      <p className="mt-4 text-base text-gray-600 max-w-md text-center">
        This feature is still in development. We’re working hard to bring it to
        you soon. Stay tuned!
      </p>
      <div className="mt-6 flex items-center gap-x-4">
        <a
          href="/"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </a>
        <a
          href="mailto:support@example.com"
          className="text-sm font-semibold text-gray-900 flex items-center gap-1"
        >
          Contact support
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
