import { motion } from "framer-motion";
import { FaShippingFast, FaHeadphones, FaShieldAlt, FaUndo } from "react-icons/fa";

const infoItems = [
  {
    icon: <FaShippingFast size={28} />,
    title: "Free Shipping",
    description: "On all orders over $99. International shipping available.",
  },
  {
    icon: <FaHeadphones size={28} />,
    title: "24/7 Support",
    description: "Our customer service team is here to help you anytime.",
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: "100% Authentic",
    description: "All our products are genuine with manufacturer warranty.",
  },
  {
    icon: <FaUndo size={28} />,
    title: "Easy Returns",
    description: "30-day money back guarantee on all purchases.",
  },
];

export default function InfoBar() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {infoItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-3">
              {item.icon}
            </div>
            <h4 className="font-semibold text-md">{item.title}</h4>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
