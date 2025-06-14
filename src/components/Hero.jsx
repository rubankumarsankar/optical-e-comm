import HeroBg from '/assets/hero-bg.jpg';

export default function Hero() {
  return (
    <section
      className="relative h-[90vh] bg-cover bg-center text-white flex items-center justify-start px-8 md:px-24"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="relative bg-hero-glasses bg-cover bg-center h-[90vh] flex items-center px-6 md:px-20 animate-fadeIn">
        <div className="text-white max-w-2xl">
          <p className="text-sm text-primary font-semibold">
            PREMIUM EYEWEAR COLLECTION
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-2">
            Discover Your <br /> Signature Style
          </h1>
          <p className="text-lg mt-4 text-gray-100">
            Elevate your vision with our curated selection of designer frames
            and precision optics
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Explore Collection
            </button>
            <button className="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-dark transition">
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
