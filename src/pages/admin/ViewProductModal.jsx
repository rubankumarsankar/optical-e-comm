import React from "react";
import { motion } from "framer-motion";

export default function ViewProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow"
      >
        <h2 className="text-xl font-semibold mb-4 text-secondary">Product Details</h2>
        <div className="space-y-3">
          <img src={product.image} alt={product.title} className="w-32 h-32 object-cover rounded" />
          <p><strong>Title:</strong> {product.title}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
          <p><strong>Stock:</strong> {product.quantity}</p>
        </div>

        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-secondary/20 rounded hover:bg-secondary/50">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
