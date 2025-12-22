const trustedCompanies = [
  { 
    name: "Dầu Khí Việt Nhật", 
    description: "Công Ty Dầu Khí Việt Nhật",
    logo: "https://tse3.mm.bing.net/th?id=OIP.p9XPw4piqJFBdCPTHi-mkAHaEP&pid=Api&P=0&h=180"
  },
  { 
    name: "Dầu Khí Đồng Tháp", 
    description: "Công Ty Dầu Khí Đồng Tháp",
    logo: "https://tse1.mm.bing.net/th?id=OIP.BLH6vldIscj_ZjLCVeVgVwAAAA&pid=Api&P=0&h=180"
  },
  { 
    name: "Biznet", 
    description: "Công Ty CP Giải Pháp Biznet",
    logo: "https://static.topcv.vn/company_logos/cong-ty-co-phan-giai-phap-cong-nghe-biznet-628f4eceb2572.jpg"
  },
  { 
    name: "Imperial Hotel", 
    description: "Khách sạn 5* Imperial - Vũng Tàu",
    logo: "https://pbs.twimg.com/profile_images/1203596005502902272/GnJDC4Mg_400x400.jpg"
  },
  { 
    name: "Bueno", 
    description: "Công ty Bueno - KCN Nhơn Trạch",
    logo: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/cong-ty-tnhh-ky-thuat-bueno-5e7d77dd06e4c.jpg"
  },
  { 
    name: "BECAMEX", 
    description: "BECAMEX Bình Dương",
    logo: "https://forbes.baovanhoa.vn/wp-content/uploads/2022/06/LogoTop50_Becamex.jpg"
  },
];

export const TrustedSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-24 relative bg-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-6 sm:mb-10" data-aos="fade-up">
          <p className="text-sm sm:text-base text-[#507588]">
            Được tin tưởng bởi những doanh nghiệp hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {trustedCompanies.map((company, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 30}
              className="group relative bg-[#f4fbff] border border-[#a7d5ec] rounded-lg sm:rounded-xl p-3 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Logo image */}
              <div className="text-center">
                <div className="w-full h-12 sm:h-20 mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="max-w-full max-h-12 sm:max-h-20 object-contain"
                  />
                </div>
                <div className="font-semibold text-[#0f426c] text-xs sm:text-sm">{company.name}</div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 sm:p-4">
                <div className="text-center">
                  <div className="font-semibold text-[#0f426c] mb-0.5 sm:mb-1 text-xs sm:text-sm">{company.name}</div>
                  <div className="text-[10px] sm:text-xs text-[#507588]">{company.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
