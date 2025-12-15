import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, ShoppingCart, Store, Package, Coffee, Utensils, Hotel, Users, Truck, Warehouse, Car, Building2, Pill, Factory, UtensilsCrossed, Newspaper, BookOpen, FileText } from "lucide-react";
import sofLogo from "@/assets/logo/logo.png";
import { ProductDropdown } from "./ProductDropdown";
import { SolutionsDropdown } from "./SolutionsDropdown";
import { IndustriesDropdown } from "./IndustriesDropdown";
import { NewsDropdown } from "./NewsDropdown";

const navItems = [
  { label: "Sản phẩm", hasDropdown: true, id: "product" },
  { label: "Giải pháp & Giá", hasDropdown: true, id: "solutions" },
  { label: "Lĩnh vực", hasDropdown: true, id: "industries" },
  { label: "Tin tức", hasDropdown: true, id: "news" },
  { label: "Về chúng tôi", hasDropdown: false, id: "about", path: "/about" },
];

// Mobile dropdown items
const mobileProductItems = [
  { name: "Bán hàng", icon: ShoppingCart, href: "http://sof.vn/vi/Phan-mem/23/Phan-mem-quan-ly-ban-hang.html" },
  { name: "Siêu thị", icon: Store, href: "http://sof.vn/vi/Phan-mem/79/Phan-mem-quan-ly-sieu-thi-.html" },
  { name: "Tạp hóa", icon: Package, href: "http://sof.vn/vi/Phan-mem/82/Phan-mem-quan-ly-tiem-tap-hoa.html" },
  { name: "Quán Cafe", icon: Coffee, href: "http://sof.vn/vi/Phan-mem/75/Phan-mem-quan-ly-quan-cafe.html" },
  { name: "Nhà hàng", icon: Utensils, href: "http://sof.vn/vi/Phan-mem/76/Phan-mem-quan-ly-nha-hang.html" },
  { name: "Khách sạn", icon: Hotel, href: "http://sof.vn/vi/Phan-mem/77/Phan-mem-quan-ly-khach-san.html" },
  { name: "Spa", icon: Users, href: "http://sof.vn/vi/Phan-mem/83/Phan-mem-quan-ly-Spa.html" },
  { name: "Vận tải", icon: Truck, href: "http://sof.vn/vi/Phan-mem/78/Phan-mem-quan-ly-van-tai.html" },
  { name: "Kho Pallet", icon: Warehouse, href: "http://sof.vn/vi/Phan-mem/374/Phan-men-quan-ly-kho-pallet.html" },
  { name: "Bãi gửi xe", icon: Car, href: "http://sof.vn/vi/Phan-mem/371/Phan-mem-quan-ly-bai-gui-xe.html" },
  { name: "Nhân sự HRM", icon: Users, href: "http://sof.vn/vi/Phan-mem/1/Phan-mem-nhan-su-tien-luong.html" },
  { name: "ERP", icon: Building2, href: "http://sof.vn/vi/Phan-mem/18/Phan-mem-quan-tri-nguon-luc-doanh-nghiep-(ERP--SOF).html" },
  { name: "Dược phẩm", icon: Pill, href: "http://sof.vn/vi/Phan-mem/81/Phan-mem-quan-ly-cong-ty-duoc-.html" },
];

const mobileSolutionsItems = [
  { name: "Startup & SME", icon: Building2, href: "#" },
  { name: "Doanh nghiệp vừa", icon: Factory, href: "#" },
  { name: "Doanh nghiệp lớn", icon: Building2, href: "#" },
  { name: "Bảng giá chi tiết", icon: FileText, href: "#" },
];

const mobileIndustriesItems = [
  { name: "Sản xuất", icon: Factory, href: "#" },
  { name: "F&B & Bán lẻ", icon: UtensilsCrossed, href: "#" },
  { name: "Dược phẩm", icon: Pill, href: "#" },
  { name: "Vận tải", icon: Truck, href: "#" },
];

