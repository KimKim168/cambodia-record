import { ArrowLeftCircle } from 'lucide-react';
import React from 'react';

export default function BackButton({ homePath = '/' }) {
  const handleBack = () => {
    window.history.back();
  };

  // Hide if on home page
  if (window.location.pathname === homePath) {
    return null;
  }

  return (
    <button
      onClick={handleBack}
      className="px-4 py-2 text-black cursor-pointer rounded-lg transition"
    >
        <ArrowLeftCircle/>
    </button>
  );
}
