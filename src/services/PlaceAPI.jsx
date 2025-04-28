import { useState } from 'react';

const OSMAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } else {
        setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    onSelect(place);
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a place"
        className="border rounded-[5px] p-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full z-10 max-h-60 overflow-auto">
          {suggestions.map((place) => (
            <li 
                key={place.place_id} className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(place)}
            >
              {place.display_name}
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OSMAutocomplete;
