"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ông Lương Đăng Khoa",
    title: "Tổng giám đốc Boston Pharma",
    company: "Boston Pharma",
    stat: "180%",
    statLabel: "tốc độ xử lí quy trình",
    quote: "Trước khi sử dụng SOF Work+, chúng tôi có những quy trình được tính bằng năm... SOF không chỉ là một phần mềm mà còn là một nền tảng để nhân viên phát huy tối đa khả năng sáng tạo của mình.",
  },
  {
    id: 2,
    name: "Ông Lã Tuấn Cường",
    title: "Tổng giám đốc Intro Art",
    company: "Intro Art",
    stat: "70%",
    statLabel: "doanh thu tăng trưởng hằng năm",
    quote: "Trong 3 năm dùng SOF, Intro Art ghi nhận doanh thu tăng trưởng 60-70%/năm, hiệu suất của nhân viên tăng 3-4 lần, các chi phí in ấn giấy tờ duyệt nội bộ giảm đáng kể.",
  },
  {
    id: 3,
    name: "Ông Woranate Laprabang",
    title: "Tổng giám đốc Vietjet Air Thái Lan",
    company: "Vietjet Air",
    stat: "100+",
    statLabel: "quy trình vận hành được số hóa",
    quote: "Hệ thống SOF đã giúp chúng tôi đưa tất cả các quy trình nội bộ lên trực tuyến trên một nền tảng số, từ đó cải thiện đáng kể tốc độ và hiệu quả của các quy trình nội bộ.",
  },
  {
    id: 4,
    name: "Ông Nguyễn Mạnh Hải",
    title: "Giám đốc Tài chính 247 Express",
    company: "247 Express",
    stat: "200+",
    statLabel: "bưu cục được số hóa & kết nối",
    quote: "Khi tất cả thông tin đưa lên hệ thống, công việc được thực hiện trên SOF Workflow rất trơn tru với tiến độ được nắm rõ. Tôi có thể dựa vào đó để đưa ra quyết định hoặc can thiệp kịp thời.",
  },
  {
    id: 5,
    name: "Ông Nguyễn Thiện Vũ",
    title: "Tổng giám đốc Nệm Thuần Việt",
    company: "Nệm Thuần Việt",
    stat: "x3",
    statLabel: "tốc độ xử lý thanh toán",
    quote: "Với SOF, mỗi nhân sự đều có thể tự quản lý hiệu suất làm việc, phối hợp nhịp nhàng với đồng đội để đạt được mục tiêu chung.",
  },
];

const partnerCompanies = [
  { name: "Sợi Thế Kỷ", logo: "https://up.yimg.com/ib/th?id=OIP.g5NZdNu-aFraIQhmlDg6fgAAAA&pid=Api&rs=1&c=1&qlt=95&w=191&h=121" },
  { name: "Nghi Phong", logo: "https://pic.trangvangvietnam.com/114586/logo-van-tai-nghi-long.gif" },
  { name: "Minh Phương", logo: "https://erp.minhphuong.biz/images/logo/logo.png" },
  { name: "Thịnh Thành Đạt", logo: "https://studentjob.vn/resize/280/0/store/2018/12/thinh-thanh-dat-coltd-cong-ty-tnhh-bao-bi-thinh-thanh-dat.jpg" },
  { name: "Phân Bón Bình Điền", logo: "https://cdn.haitrieu.com/wp-content/uploads/2023/10/Logo-Binh-Dien-635x635.png" },
  { name: "Dược Phẩm Hasan", logo: "https://static.topcv.vn/company_logos/cong-ty-duoc-pham-hasan-603db90ac4dbc.jpg" },
  { name: "Brotex Việt Nam", logo: "https://dxwd4tssreb4w.cloudfront.net/image/db2944f727fe7c17c135966d3cb2750a" },
  { name: "Wantai", logo: "https://wtrubber.com.vn/wp-content/uploads/2022/02/logo1.jpg" },
  { name: "Gold Will", logo: "https://goldwellvn.com/upload/photo/logo_08593302102019.png" },
  { name: "Đông Sapa", logo: "https://dongsapa.com.vn/wp-content/uploads/2022/10/Logo-DSP-new-1.png.webp" },
  { name: "Nhật Tiến Thanh", logo: "https://nhattienthanh.com/wp-content/uploads/2024/07/logo-ntt-2024-290x85-1.png" },
  { name: "Vạn An Phát", logo: "data:image/png;base64,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" },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 sm:py-16 lg:py-32 relative overflow-hidden bg-[#d2eaf7]">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f426c] px-3">
            <span className="text-[#3087fe]">Rất nhiều</span> doanh nghiệp Việt{" "}
            <br className="hidden sm:block" />
            đã chuyển mình cùng SOF
          </h2>
        </div>

        {/* Partner Companies Logos */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up" data-aos-delay="50">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 max-w-5xl mx-auto">
            {partnerCompanies.map((company, index) => (
              <div
                key={index}
                className="bg-white rounded-md sm:rounded-lg p-2 sm:p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300 border border-[#a7d5ec]"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-10 sm:max-h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative shadow-lg border border-[#a7d5ec]">
            <Quote className="absolute top-4 sm:top-6 left-4 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 text-[#0f426c]/10" />
            
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-center">
              {/* Avatar & Info */}
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto lg:mx-0 rounded-xl sm:rounded-2xl bg-[#0f426c] flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    {currentTestimonial.name.charAt(4)}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-semibold text-[#0f426c]">{currentTestimonial.name}</div>
                <div className="text-xs sm:text-sm text-[#507588]">{currentTestimonial.title}</div>
                <div className="mt-2 sm:mt-3 px-2.5 sm:px-3 py-1 inline-block rounded-full bg-[#f4fbff] border border-[#a7d5ec] text-[10px] sm:text-xs text-[#507588]">
                  {currentTestimonial.company}
                </div>
              </div>

              {/* Quote & Stat */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Stat */}
                <div className="flex items-baseline gap-1.5 sm:gap-2 justify-center lg:justify-start">
                  <span className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#3087fe]">
                    {currentTestimonial.stat}
                  </span>
                  <span className="text-sm sm:text-base text-[#507588]">{currentTestimonial.statLabel}</span>
                </div>

                {/* Quote */}
                <blockquote className="text-sm sm:text-base lg:text-lg text-[#507588] leading-relaxed italic text-center lg:text-left">
                  "{currentTestimonial.quote}"
                </blockquote>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#a7d5ec]">
              <div className="flex gap-1.5 sm:gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-6 sm:w-8 bg-[#0f426c]"
                        : "bg-[#8fc0db] hover:bg-[#0f426c]"
                    }`}
                    aria-label={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f4fbff] border border-[#a7d5ec] flex items-center justify-center text-[#507588] hover:text-[#0f426c] hover:bg-[#c3e8ff] transition-colors"
                  aria-label="Testimonial trước"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f4fbff] border border-[#a7d5ec] flex items-center justify-center text-[#507588] hover:text-[#0f426c] hover:bg-[#c3e8ff] transition-colors"
                  aria-label="Testimonial tiếp theo"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
