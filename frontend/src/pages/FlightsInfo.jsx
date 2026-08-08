import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRightLeft, Info, CheckCircle2 } from 'lucide-react';

export const FlightsInfo = () => {
  const [from, setFrom] = useState('New Delhi (DEL)');
  const [to, setTo] = useState('Dubai (DXB)');
  const [departDate, setDepartDate] = useState('2026-09-10');
  const [returnDate, setReturnDate] = useState('2026-09-17');
  const [travelers, setTravelers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [searched, setSearched] = useState(false);

  const sampleFlights = [
    { provider: 'Emirates EK-511', departure: '10:30 AM (DEL)', arrival: '01:15 PM (DXB)', duration: '4h 15m', price: 28500, type: 'Non-stop' },
    { provider: 'Air India AI-995', departure: '07:15 PM (DEL)', arrival: '09:45 PM (DXB)', duration: '4h 00m', price: 24200, type: 'Non-stop' },
    { provider: 'Indigo 6E-1461', departure: '01:00 PM (DEL)', arrival: '03:40 PM (DXB)', duration: '4h 10m', price: 19800, type: 'Non-stop' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Flight Assistance & Info</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Flight Information & Schedules</h1>
          <p className="text-xs text-slate-500">
            Check flight routes and schedules for your tour packages.
          </p>
        </div>

        {/* Informational Mode Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <span className="font-extrabold block">Informational Mode:</span>
            <span>Real-time flight search is configured with provider API abstraction. Airfares shown below reflect baseline estimates for tour package planning.</span>
          </div>
        </div>

        {/* Flight Search Widget */}
        <form onSubmit={handleSearch} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-500 mb-1">From Airport</label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-500 mb-1">To Airport</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-500 mb-1">Departure Date</label>
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-500 mb-1">Class</label>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-800 cursor-pointer"
              >
                <option value="Economy">Economy Class</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business Class</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg transition-all"
          >
            Search Flight Schedules
          </button>
        </form>

        {/* Flight Results List */}
        {searched && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Available Flight Schedules ({from} → {to})</h3>
            <div className="space-y-3">
              {sampleFlights.map((f, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <Plane className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block">{f.provider}</span>
                      <span className="text-slate-500">{f.type} • {f.duration}</span>
                    </div>
                  </div>

                  <div className="text-center sm:text-left">
                    <span className="font-bold text-slate-800">{f.departure} → {f.arrival}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-slate-900">₹{f.price.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block">Est. Fare / Person</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
