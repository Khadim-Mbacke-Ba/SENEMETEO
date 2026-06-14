'use client';

import { useState } from 'react';

export default function SearchBox({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville (ex: Dakar)"
          className="
            flex-1
            px-4 py-3
            rounded-lg
            border-2 border-white/30
            bg-white/20
            text-white
            placeholder-white/70
            focus:outline-none
            focus:border-white
            backdrop-blur-sm
          "
        />

        <button
          type="submit"
          className="
            px-6 py-3
            bg-white
            text-blue-600
            font-semibold
            rounded-lg
            hover:bg-blue-50
            transition-colors
            shadow-lg
          "
        >
          Rechercher
        </button>
      </div>
    </form>
  );
}