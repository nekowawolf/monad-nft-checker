'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-12 h-12 text-[#6f54ff] animate-spin mb-4" />
      <p className="text-gray-400">Checking eligibility...</p>
    </div>
  );
}