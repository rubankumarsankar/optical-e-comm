import { FaTruck, FaPercent, FaVrCardboard } from 'react-icons/fa';

export default function PromoBanner() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <div className="whitespace-nowrap flex gap-12 animate-marquee text-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <FaTruck /> Free Express Shipping on Orders Over $99
        </div>
        <div className="flex items-center gap-2">
          <FaPercent /> 20% Off First Purchase
        </div>
        <div className="flex items-center gap-2">
          <FaVrCardboard /> Virtual Try-On Available
        </div>
        {/* Repeat for continuous loop look */}
        <div className="flex items-center gap-2">
          <FaTruck /> Free Express Shipping on Orders Over $99
        </div>
        <div className="flex items-center gap-2">
          <FaPercent /> 20% Off First Purchase
        </div>
        <div className="flex items-center gap-2">
          <FaVrCardboard /> Virtual Try-On Available
        </div>
      </div>
    </div>
  );
}
