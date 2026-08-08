import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Utensils, Hotel, Car, CheckCircle2 } from 'lucide-react';

export const ItineraryTimeline = ({ itinerary = [] }) => {
  const [openDays, setOpenDays] = useState([1]); // Day 1 expanded by default

  const toggleDay = (dayNum) => {
    if (openDays.includes(dayNum)) {
      setOpenDays(openDays.filter((d) => d !== dayNum));
    } else {
      setOpenDays([...openDays, dayNum]);
    }
  };

  if (!itinerary || itinerary.length === 0) {
    return <div className="text-xs text-slate-400 py-4">Itinerary details will be provided upon booking.</div>;
  }

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" /> Tour Itinerary ({itinerary.length} Days)
        </h3>
        <button
          onClick={() => {
            if (openDays.length === itinerary.length) {
              setOpenDays([]);
            } else {
              setOpenDays(itinerary.map((i) => i.day));
            }
          }}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
        >
          {openDays.length === itinerary.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="space-y-3 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-emerald-200">
        {itinerary.map((item) => {
          const isOpen = openDays.includes(item.day);
          return (
            <div key={item.day} className="relative pl-12 transition-all">
              {/* Day Circle Badge */}
              <div
                onClick={() => toggleDay(item.day)}
                className={`absolute left-0 top-3 w-10 h-10 rounded-full flex items-center justify-center font-black text-xs cursor-pointer shadow-md transition-all ${
                  isOpen
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white ring-4 ring-emerald-100 scale-105'
                    : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-500'
                }`}
              >
                D{item.day}
              </div>

              {/* Day Card */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => toggleDay(item.day)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block">
                      Day {item.day}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
                  </div>
                  <div className="p-1.5 rounded-full bg-slate-100 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                    {/* Quick Specs Icons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      {item.meals && (
                        <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <Utensils className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{item.meals}</span>
                        </div>
                      )}
                      {item.hotel && (
                        <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <Hotel className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span className="truncate">{item.hotel}</span>
                        </div>
                      )}
                    </div>

                    {/* Activities List */}
                    {item.activities && item.activities.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Activities:</span>
                        <div className="flex flex-wrap gap-2">
                          {item.activities.map((act, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
