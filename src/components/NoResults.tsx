'use client';

import { AlertCircle } from 'lucide-react';

export default function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-900 border border-gray-700 rounded-xl">
      <AlertCircle className="w-16 h-16 text-gray-500 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">No Eligible Projects</h3>
      <p className="text-gray-400 text-center max-w-md">
        Sorry, this address is not eligible for any projects at this time. Please check back later or try a different address.
      </p>
    </div>
  );
}