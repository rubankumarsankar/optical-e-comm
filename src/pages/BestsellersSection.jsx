import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import products from "@/data/products"; // Adjust path

export default function BestsellersSection() {
  const [items, setItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("optic_wishlist") || "[]");
    const bestsellerItems = products.filter((product) => product.tag === "Best Seller");

    setWishlistIds(wishlist.map((item) => item.id));
    setTimeout(() => {
      setItems(bestsellerItems);
    }, 500);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("optic_cart") || "[]");
    const updatedCart = [...cart, product];
    localStorage.setItem("optic_cart", JSON.stringify(updatedCart));
    toast.success("Added to cart!");
  };

  const addToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem("optic_wishlist") || "[]");
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      toast.info("Already in wishlist!");
    } else {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem("optic_wishlist", JSON.stringify(updatedWishlist));
      setWishlistIds((prev) => [...prev, product.id]);
      toast.success("Added to wishlist!");
    }
  };

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Bestsellers</h2>
          <p className="text-secondary">
            Discover our most popular frames and lenses loved by customers worldwide
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover transform transition-transform duration-300 hover:scale-110"
                />
                {/* Wishlist Icon */}
                <button
                  onClick={() => addToWishlist(item)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 transition"
                >
                  {wishlistIds.includes(item.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <p className="text-sm text-secondary">{item.brand}</p>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary font-semibold">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  {item.originalPrice && (
                    <span className="line-through text-sm text-secondary">
                      ₹{item.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white rounded px-3 py-1 transition-colors"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="/category"
            className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary transition"
          >
            View All Bestsellers
          </a>
        </div>
      </div>
    </section>
  );
}
