import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, Users, TrendingUp, FileText, Workflow, Building, 
  DollarSign, MessageSquare, Calendar, Target, Receipt, 
  Building2, Megaphone, Package, ChevronLeft, ChevronRight,
  ShoppingCart, Hotel, Car, Store, Coffee, Utensils, Truck, Pill, Lock, Warehouse
} from "lucide-react";

const products = [
  {
    id: "banhang",
    title: "Quản lý bán hàng",
    headline: "Phần mềm quản lý bán hàng chuyên nghiệp",
    features: [
      "Quản lý đơn hàng, hóa đơn dễ dàng",
      "Báo cáo doanh thu, lợi nhuận chi tiết",
      "Tích hợp thanh toán đa kênh",
    ],
    apps: [
      { name: "Quản lý bán hàng", icon: ShoppingCart },
      { name: "Quản lý siêu thị", icon: Store },
      { name: "Quản lý tiệm tạp hóa", icon: Package },
    ],
    gradient: "from-blue-500 to-cyan-400",
    href: "http://sof.vn/vi/Phan-mem/23/Phan-mem-quan-ly-ban-hang.html",
  },
  {
    id: "fnb",
    title: "F&B - Nhà hàng & Cafe",
    headline: "Giải pháp quản lý quán cafe, nhà hàng hiện đại",
    features: [
      "Quản lý bàn, order, bếp/bar",
      "Tích hợp POS màn hình cảm ứng",
      "Quản lý kho nguyên liệu, công thức",
    ],
    apps: [
      { name: "Quản lý quán cafe", icon: Coffee },
      { name: "Quản lý nhà hàng", icon: Utensils },
    ],
    gradient: "from-emerald-500 to-teal-400",
    href: "http://sof.vn/vi/Phan-mem/75/Phan-mem-quan-ly-quan-cafe.html",
  },
  {
    id: "hotel",
    title: "Khách sạn & Spa",
    headline: "Phần mềm quản lý khách sạn, spa chuyên nghiệp",
    features: [
      "Quản lý đặt phòng, check-in/out",
      "Quản lý dịch vụ spa, lịch hẹn",
      "Báo cáo công suất, doanh thu",
    ],
    apps: [
      { name: "Quản lý khách sạn", icon: Hotel },
      { name: "Quản lý Spa", icon: Users },
    ],
    gradient: "from-violet-500 to-purple-400",
    href: "http://sof.vn/vi/Phan-mem/77/Phan-mem-quan-ly-khach-san.html",
  },
  {
    id: "logistics",
    title: "Vận tải & Kho bãi",
    headline: "Giải pháp quản lý vận tải, kho hàng thông minh",
    features: [
      "Quản lý đội xe, lộ trình",
      "Quản lý kho pallet chuyên nghiệp",
      "Quản lý bãi gửi xe thông minh",
    ],
    apps: [
      { name: "Quản lý vận tải", icon: Truck },
      { name: "Quản lý kho pallet", icon: Warehouse },
      { name: "Quản lý bãi gửi xe", icon: Car },
    ],
    gradient: "from-orange-500 to-amber-400",
    href: "http://sof.vn/vi/Phan-mem/78/Phan-mem-quan-ly-van-tai.html",
  },
  {
    id: "hrm",
    title: "Nhân sự & Tiền lương",
    headline: "Phần mềm nhân sự tiền lương tự động",
    features: [
      "Quản lý hồ sơ nhân viên",
      "Chấm công, tính lương tự động",
      "Quản lý phúc lợi, bảo hiểm",
    ],
    apps: [
      { name: "Nhân sự tiền lương", icon: Users },
      { name: "Chấm công", icon: Calendar },
    ],
    gradient: "from-pink-500 to-rose-400",
    href: "http://sof.vn/vi/Phan-mem/1/Phan-mem-nhan-su-tien-luong.html",
  },
  {
    id: "erp",
    title: "ERP Doanh nghiệp",
    headline: "Phần mềm quản trị nguồn lực doanh nghiệp",
    features: [
      "Tích hợp toàn diện các module",
      "Quản lý công ty dược chuyên ngành",
      "Báo cáo quản trị đa chiều",
    ],
    apps: [
      { name: "ERP SOF", icon: Building2 },
      { name: "Quản lý công ty dược", icon: Pill },
    ],
    gradient: "from-indigo-500 to-blue-400",
    href: "http://sof.vn/vi/Phan-mem/18/Phan-mem-quan-tri-nguon-luc-doanh-nghiep-(ERP--SOF).html",
  },
  {
    id: "security",
    title: "Bảo mật & Chữ ký số",
    headline: "Giải pháp bảo mật và chữ ký số",
    features: [
      "Phần mềm chat bảo mật",
      "Quản lý chữ ký số chuyên nghiệp",
      "Bảo mật thông tin doanh nghiệp",
    ],
    apps: [
      { name: "Chat bảo mật", icon: MessageSquare },
      { name: "Quản lý Chữ Ký Số", icon: Lock },
    ],
    gradient: "from-slate-600 to-gray-500",
    href: "http://sof.vn/vi/Phan-mem/377/Phan-mem-chat-bao-mat.html",
  },
];

