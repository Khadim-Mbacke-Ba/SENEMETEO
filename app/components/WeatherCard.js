export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30">

        {/* Ville et pays */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-white">
            {weather.name}
          </h2>
          <p className="text-white/70">
            {weather.sys.country}
          </p>
        </div>

        {/* Température et icône */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src={iconUrl}
            alt={weather.weather[0].description}
            className="w-24 h-24"
          />

          <div>
            <p className="text-6xl font-bold text-white">
              {Math.round(weather.main.temp)}°C
            </p>

            <p className="text-white/80 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
        </div>

        {/* Détails */}
        <div className="grid grid-cols-3 gap-4 text-center">

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white/60 text-sm">Ressenti</p>
            <p className="text-white text-xl font-semibold">
              {Math.round(weather.main.feels_like)}°C
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white/60 text-sm">Humidité</p>
            <p className="text-white text-xl font-semibold">
              {weather.main.humidity}%
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white/60 text-sm">Vent</p>
            <p className="text-white text-xl font-semibold">
              {Math.round(weather.wind.speed * 3.6)} km/h
            </p>
          </div>

        </div>

      </div>
    </div>
    );
}