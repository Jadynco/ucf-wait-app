export default function Header({ query, setQuery, openCart, cartCount }) {
  return (
    <header className="flex flex-col md:flex-row items-center gap-2 md:gap-4 py-4 px-2 md:px-4">
 
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="w-11 h-11 rounded-md bg-ucf-gold flex items-center justify-center font-bold text-ucf-black">
          UCF
        </div>
        <div className="text-lg font-bold whitespace-nowrap">UCF Dining Wait Times</div>
      </div>

      <div className="w-full md:w-auto mt-2 md:mt-0 flex gap-2 md:gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md shadow-sm w-full md:w-72"
          placeholder="Search restaurants, cuisine, location..."
        />
      </div>
    </header>
  );
}
