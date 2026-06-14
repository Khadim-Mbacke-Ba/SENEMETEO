const cities = [
  { name: 'Dakar', emoji: '🌍' },
  { name: 'Saint-Louis', emoji: '🌊' },
  { name: 'Thiès', emoji: '🏙️' },
  { name: 'Ziguinchor', emoji: '🌴' },
  { name: 'Paris', emoji: '🇫🇷' },
  { name: 'New York', emoji: '🗽' },
];

export default function QuickCities({ onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {cities.map((city) => (
        <button
          key={city.name}
          onClick={() => onSelect(city.name)}
          className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-sm border border-white/20 transition-colors"
        >
          {city.emoji} {city.name}
        </button>
      ))}
    </div>
  );
}