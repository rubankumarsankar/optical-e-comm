import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const products = [
  {
    brand: "Ray-Ban",
    name: "Round Metal Eyeglasses",
    image: "/assets/bestsellers/eyeglasses1.jpg",
    price: 149.99,
    originalPrice: 189.99,
  },
  {
    brand: "Prada",
    name: "Cat Eye Tortoise Frames",
    image: "/assets/bestsellers/eyeglasses2.jpg",
    price: 199.99,
  },
  {
    brand: "Ray-Ban",
    name: "Aviator Classic Sunglasses",
    image: "/assets/bestsellers/sunglasses1.jpg",
    price: 169.99,
    originalPrice: 199.99,
  },
  {
    brand: "Acuvue",
    name: "Oasys Monthly Lenses",
    image: "/assets/bestsellers/lenses.jpg",
    price: 59.99,
    originalPrice: 69.99,
  },
];

export default function BestsellersSection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setItems(products);
    }, 500);
  }, []);

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Bestsellers</h2>
          <p className="text-gray-600">Discover our most popular frames and lenses loved by customers worldwide</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4 flex flex-col gap-1">
                <p className="text-sm text-gray-500">{item.brand}</p>
                <h3 className="text-base font-semibold">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-blue-600 font-semibold">${item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="line-through text-sm text-gray-400">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <button className="ml-auto border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded p-2 transition-colors">
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="/bestsellers"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            View All Bestsellers
          </a>
        </div>
      </div>
    </section>
  );
}
