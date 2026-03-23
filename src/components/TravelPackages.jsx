import { FiCheck } from "react-icons/fi";

const TravelPackages = () => {
  const packages = [
    {
      title: "Basic Package",
      price: "$499",
      duration: "3 Days / 2 Nights",
      features: [
        "Round-trip flights",
        "2-star accommodation",
        "Daily breakfast",
        "Airport transfers",
        "City tour",
      ],
    },
    {
      title: "Standard Package",
      price: "$899",
      duration: "5 Days / 4 Nights",
      popular: true,
      features: [
        "Round-trip flights",
        "4-star accommodation",
        "Breakfast & dinner",
        "Airport transfers",
        "Guided tours",
        "Travel insurance",
      ],
    },
    {
      title: "Luxury Package",
      price: "$1499",
      duration: "7 Days / 6 Nights",
      features: [
        "Business class flights",
        "5-star luxury resort",
        "All meals included",
        "Private chauffeur",
        "Exclusive experiences",
        "Spa treatments",
      ],
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-[#f8fafc] to-[#eef7f6]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-gray-900">
          Travel Packages
        </h2>
        <p className="text-gray-500 mt-4 mb-16 text-lg">
          Choose the perfect package for your dream vacation
        </p>

        <div className="grid md:grid-cols-3 gap-10">

          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                pkg.popular && "border-2 border-[#4db2a4] scale-105"
              }`}
            >

              {/* Popular Badge */}
              {pkg.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4db2a4] text-white px-5 py-1 rounded-full text-xs font-semibold shadow-md">
                  MOST POPULAR
                </span>
              )}

              <h3 className="text-2xl font-bold mt-2 text-gray-900">
                {pkg.title}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                {pkg.duration}
              </p>

              <p className="text-5xl font-extrabold text-[#4db2a4] mt-8">
                {pkg.price}
                <span className="text-sm text-gray-500"> /person</span>
              </p>

              <ul className="mt-8 space-y-4 text-gray-600 text-left">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="bg-[#e6f7f5] p-1.5 rounded-full">
                      <FiCheck className="text-[#4db2a4]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

           <button className="mt-10 w-full bg-[#4db2a4] text-white py-4 rounded-full font-bold text-base tracking-wide shadow-lg hover:bg-[#3d9185] transition-all duration-300">
  Book Now
</button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default TravelPackages;