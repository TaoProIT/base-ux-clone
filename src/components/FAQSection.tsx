import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Tôi có thể dùng SOF mà không cần trả phí không?",
    answer: "SOF cung cấp gói dùng thử miễn phí 14 ngày để bạn trải nghiệm đầy đủ các tính năng. Sau thời gian dùng thử, bạn có thể chọn gói phù hợp với nhu cầu của doanh nghiệp.",
  },
  {
    question: "SOF có hỗ trợ tích hợp với các hệ thống ERP không?",
    answer: "Có, SOF có khả năng tích hợp với hơn 200 ứng dụng phổ biến bao gồm các hệ thống ERP như SAP, Oracle, và nhiều phần mềm khác thông qua API.",
  },
  {
    question: "Dữ liệu của doanh nghiệp được bảo mật như thế nào?",
    answer: "SOF được chứng nhận ISO 27001 về bảo mật thông tin. Tất cả dữ liệu được mã hóa và lưu trữ trên các máy chủ đạt tiêu chuẩn quốc tế.",
  },
  {
    question: "Thời gian triển khai SOF mất bao lâu?",
    answer: "Thời gian triển khai phụ thuộc vào quy mô và độ phức tạp của doanh nghiệp. Thông thường, việc triển khai cơ bản mất từ 2-4 tuần, còn triển khai toàn diện có thể từ 1-3 tháng.",
  },
  {
    question: "SOF có hỗ trợ đào tạo nhân viên sử dụng không?",
    answer: "Có, SOF cung cấp dịch vụ đào tạo toàn diện cho nhân viên bao gồm đào tạo trực tiếp, video hướng dẫn, tài liệu và hỗ trợ 24/7.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 lg:py-32 relative bg-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#0f426c]">
              Hỏi đáp cùng <span className="text-[#3087fe]">SOF</span>
            </h2>
            <p className="text-sm sm:text-base text-[#507588] px-3">
              Chúng tôi đã tổng hợp những câu hỏi thường gặp nhất từ khách hàng.{" "}
              <a href="#" className="text-[#0f426c] hover:underline font-medium">
                Liên hệ ngay
              </a>{" "}
              nếu vẫn còn câu hỏi.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 40}
                className="bg-[#f4fbff] rounded-lg sm:rounded-xl overflow-hidden border border-[#a7d5ec]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-3 sm:p-5 text-left hover:bg-[#c3e8ff]/50 transition-colors"
                >
                  <span className="font-medium text-[#0f426c] pr-3 sm:pr-4 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#507588] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-3 pb-3 sm:px-5 sm:pb-5">
                    <p className="text-[#507588] leading-relaxed text-xs sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
