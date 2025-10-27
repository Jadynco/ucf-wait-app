import React from 'react';

export default function Header({query, setQuery, openCart, cartCount}){
  return (
    <header className="flex items-center gap-4 py-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-md bg-ucf-gold flex items-center justify-center font-bold text-ucf-black">UCF</div>
        <div>
          <div className="text-lg font-bold">UCF Dining Wait Times</div>
          <div className="text-sm text-gray-500">Campus restaurant wait times</div>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} className="px-3 py-2 rounded-md shadow-sm w-72" placeholder="Search restaurants, cuisine, location..." />
        <button onClick={openCart} className="bg-ucf-gold text-black px-3 py-2 rounded-md font-semibold">Cart ({cartCount})</button>
      </div>
    </header>
  )
}