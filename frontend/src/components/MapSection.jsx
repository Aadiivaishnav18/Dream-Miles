import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import API from '../api/axios';

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const MapSection = () => {
  const [destinations, setDestinations] = useState([]);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data } = await API.get('/destinations');
        if (data.success && data.data) {
          setDestinations(data.data);
        }
      } catch (err) {
        console.error('Error loading map destinations:', err);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <section className="py-16 bg-slate-900 text-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Interactive Map</span>
          <h2 className="text-3xl sm:text-4xl font-black">Explore Destinations Worldwide</h2>
          <p className="text-sm text-slate-400">
            Click on markers across the map to discover top locations, luxury stays, and curated itineraries.
          </p>
        </div>

        {/* Leaflet Map Box */}
        <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative z-10">
          <MapContainer
            center={[20.5937, 78.9629]} // Default centered near India/Global
            zoom={3}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {destinations.map((dest) => (
              <Marker key={dest._id} position={[dest.latitude, dest.longitude]} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="w-56 p-1 space-y-2 text-slate-900 font-sans">
                    <img src={dest.heroImage} alt={dest.name} className="w-full h-24 object-cover rounded-xl" />
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                        <span>{dest.countryName}</span>
                        <span className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3 h-3 fill-current" /> {dest.rating || 4.8}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900">{dest.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{dest.shortDescription}</p>
                    </div>
                    <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                      <span className="text-xs font-black text-emerald-600">
                        {formatPrice(dest.startingPrice || 49900)}
                      </span>
                      <Link
                        to={`/tours?destination=${dest.name}`}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1 hover:bg-emerald-700"
                      >
                        Explore <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};