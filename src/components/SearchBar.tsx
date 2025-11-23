'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onCheck: (address: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onCheck, isLoading }: SearchBarProps) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim() && !isLoading) {
      onCheck(address.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Paste your 0x address here..."
            className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6f54ff] focus:border-transparent transition-all"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !address.trim()}
          className="px-8 py-4 bg-[#6f54ff] hover:bg-[#5d45e6] text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
        >
          Check
        </button>
      </div>
    </form>
  );
}