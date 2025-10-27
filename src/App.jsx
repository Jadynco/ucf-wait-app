import React, {useMemo, useState} from 'react';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import mockRestaurants from './mockRestaurants';
import { isRestaurantOpen } from './utils';

function Modal({restaurant, onClose, addToCart}){
  if(!restaurant) return null;
  const open = isRestaurantOpen(restaurant.hours, restaurant.daysOpen);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-3xl p-6" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{restaurant.name}</h2>
            <div className="text-sm text-gray-500">{restaurant.location} • {restaurant.cuisine}</div>
          </div>
          <div className="text-right">
            <div className="font-bold">{open? `${restaurant.waitTime} min` : 'Closed'}</div>
            <div className="text-sm text-gray-500">{restaurant.hours}</div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {restaurant.menu?.map(item=>(
            <div key={item.id} className="flex justify-between items-center bg-yellow-50 p-3 rounded">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">{item.category}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-bold">${item.price.toFixed(2)}</div>
                <button onClick={()=>addToCart(item)} className="bg-ucf-gold px-3 py-1 rounded-md font-semibold">Add</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Close</button>
        </div>
      </div>
    </div>
  )
}

function CartDrawer({cart, closeCart, checkout, removeItem}){
  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0);
  return (
    <div className="fixed right-4 bottom-4 w-80 bg-white rounded-lg shadow p-4">
      <div className="font-bold text-lg">Cart</div>
      <div className="mt-2 max-h-48 overflow-auto">
        {cart.length===0 && <div className="text-gray-500">No items yet</div>}
        {cart.map(it=>(
          <div key={it.id} className="flex justify-between items-center py-2 border-b">
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm text-gray-500">x{it.qty} • ${(it.price*it.qty).toFixed(2)}</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex gap-2">
                <button onClick={()=>removeItem(it.id,-1)} className="px-2">−</button>
                <button onClick={()=>removeItem(it.id,1)} className="px-2">+</button>
              </div>
              <button onClick={()=>removeItem(it.id,999)} className="text-red-600 text-sm">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="font-bold">Total</div>
        <div className="font-bold">${total.toFixed(2)}</div>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={checkout} disabled={cart.length===0} className="flex-1 bg-ucf-gold text-black py-2 rounded-md font-semibold disabled:opacity-50">Checkout</button>
        <button onClick={closeCart} className="bg-gray-200 px-3 py-2 rounded-md">Close</button>
      </div>
    </div>
  )
}

function CheckoutModal({restaurant, onClose, eta}){
  if(!restaurant) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-2xl p-6" onClick={e=>e.stopPropagation()}>
        <h3 className="text-xl font-bold">Pickup Details</h3>
        <div className="mt-4 flex gap-4">
          <div className="w-36 h-24 bg-gray-100 rounded flex items-center justify-center">Map</div>
          <div>
            <div className="font-semibold">{restaurant.name}</div>
            <div className="text-sm text-gray-500">{restaurant.location}</div>
            <div className="mt-2">Address: <strong>Campus — {restaurant.location}</strong></div>
            <div className="mt-2">Estimated pickup: <strong>{eta} min</strong></div>
          </div>
        </div>

        <div className="mt-4">
          <div className="font-semibold mb-2">Directions</div>
          <ol className="list-decimal list-inside text-gray-600">
            <li>Walk to {restaurant.location}</li>
            <li>Enter and head to the food court / pickup area</li>
            <li>Show order confirmation</li>
          </ol>
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-ucf-gold rounded-md font-semibold">Done</button>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [eta, setEta] = useState(10);

const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();
  const result = mockRestaurants
    .filter(r => {
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.cuisine || '').toLowerCase().includes(q) ||
        (r.location || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const aOpen = isRestaurantOpen(a.hours, a.daysOpen);
      const bOpen = isRestaurantOpen(b.hours, b.daysOpen);

      if (aOpen && !bOpen) return -1;
      if (!aOpen && bOpen) return 1;

      return a.waitTime - b.waitTime;
    });

  return result;
}, [query]);



  function addToCart(item){
    setCart(prev=>{
      const found = prev.find(p=>p.id===item.id);
      if(found) return prev.map(p=> p.id===item.id ? {...p, qty: p.qty+1} : p);
      return [...prev, {...item, qty:1}];
    })
  }

  function removeItem(id, delta){
    setCart(prev=>{
      if(delta===999) return prev.filter(p=>p.id!==id);
      return prev.map(p=> p.id===id ? {...p, qty: Math.max(0, p.qty + delta)} : p).filter(p=>p.qty>0);
    })
  }

  function doCheckout(){
    setCheckoutOpen(true);
    setCartOpen(false);
    setEta(5 + Math.floor(Math.random()*15));
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Header query={query} setQuery={setQuery} openCart={()=>setCartOpen(true)} cartCount={cart.reduce((s,i)=>s+i.qty,0)} />
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-xl font-bold">Restaurants</h2>
        <div className="text-sm text-gray-500">Showing {filtered.length}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.map(r=>(
          <RestaurantCard key={r.id} r={r} onOpen={(res)=>setSelected(res)} />
        ))}
      </div>

      <Modal restaurant={selected} onClose={()=>setSelected(null)} addToCart={addToCart} />

      {cartOpen && <CartDrawer cart={cart} closeCart={()=>setCartOpen(false)} checkout={doCheckout} removeItem={removeItem} />}

      {checkoutOpen && <CheckoutModal restaurant={selected || cart[0] || mockRestaurants[0]} onClose={()=>{ setCheckoutOpen(false); setCart([]); }} eta={eta} />}
    </div>
  )
}