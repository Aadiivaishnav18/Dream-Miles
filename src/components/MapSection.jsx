const MapSection = () => {
  return (
    <section className="py-24 bg-[#f8f8f8]">

      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl font-[Playfair_Display] font-bold">
          Explore Our Destinations
        </h2>

        <p className="text-gray-500 mt-3 mb-10">
          Discover where your next adventure will take you
        </p>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps?q=20,0&z=2&output=embed"
            className="w-full h-[450px] border-0"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default MapSection;