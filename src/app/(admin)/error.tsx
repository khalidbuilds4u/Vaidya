"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-red-50 text-red-900">
      <h2 className="text-2xl font-bold mb-4">Admin Error!</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg border border-red-200 text-left w-full max-w-3xl overflow-auto">
        <p className="font-mono text-sm mb-2 font-bold">Digest: {error.digest}</p>
        <p className="font-mono text-sm mb-4">Message: {error.message}</p>
        {error.stack && (
          <pre className="text-xs font-mono whitespace-pre-wrap">{error.stack}</pre>
        )}
      </div>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
