"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cancel() {
  const [showPopup, setShowPopup] = useState(true);
  const router = useRouter();

  const handleRetry = () => {
    router.push("/");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
        <h2 className="text-red-600 font-bold text-xl mb-4 text-center">
          Payment Failed
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handleRetry}
            className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
          >
            Retry
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="flex-1 bg-gray-300 text-black font-semibold py-2 px-4 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
