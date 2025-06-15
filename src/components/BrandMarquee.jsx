import React from "react";

const brandLogos = [
  { name: "Ray-Ban", src: "/assets/brands/Ray-Ban_logo.png" },
  { name: "Prada", src: "/assets/brands/Prada.jpg" },
  { name: "Oakley", src: "/assets/brands/Oakley_logo.svg" },
  { name: "Gucci", src: "/assets/brands/Gucci-logo.avif" },
  { name: "Tom Ford", src: "/assets/brands/Tom-Ford-Logo.jpg" },
  { name: "Acuvue", src: "/assets/brands/Acuvue-logo.png" },
  { name: "Warby Parker", src: "/assets/brands/WarbyParker.png" },
];

const BrandMarquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <div className="animate-marquee inline-block">
        {brandLogos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.name}
            className="inline-block h-20 mx-6 grayscale hover:grayscale-0 transition-all duration-300"
          />
        ))}
        {/* Duplicate for seamless loop */}
        {brandLogos.map((logo, index) => (
          <img
            key={`dup-${index}`}
            src={logo.src}
            alt={logo.name}
            className="inline-block h-20 mx-6 grayscale hover:grayscale-0 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;
