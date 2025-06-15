export default function FilterSidebar({ filters, setFilters }) {
  const handleChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-8">
      <div>
        <h4 className="font-semibold text-secondary mb-3">Frame Type</h4>
        {["Round", "Cat Eye", "Rectangle", "Aviator", "Oval", "Square"].map((type) => (
          <label key={type} className="block text-sm text-secondary mb-2">
            <input
              type="checkbox"
              checked={filters.frameType.includes(type)}
              onChange={() => handleChange("frameType", type)}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>

      <div>
        <h4 className="font-semibold text-secondary mb-3">Brands</h4>
        {["Ray-Ban", "Prada", "Oakley", "Tom Ford", "Gucci", "Warby Parker"].map((brand) => (
          <label key={brand} className="block text-sm text-secondary mb-2">
            <input
              type="checkbox"
              checked={filters.brand.includes(brand)}
              onChange={() => handleChange("brand", brand)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      <div>
        <h4 className="font-semibold text-secondary mb-3">Rating</h4>
        {[5, 4, 3, 2, 1].map((rate) => (
          <label key={rate} className="block text-sm text-secondary mb-2">
            <input
              type="checkbox"
              checked={filters.rating.includes(String(rate))}
              onChange={() => handleChange("rating", String(rate))}
              className="mr-2"
            />
            {rate} ★ & up
          </label>
        ))}
      </div>
    </div>
  );
}
