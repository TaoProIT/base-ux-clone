import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const BlogSection = () => {
  return (
    <section className="py-16 lg:py-24 relative bg-[#d2eaf7]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#0f426c]">
              Đọc thêm về SOF
            </h3>
            <p className="text-[#507588] leading-relaxed">
              Hiểu thêm về cách vận hành SOF vào doanh nghiệp của bạn. 
              Chúng tôi có rất nhiều use case và case study cho bạn tham khảo.
            </p>
            <Button variant="hero" className="group">
              Khám phá thêm
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#0f426c]/10 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-2xl p-6 grid grid-cols-2 gap-4 shadow-lg border border-[#a7d5ec]">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-[#f4fbff] rounded-xl p-4 hover:bg-[#c3e8ff] transition-colors cursor-pointer border border-[#a7d5ec]"
                >
                  <div className="w-full aspect-video bg-[#c3e8ff] rounded-lg mb-3" />
                  <div className="h-2 w-3/4 bg-[#8fc0db] rounded-full mb-2" />
                  <div className="h-2 w-1/2 bg-[#8fc0db] rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
