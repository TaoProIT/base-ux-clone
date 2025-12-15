const logos = [
  { name: "VPBank", text: "VPBank" },
  { name: "ACB", text: "ACB" },
  { name: "Vietjet", text: "Vietjet" },
  { name: "Jollibee", text: "Jollibee" },
  { name: "ThaiHa Books", text: "ThaiHa" },
  { name: "Nagaco", text: "Nagaco" },
  { name: "247 Express", text: "247" },
  { name: "VTV Cab", text: "VTV" },
  { name: "Petro", text: "Petro" },
  { name: "ITViec", text: "ITViec" },
];

export const LogoCarousel = () => {
  return (
    <section className="py-12 lg:py-16 border-y border-[#a7d5ec] overflow-hidden bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="px-4 py-1.5 rounded-full border border-[#0f426c] bg-[#0f426c]/10">
            <span className="text-[#0f426c] font-semibold">10,000+</span>
          </div>
          <span className="text-[#507588]">
            doanh nghiệp đã chuyển mình cùng{" "}
            <span className="text-[#0f426c] font-medium">SOF</span>
          </span>
        </div>
      </div>

      {/* Infinite scroll logos */}
      <div className="relative">
        <div className="flex animate-slide-left">
          {/* First set */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-8 lg:px-12"
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#8fc0db] hover:text-[#0f426c] transition-colors duration-300">
                {logo.text}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
