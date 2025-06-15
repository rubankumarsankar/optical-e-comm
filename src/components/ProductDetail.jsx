import { useParams, useNavigate, Link } from "react-router-dom";
import products from "../data/products";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { toast } from "react-toastify";

const tabs = ["Description", "Specifications", "Reviews"];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("Description");
  const navigate = useNavigate();

  useEffect(() => {
    const selected = products.find((p) => p.id === parseInt(id));
    setProduct(selected);
    if (selected) {
      setSelectedImage(selected.images?.[0] || selected.image);
    }
  }, [id]);

  if (!product)
    return (
      <div className="text-center py-20 text-secondary">Loading...</div>
    );

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("optic_cart") || "[]");
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      cart.push(product);
      localStorage.setItem("optic_cart", JSON.stringify(cart));
      toast.success("Added to cart!");
    } else {
      toast.info("Already in cart!");
    }
  };

  const buyNow = () => {
    const cart = JSON.parse(localStorage.getItem("optic_cart") || "[]");
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      cart.push(product);
      localStorage.setItem("optic_cart", JSON.stringify(cart));
    }
    navigate("/cart");
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("optic_wishlist") || "[]");
    const exists = wishlist.find((item) => item.id === product.id);
    if (!exists) {
      wishlist.push(product);
      localStorage.setItem("optic_wishlist", JSON.stringify(wishlist));
      toast.success("Added to wishlist!");
    } else {
      toast.info("Already in wishlist!");
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <div className="w-full border rounded-lg overflow-hidden relative">
            {product.discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {product.discount} OFF
              </span>
            )}
            {product.tag && (
              <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                {product.tag}
              </span>
            )}
            <img
              src={selectedImage}
              alt="Main"
              className="w-full h-[400px] object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {[product.image, ...(product.images || [])]
              .slice(0, 4)
              .map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 border rounded-md object-cover cursor-pointer hover:scale-105 transition ${
                    selectedImage === img ? "ring-2 ring-primary" : ""
                  }`}
                  alt={`Thumb ${i}`}
                />
              ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-sm text-primary font-medium">{product.brand}</p>
          <div className="text-yellow-500 font-medium">
            ⭐ {product.rating} reviews
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-secondary">
              ₹{product.price.toFixed(2)}
            </div>
            <p className="text-secondary line-through">
              ₹{product.originalPrice.toFixed(2)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button
              onClick={addToCart}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary"
            >
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-secondary"
            >
              Buy Now
            </button>
            <button
              onClick={addToWishlist}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ❤️ Wishlist
            </button>
          </div>

          <div className="mt-4 space-y-1 text-sm">
            <p className="text-green-600">
              In Stock ({product.quantity} available)
            </p>
            <p className="text-secondary">
              Free shipping & 2-year warranty included
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10">
        <div className="flex gap-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={classNames(
                "pb-2 text-sm font-medium",
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-secondary hover:text-primary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "Description" && (
            <p className="text-secondary text-sm leading-relaxed">
              {product.description}
            </p>
          )}

          {activeTab === "Specifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-secondary">
              <div>
                <h4 className="font-semibold mb-2">Frame Details</h4>
                <ul className="space-y-1">
                  <li>
                    <strong>Material:</strong> {product.specifications?.material}
                  </li>
                  <li>
                    <strong>Frame Shape:</strong> {product.frameType}
                  </li>
                  <li>
                    <strong>Lens Type:</strong> {product.specifications?.lensType}
                  </li>
                  <li>
                    <strong>Weight:</strong> {product.specifications?.weight}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Additional Information</h4>
                <ul className="space-y-1">
                  <li>
                    <strong>Warranty:</strong> {product.specifications?.warranty}
                  </li>
                  <li>
                    <strong>Color:</strong>{" "}
                    {product.specifications?.color || "Not specified"}
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-4">
              {product.reviews?.length ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-3">
                    <p className="font-medium text-secondary">{review.user}</p>
                    <p className="text-yellow-500">⭐ {review.rating}</p>
                    <p className="text-secondary text-sm">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-secondary text-sm">No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products
            .filter((p) => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map((suggestion) => (
              <Link
                to={`/product/${suggestion.id}`}
                key={suggestion.id}
                className="border rounded-md p-2 hover:shadow-lg transition block relative"
              >
                {suggestion.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {suggestion.discount} OFF
                  </span>
                )}
                {suggestion.tag && (
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    {suggestion.tag}
                  </span>
                )}
                <img
                  src={suggestion.image}
                  alt={suggestion.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-sm font-medium mt-2">{suggestion.title}</h3>
                <p className="text-primary text-sm">{suggestion.brand}</p>
                <p className="text-secondary font-semibold">
                  ₹{suggestion.price.toFixed(2)}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
