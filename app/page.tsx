'use client';

import { useState } from 'react';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import QuickCities from './components/QuickCities';
export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  // =========================
  // Fetch par ville
  // =========================
  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );

      if (!response.ok) throw new Error('Ville non trouvée');

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Fetch par coordonnées GPS
  // =========================
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );

      if (!response.ok) throw new Error('Erreur de localisation');

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Géolocalisation
  // =========================
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Géolocalisation non supportée');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        setError('Impossible de vous localiser');
        setLoading(false);
      }
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 pb-8">
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            SeneMto
          </h1>
          <p className="text-white/80 mb-4">
            La météo du Sénégal et du monde
          </p>

          <button
            onClick={handleGeolocation}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors border border-white/30 text-sm"
          >
            Ma position
          </button>
        </div>

        {/* Search */}
        <SearchBox onSearch={fetchWeatherByCity} />

        {/* Quick Cities */}
        <QuickCities onSelect={fetchWeatherByCity} />

        {/* Loading */}
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
            <p className="text-white mt-2">Chargement...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-md mx-auto mt-8 bg-red-500/20 border border-red-300/30 rounded-xl p-4">
            <p className="text-white text-center">{error}</p>
          </div>
        )}

        {/* Weather card */}
        {weather && !loading && (
          <WeatherCard weather={weather} />
        )}
      </div>
    </main>
  );
}