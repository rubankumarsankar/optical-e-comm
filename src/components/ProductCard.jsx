import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("optic_cart") || "[]");
    const updatedCart = [...cart, product];
    localStorage.setItem("optic_cart", JSON.stringify(updatedCart));
    toast.success("Added to cart!");
  };

  const buyNow = () => {
    const cart = JSON.parse(localStorage.getItem("optic_cart") || "[]");
    const updatedCart = [...cart, product];
    localStorage.setItem("optic_cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("optic_wishlist") || "[]");
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      toast.info("Already in wishlist!");
    } else {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem("optic_wishlist", JSON.stringify(updatedWishlist));
      toast.success("Added to wishlist!");
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow hover:scale-[1.02] transition-all duration-300 relative"
      whileHover={{ boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
    >
      {/* Discount badge */}
      {product.discount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          {product.discount} OFF
        </span>
      )}

      {/* Tag badge */}
      {product.tag && (
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
          {product.tag}
        </span>
      )}

      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="rounded-t-xl w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h2 className="font-semibold text-secondary truncate hover:underline">{product.title}</h2>
        </Link>
        <p className="text-sm text-secondary">{product.brand}</p>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</p>
          {product.originalPrice && product.originalPrice !== product.price && (
            <p className="text-sm line-through text-secondary">₹{product.originalPrice.toFixed(2)}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
          <motion.button
            onClick={addToCart}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1 text-sm px-3 py-1 bg-primary text-white rounded hover:bg-primary"
          >
            <FaShoppingCart />
            Add to Cart
          </motion.button>

          <motion.button
            onClick={buyNow}
            whileTap={{ scale: 0.9 }}
            className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Buy Now
          </motion.button>

          <motion.button
            onClick={addToWishlist}
            whileTap={{ scale: 0.9 }}
            className="text-red-500 hover:text-red-600 text-xl"
          >
            <FaHeart />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
