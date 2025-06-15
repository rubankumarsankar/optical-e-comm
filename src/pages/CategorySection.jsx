import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Eyeglasses",
    description: "Find the perfect frames to match your style and vision needs.",
    image: "/assets/category/eyeglasses.jpg",
    link: "/category/eyeglasses",
  },
  {
    title: "Sunglasses",
    description: "Protect your eyes with our stylish designer sunglasses collection.",
    image: "/assets/category/sunglasses.jpg",
    link: "/category/sunglasses",
  },
  {
    title: "Contact Lenses",
    description: "Discover comfortable contact lenses for daily or extended wear.",
    image: "/assets/category/contact-lenses.jpg",
    link: "/category/lenses",
  },
];

export default function CategorySection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData(categories);
    }, 500);
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="text-sm text-primary uppercase tracking-wide font-medium">
            Browse our collection
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Shop By Category
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-secondary mb-4">{item.description}</p>
                <a
                  href={item.link}
                  className="text-primary font-medium hover:underline flex items-center gap-1"
                >
                  Explore <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
