const trustedCompanies = [
  { name: "BIDGROUP", description: "Công ty Cổ Phần BIDGROUP" },
  { name: "VietCredit", description: "Công ty Tài Chính Cổ Phần Tín Việt" },
  { name: "AMECC", description: "Công ty Cổ phần Cơ khí Xây dựng AMECC" },
  { name: "Traphaco", description: "Công ty Cổ phần Traphaco" },
  { name: "VPBank", description: "Ngân hàng TMCP Việt Nam Thịnh Vượng" },
  { name: "ACB", description: "Ngân hàng TMCP Á Châu" },
];

export const TrustedSection = () => {
  return (
    <section className="py-16 lg:py-24 relative bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-[#507588]">
            Được tin tưởng bởi những doanh nghiệp hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustedCompanies.map((company, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 30}
              className="group relative bg-[#f4fbff] border border-[#a7d5ec] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Logo placeholder */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white border border-[#a7d5ec] flex items-center justify-center group-hover:bg-[#0f426c]/10 transition-colors">
                  <span className="text-2xl font-bold text-[#507588] group-hover:text-[#0f426c] transition-colors">
                    {company.name.charAt(0)}
                  </span>
                </div>
                <div className="font-semibold text-[#0f426c] text-sm">{company.name}</div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="font-semibold text-[#0f426c] mb-1">{company.name}</div>
                  <div className="text-xs text-[#507588]">{company.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
