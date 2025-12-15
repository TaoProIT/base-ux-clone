import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/constants/companyInfo";
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Shield,
  Zap,
  Heart
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbff] to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f426c] mb-3 sm:mb-4">
              Về Chúng Tôi
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-3">
              {companyInfo.name} - Đối tác tin cậy trong chuyển đổi số doanh nghiệp Việt Nam
            </p>
          </div>

          {/* Company Overview */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl mb-8 sm:mb-12 lg:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                  Thành lập năm {companyInfo.foundedYear}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0f426c] mb-3 sm:mb-4">
                  12+ Năm Kinh Nghiệm Phát Triển Phần Mềm
                </h2>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  SOF.VN là một trong những công ty hàng đầu tại Việt Nam trong lĩnh vực 
                  cung cấp giải pháp phần mềm quản lý doanh nghiệp. Chúng tôi tự hào đã 
                  đồng hành cùng hơn 300 doanh nghiệp trong hành trình chuyển đổi số và 
                  tối ưu hóa quy trình kinh doanh.
                </p>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span className="text-sm sm:text-base text-gray-700">300+ Khách hàng</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span className="text-sm sm:text-base text-gray-700">100+ Dự án</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span className="text-sm sm:text-base text-gray-700">12+ Năm kinh nghiệm</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">300+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Khách hàng tin dùng</div>
                </div>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-1 sm:mb-2">100+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Dự án thành công</div>
                </div>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">98%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Khách hàng hài lòng</div>
                </div>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-600">Hỗ trợ khách hàng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0f426c] mb-3 sm:mb-4">Sứ Mệnh</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Cung cấp các giải pháp phần mềm quản lý tối ưu, giúp doanh nghiệp Việt Nam 
                nâng cao năng suất, giảm chi phí vận hành và tăng trưởng bền vững trong 
                kỷ nguyên số. Chúng tôi cam kết đem đến những sản phẩm chất lượng cao 
                với chi phí hợp lý nhất.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0f426c] mb-3 sm:mb-4">Tầm Nhìn</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Trở thành đối tác tin cậy hàng đầu trong lĩnh vực cung cấp giải pháp 
                phần mềm quản lý doanh nghiệp tại Việt Nam. Góp phần thúc đẩy chuyển đổi 
                số, hiện đại hóa quy trình quản lý và nâng cao năng lực cạnh tranh cho 
                các doanh nghiệp Việt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f426c] mb-2 sm:mb-4">Giá Trị Cốt Lõi</h2>
            <p className="text-sm sm:text-base text-gray-600">Những giá trị mà chúng tôi luôn hướng đến</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#0f426c] mb-1.5 sm:mb-2">Uy Tín</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Xây dựng niềm tin bằng chất lượng sản phẩm và dịch vụ
              </p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#0f426c] mb-1.5 sm:mb-2">Đổi Mới</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Không ngừng cải tiến và ứng dụng công nghệ mới
              </p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#0f426c] mb-1.5 sm:mb-2">Hiệu Quả</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Tập trung vào kết quả và giá trị cho khách hàng
              </p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#0f426c] mb-1.5 sm:mb-2">Tận Tâm</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Đồng hành và hỗ trợ khách hàng trong mọi tình huống
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f426c] mb-2 sm:mb-4">Thông Tin Liên Hệ</h2>
            <p className="text-sm sm:text-base text-gray-600">Hãy kết nối với chúng tôi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-[#0f426c] mb-4 sm:mb-6">Liên hệ với chúng tôi</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Tôi chỉ</div>
                    <div className="text-sm sm:text-base text-gray-700">{companyInfo.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Hotline</div>
                    <div className="text-sm sm:text-base text-gray-700">
                      {companyInfo.hotline.map((phone, index) => (
                        <div key={index}>
                          <a href={`tel:${phone}`} className="hover:text-blue-600">{phone}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Email</div>
                    <div className="text-sm sm:text-base text-gray-700">
                      <a href={`mailto:${companyInfo.email}`} className="hover:text-blue-600">{companyInfo.email}</a>
                      <br />
                      <a href={`mailto:${companyInfo.supportEmail}`} className="hover:text-blue-600">{companyInfo.supportEmail}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-[#0f426c] mb-4 sm:mb-6">Thông tin doanh nghiệp</h3>
              <div className="space-y-3 sm:space-y-3 sm:space-y-4">
                <div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Tên công ty</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900">{companyInfo.name}</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Tên quốc tế</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900">{companyInfo.nameEn}</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Mã số thuế</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900">{companyInfo.taxCode}</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Website</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900">
                    <a href={`https://${companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {companyInfo.website}
                    </a>
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Năm thành lập</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900">{companyInfo.foundedYear}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 bg-gradient-to-r from-[#3087fe] to-[#0f426c]">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Bắt Đầu Hành Trình Chuyển Đổi Số</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 text-blue-100 px-3">
            Để SOF đồng hành cùng doanh nghiệp của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-3">
            <Button variant="hero" size="lg" className="bg-white text-[#3087fe] hover:bg-gray-100 text-sm sm:text-base w-full sm:w-auto">
              Đăng ký tư vấn miễn phí
            </Button>
            <Button variant="outline" size="lg" className="border-white text-black hover:bg-white/10 text-sm sm:text-base w-full sm:w-auto">
              Tải brochure
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