const mobileNewsItems = [
  { name: "Tin tức công ty", icon: Newspaper, href: "#" },
  { name: "Blog", icon: BookOpen, href: "#" },
  { name: "Tuyển dụng", icon: Users, href: "#" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const getMobileDropdownItems = (id: string) => {
    switch (id) {
      case "product": return mobileProductItems;
      case "solutions": return mobileSolutionsItems;
      case "industries": return mobileIndustriesItems;
      case "news": return mobileNewsItems;
      default: return [];
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
    setMobileActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setMobileActiveDropdown(null);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f4fbff] backdrop-blur-xl border-b-[3px] border-[#8fc0db] shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Trang chủ SOF.VN" onClick={handleMobileMenuClose}>
            <img
              src={sofLogo}
              alt="Logo SOF.VN"
              className="h-10 w-auto rounded-md object-contain"
              loading="eager"
            />
            <span className="text-[#0f426c] font-bold text-xl">SOF.VN</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <Button
                  key={item.label}
                  variant="nav"
                  className="flex items-center gap-1 px-3 text-[#0f426c] hover:text-[#3087fe] font-medium"
                  onClick={() => {
                    setActiveDropdown(activeDropdown === item.id ? null : item.id);
                  }}
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                </Button>
              ) : (
                <Link key={item.label} to={item.path || "/"}>
                  <Button
                    variant="nav"
                    className="flex items-center gap-1 px-3 text-[#0f426c] hover:text-[#3087fe] font-medium"
                  >
                    {item.label}
                  </Button>
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" className="text-[#507588] hover:text-[#0f426c]">
              Đăng nhập
            </Button>
            <Button variant="hero" size="default">
              Đăng ký Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-11 h-11 text-[#0f426c] hover:bg-[#c3e8ff] rounded-lg"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Dropdowns - Desktop only */}
      <div className="hidden lg:block">
        <ProductDropdown
          isOpen={activeDropdown === "product"}
          onClose={() => setActiveDropdown(null)}
        />
        <SolutionsDropdown
          isOpen={activeDropdown === "solutions"}
          onClose={() => setActiveDropdown(null)}
        />
        <IndustriesDropdown
          isOpen={activeDropdown === "industries"}
          onClose={() => setActiveDropdown(null)}
        />
        <NewsDropdown
          isOpen={activeDropdown === "news"}
          onClose={() => setActiveDropdown(null)}
        />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white z-50 overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.hasDropdown ? (
                  <>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between py-3 px-4 text-base text-[#0f426c] hover:bg-[#c3e8ff] rounded-lg"
                      onClick={() => {
                        setMobileActiveDropdown(mobileActiveDropdown === item.id ? null : item.id);
                      }}
                    >
                      <span className="font-medium">{item.label}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileActiveDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mobile Dropdown Content */}
                    {mobileActiveDropdown === item.id && (
                      <div className="mt-1 ml-2 pl-4 border-l-2 border-[#c3e8ff] space-y-1">
                        {getMobileDropdownItems(item.id).map((subItem, index) => (
                          <a
                            key={index}
                            href={subItem.href}
                            className="flex items-center gap-3 py-3 px-3 text-sm text-[#507588] hover:text-[#0f426c] hover:bg-[#f4fbff] rounded-lg"
                            onClick={handleMobileMenuClose}
                          >
                            <subItem.icon className="w-4 h-4 flex-shrink-0" />
                            <span>{subItem.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path || "/"}
                    className="w-full flex items-center py-3 px-4 text-base font-medium text-[#0f426c] hover:bg-[#c3e8ff] rounded-lg"
                    onClick={handleMobileMenuClose}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="pt-4 mt-4 border-t border-[#c3e8ff] space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-center py-3 text-base text-[#507588] hover:text-[#0f426c]"
              >
                Đăng nhập
              </Button>
              <Button
                variant="hero"
                className="w-full justify-center py-3 text-base"
              >
                Đăng ký Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
