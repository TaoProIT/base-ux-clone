import type { Metadata } from "next";
import Link from "next/link";
import { ProductsGrid } from "@/components/ProductsGrid";
import { FloatingButtons } from "@/components/FloatingButtons";

export const metadata: Metadata = {
    title: "Tất Cả Sản Phẩm - SOF Software Solutions",
    description: "Khám phá các giải pháp phần mềm chuyên nghiệp của SOF: Quản lý cafe, nhà hàng, khách sạn, kho hàng, vận tải và nhiều hơn nữa.",
    keywords: ["phần mềm quản lý", "SOF", "ERP", "POS", "phần mềm bán hàng"],
};

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-[#0f426c] to-[#197dd3]">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center">
                        <span className="inline-block text-[#77d4fb] text-sm font-semibold uppercase tracking-wider mb-4">
                            Danh Mục Sản Phẩm
                        </span>
                        <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                            Giải Pháp Phần Mềm Toàn Diện
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Khám phá các sản phẩm phần mềm được thiết kế riêng cho từng ngành nghề.
                            Tất cả đều dễ sử dụng, bảo mật cao và hỗ trợ 24/7.
                        </p>
                    </div>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-[#197dd3]">
                            Trang chủ
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#197dd3] font-medium">Tất cả sản phẩm</span>
                    </nav>
                </div>
            </div>

            {/* Products Grid - Dynamic from API */}
            <ProductsGrid />

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#197dd3] to-[#0f426c]">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                        Không tìm thấy giải pháp phù hợp?
                    </h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                        Liên hệ với chúng tôi để được tư vấn miễn phí và tìm ra giải pháp phần mềm 
                        tối ưu cho doanh nghiệp của bạn.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#197dd3] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Liên hệ tư vấn
                        </Link>
                        <a
                            href="tel:0933549469"
                            className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#197dd3] transition-colors"
                        >
                            Hotline: 0933 549 469
                        </a>
                    </div>
                </div>
            </section>
            <FloatingButtons />
        </div>
    );
}
