const stats = [
  { value: "Uy tín", label: "Doanh nghiệp tin dùng" },
  { value: "Chuyên nghiệp", label: "Đội ngũ phát triển" },
  { value: "Ổn định", label: "Hệ thống vận hành" },
  { value: "Tận tâm", label: "Hỗ trợ khách hàng" },
];

export const StatsSection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-[#0f426c]">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-12" data-aos="fade-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="text-center space-y-2"
              >
                <div className="text-3xl lg:text-5xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
