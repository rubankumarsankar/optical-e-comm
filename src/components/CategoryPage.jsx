import { useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import products from "../data/products";

export default function CategoryPage() {
  const [filters, setFilters] = useState({
    frameType: [],
    brand: [],
    rating: [],
  });

  const filteredProducts = products.filter((p) => {
    const matchesFrame = filters.frameType.length ? filters.frameType.includes(p.frameType) : true;
    const matchesBrand = filters.brand.length ? filters.brand.includes(p.brand) : true;
    const matchesRating = filters.rating.length ? filters.rating.includes(String(p.rating)) : true;
    return matchesFrame && matchesBrand && matchesRating;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 py-20 bg-gray-50 min-h-screen">
      <aside className="w-full lg:w-1/4">
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </aside>
      <main className="w-full lg:w-3/4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Eyeglasses</h2>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
