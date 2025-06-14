import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("optic_wishlist") || "[]");
    setWishlist(data);
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item.id)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                <p className="text-blue-600 font-bold mt-2">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
