import { useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import products from "../data/products";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const [filters, setFilters] = useState({
    frameType: [],
    brand: [],
    rating: [],
  });

  const filteredProducts = products.filter((p) => {
    const matchesFrame = filters.frameType.length
      ? filters.frameType.includes(p.frameType)
      : true;
    const matchesBrand = filters.brand.length
      ? filters.brand.includes(p.brand)
      : true;
    const matchesRating = filters.rating.length
      ? filters.rating.includes(String(p.rating))
      : true;
    return matchesFrame && matchesBrand && matchesRating;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 py-24 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4">
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4">
        <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-2xl font-bold text-gray-800">Eyeglasses</h2>
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center mt-20 text-gray-500 text-lg">
            😢 No products match your filters.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
