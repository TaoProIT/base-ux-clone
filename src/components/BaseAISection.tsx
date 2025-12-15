import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle, User } from "lucide-react";

const aiQuestions = [
  "Có đề xuất nào đang cần phê duyệt không?",
  "Tóm tắt công việc của team tôi trong tuần này",
  "Tình hình tài chính của công ty có đang đi theo kế hoạch không?",
  "Hôm nay tôi có những cuộc họp nào quan trọng?",
  "Phân tích tình hình dự án kinh doanh sản phẩm mới",
];

export const BaseAISection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-[#f4fbff]">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#0f426c]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#0f426c]">
            Thông tin tức thời, quyết định chính xác
          </h2>
          <Button variant="hero" className="mt-4">
            <Sparkles className="w-4 h-4 mr-2" />
            SOF AI Coming Soon
          </Button>
        </div>

        {/* AI Chat Interface */}
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-[#a7d5ec]">
            {/* Chat Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#a7d5ec]">
              <div className="w-10 h-10 rounded-full bg-[#0f426c] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-[#0f426c]">Hey SOF AI</div>
                <div className="text-xs text-[#507588]">Trợ lý AI thông minh</div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-3">
              {aiQuestions.map((question, index) => (
                <div
                  key={index}
                  data-aos="fade-left"
                  data-aos-delay={index * 40}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#f4fbff] hover:bg-[#c3e8ff] transition-colors cursor-pointer group border border-[#a7d5ec]"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-[#507588]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#0f426c] group-hover:text-[#3087fe] transition-colors">
                      {question}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#0f426c]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MessageCircle className="w-4 h-4 text-[#0f426c]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="mt-6 pt-4 border-t border-[#a7d5ec]">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f4fbff] border border-[#a7d5ec]">
                <Sparkles className="w-5 h-5 text-[#0f426c]" />
                <input
                  type="text"
                  placeholder="Hỏi SOF AI bất cứ điều gì..."
                  className="flex-1 bg-transparent text-[#0f426c] placeholder:text-[#507588] outline-none"
                />
                <Button variant="hero" size="sm">
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
