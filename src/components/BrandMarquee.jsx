import React from "react";

const brandLogos = [
  { name: "Ray-Ban", src: "/assets/brands/rayban.png" },
  { name: "Prada", src: "/assets/brands/prada.png" },
  { name: "Oakley", src: "/assets/brands/oakley.png" },
  { name: "Gucci", src: "/assets/brands/gucci.png" },
  { name: "Tom Ford", src: "/assets/brands/tomford.png" },
  { name: "Acuvue", src: "/assets/brands/acuvue.png" },
  { name: "Warby Parker", src: "/assets/brands/warbyparker.png" },
];

const BrandMarquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4 bg-gray-50">
      <div className="animate-marquee inline-block">
        {brandLogos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.name}
            className="inline-block h-12 mx-6 grayscale hover:grayscale-0 transition-all duration-300"
          />
        ))}
        {/* Duplicate for seamless loop */}
        {brandLogos.map((logo, index) => (
          <img
            key={`dup-${index}`}
            src={logo.src}
            alt={logo.name}
            className="inline-block h-12 mx-6 grayscale hover:grayscale-0 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;
