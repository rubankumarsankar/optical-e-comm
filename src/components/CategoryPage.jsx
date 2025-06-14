import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import products from "../data/products";
import { motion } from "framer-motion";

const categoryMap = {
  eyeglasses: ["Round", "Cat Eye", "Rectangle", "Aviator", "Oval", "Square"],
  sunglasses: ["Sunglasses", "Sport", "Wayfarer", "Cat Eye", "Rectangle"],
  lenses: ["Lens"],
};

export default function CategoryPage() {
  const { slug } = useParams();
  const categoryKey = slug?.toLowerCase();
  const isAllCategory = !categoryKey || categoryKey === "category";

  const categoryFrameTypes = useMemo(() => {
    return isAllCategory ? null : categoryMap[categoryKey] || [];
  }, [categoryKey, isAllCategory]);

  const [filters, setFilters] = useState({
    frameType: [],
    brand: [],
    rating: [],
  });

  // 1. Filter by category frame type
  const categoryFilteredProducts = useMemo(() => {
    if (isAllCategory) return products;
    return products.filter((product) =>
      categoryFrameTypes.includes(product.frameType)
    );
  }, [categoryFrameTypes, isAllCategory]);

  // 2. Filter based on user-selected filters
  const finalFilteredProducts = useMemo(() => {
    return categoryFilteredProducts.filter((product) => {
      const matchFrame =
        filters.frameType.length === 0 ||
        filters.frameType.includes(product.frameType);
      const matchBrand =
        filters.brand.length === 0 || filters.brand.includes(product.brand);
      const matchRating =
        filters.rating.length === 0 ||
        filters.rating.includes(String(product.rating));
      return matchFrame && matchBrand && matchRating;
    });
  }, [filters, categoryFilteredProducts]);

  const categoryTitle = isAllCategory
    ? "All Products"
    : categoryKey?.charAt(0).toUpperCase() + categoryKey?.slice(1);

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 py-24 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4">
       
        <div className="mt-6">
          <h3 className="text-sm text-gray-600 font-semibold mb-2">Categories</h3>
          <div className="flex flex-col gap-2 text-blue-600 text-sm">
            <Link to="/category/eyeglasses">Eyeglasses</Link>
            <Link to="/category/sunglasses">Sunglasses</Link>
            <Link to="/category/lenses">Lenses</Link>
            <Link to="/category">All Products</Link>
          </div>
        </div>
         <FilterSidebar filters={filters} setFilters={setFilters} />
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4">
        <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-2xl font-bold text-gray-800">{categoryTitle}</h2>
          <p className="text-sm text-gray-600">
            Showing {finalFilteredProducts.length} of{" "}
            {categoryFilteredProducts.length} products
          </p>
        </div>

        {finalFilteredProducts.length === 0 ? (
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
            {finalFilteredProducts.map((product) => (
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
