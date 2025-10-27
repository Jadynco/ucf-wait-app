import React from 'react';
import { isRestaurantOpen } from '../utils';

export default function RestaurantCard({ r, onOpen }) {
  const open = isRestaurantOpen(r.hours, r.daysOpen);

  let waitColor = 'bg-yellow-400'; 
  if (r.waitTime < 5) waitColor = 'bg-green-500';
  else if (r.waitTime > 10) waitColor = 'bg-red-500';

  return (
    <div
      onClick={() => onOpen(r)}
      className={`rounded-lg p-4 bg-white shadow ${open ? 'opacity-100' : 'opacity-50 grayscale'}`}
      role="button"
    >
      <div className="flex items-start gap-3">
        <div className={`ml-auto text-sm font-bold ${waitColor} text-black px-2 py-1 rounded-full`}>
          {r.waitTime} min
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-2">{r.name}</h3>
      <div className="text-sm text-gray-600">
        {r.location} • <span className="font-medium">{r.cuisine}</span>
      </div>
      <div className="text-sm text-gray-500 mt-2">{open ? `Open • ${r.hours}` : 'Closed'}</div>
    </div>
  );
}