export const ProductSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const product = products[currentIndex];

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="py-20 lg:py-32 relative bg-[#d2eaf7]">
      {/* Section header */}
      <div className="container mx-auto px-4 lg:px-8 mb-16">
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#0f426c]">
            Một nền tảng <span className="text-[#3087fe]">|</span>{" "}
            <span className="text-[#3087fe]">Mọi giải pháp</span>
          </h2>
        </div>
      </div>

      {/* Product Carousel */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6" data-aos="fade-right">
            <div className="inline-block">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${product.gradient} text-white`}>
                {product.title}
              </span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold leading-tight text-[#0f426c]">
              {product.headline}
            </h3>

            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-[#507588]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0f426c] mt-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* App icons carousel */}
            <div className="relative overflow-hidden py-4">
              <div className="flex gap-3 animate-slide-left">
                {[...product.apps, ...product.apps].map((app, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#a7d5ec]"
                  >
                    <app.icon className="w-4 h-4 text-[#0f426c]" />
                    <span className="text-sm text-[#507588] whitespace-nowrap">
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="heroOutline">Xem chi tiết</Button>
              <Button variant="hero">Demo tính năng</Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className={`absolute -inset-4 bg-gradient-to-r ${product.gradient} opacity-20 rounded-3xl blur-2xl`} />
            <div className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-[#a7d5ec]">
              {/* Mock dashboard */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${product.gradient} flex items-center justify-center`}>
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f426c]">{product.title}</div>
                    <div className="text-xs text-[#507588]">Dashboard Overview</div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Hoàn thành", value: "847", change: "+12%" },
                    { label: "Đang xử lý", value: "234", change: "+5%" },
                    { label: "Chờ duyệt", value: "56", change: "-8%" },
                    { label: "Tổng cộng", value: "1,137", change: "+18%" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#f4fbff] rounded-xl p-4 border border-[#a7d5ec]">
                      <div className="text-xs text-[#507588]">{stat.label}</div>
                      <div className="text-xl font-bold text-[#0f426c]">{stat.value}</div>
                      <div className={`text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3 pt-2">
                  {["Dự án A", "Dự án B", "Dự án C"].map((name, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#507588]">{name}</span>
                        <span className="text-[#0f426c]">{[85, 62, 94][i]}%</span>
                      </div>
                      <div className="h-2 bg-[#c3e8ff] rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${product.gradient} rounded-full transition-all duration-500`}
                          style={{ width: `${[85, 62, 94][i]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prevProduct}
            className="w-10 h-10 rounded-full bg-white border border-[#a7d5ec] flex items-center justify-center text-[#507588] hover:text-[#0f426c] hover:bg-[#f4fbff] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#0f426c]"
                    : "bg-[#8fc0db] hover:bg-[#0f426c]"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextProduct}
            className="w-10 h-10 rounded-full bg-white border border-[#a7d5ec] flex items-center justify-center text-[#507588] hover:text-[#0f426c] hover:bg-[#f4fbff] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
