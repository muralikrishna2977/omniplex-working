"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
        <h2 className="text-green-700 font-bold text-xl mb-4 text-center">
          Payment Successful!
        </h2>
        <button
          onClick={handleClose}
          className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
