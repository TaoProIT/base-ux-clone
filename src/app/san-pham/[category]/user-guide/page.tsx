import type { Metadata } from "next";
import { BookOpen, FileText, Video, Download, HelpCircle, Search, ChevronRight, ExternalLink } from "lucide-react";
import ProductSubNav from "@/components/product-page/ProductSubNav";
import { ProductCTA } from "@/components/product-page";
import { FloatingButtons } from "@/components/FloatingButtons";
import Link from "next/link";

// Generate metadata dynamically
export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    const { category } = await params;
    const categoryName = category.toUpperCase();

    return {
        title: `Tài Liệu Hướng Dẫn - Phần Mềm ${categoryName} - SOF`,
        description: `Tài liệu hướng dẫn sử dụng Phần mềm ${categoryName}. Hướng dẫn cài đặt, video tutorial, FAQ.`,
        keywords: ["tài liệu", "hướng dẫn", categoryName, "SOF"],
    };
}

// Document categories
const defaultDocCategories = [
    {
        icon: BookOpen,
        title: "Bắt đầu",
        description: "Hướng dẫn cài đặt và cấu hình ban đầu",
        articles: [
            "Giới thiệu tổng quan",
            "Yêu cầu hệ thống",
            "Hướng dẫn cài đặt",
            "Cấu hình ban đầu",
            "Tạo tài khoản người dùng",
        ],
    },
    {
        icon: FileText,
        title: "Hướng dẫn sử dụng",
        description: "Hướng dẫn chi tiết các chức năng",
        articles: [
            "Quản lý danh mục",
            "Thao tác cơ bản",
            "Báo cáo và thống kê",
            "Xuất/nhập dữ liệu",
            "Tìm kiếm và lọc",
        ],
    },
    {
        icon: Video,
        title: "Video hướng dẫn",
        description: "Video tutorial từng bước",
        articles: [
            "Video tổng quan",
            "Hướng dẫn nhập liệu",
            "Hướng dẫn báo cáo",
            "Tips và tricks",
            "Xử lý lỗi thường gặp",
        ],
    },
    {
        icon: Download,
        title: "Tài liệu tải về",
        description: "PDF và file hướng dẫn",
        articles: [
            "Hướng dẫn sử dụng (PDF)",
            "Template mẫu",
            "Checklist cấu hình",
            "Bảng mã lỗi",
            "Câu hỏi thường gặp",
        ],
    },
];

// FAQ items
const defaultFAQs = [
    {
        question: "Làm sao để đặt lại mật khẩu?",
        answer: "Vào trang đăng nhập, nhấn 'Quên mật khẩu', nhập email và làm theo hướng dẫn trong email nhận được.",
    },
    {
        question: "Cách sao lưu dữ liệu?",
        answer: "Vào Cài đặt > Sao lưu dữ liệu > Chọn 'Sao lưu ngay' hoặc thiết lập lịch sao lưu tự động.",
    },
    {
        question: "Phần mềm có hỗ trợ đa ngôn ngữ không?",
        answer: "Có, phần mềm hỗ trợ Tiếng Việt và English. Vào Cài đặt > Ngôn ngữ để chuyển đổi.",
    },
    {
        question: "Làm sao để liên hệ hỗ trợ kỹ thuật?",
        answer: "Hotline: 0915.688.122 | Email: support@sof.vn | Chat trực tuyến trên website.",
    },
    {
        question: "Dữ liệu có được bảo mật không?",
        answer: "Có, dữ liệu được mã hóa SSL 256-bit, lưu trữ trên server có chứng chỉ bảo mật quốc tế.",
    },
    {
        question: "Có thể sử dụng trên điện thoại không?",
        answer: "Có, giao diện responsive hoạt động tốt trên mọi thiết bị: PC, tablet, điện thoại.",
    },
];

// Page component
export default async function DynamicUserGuidePage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const categoryName = category.toUpperCase();
    const productSlug = `san-pham/${category}`;
    const productName = `Phần mềm ${categoryName}`;

    return (
        <div className="min-h-screen bg-background">
            {/* Product Sub Navigation */}
            <ProductSubNav productSlug={productSlug} productName={productName} />

            {/* Page Header */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--sof-primary)] to-[var(--sof-accent)]">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <BookOpen className="w-4 h-4" />
                        Tài liệu đầy đủ
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Hướng Dẫn Sử Dụng
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                        Tài liệu hướng dẫn chi tiết giúp bạn sử dụng {productName} hiệu quả
                    </p>

                    {/* Search Box */}
                    <div className="max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm tài liệu..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Document Categories */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {defaultDocCategories.map((cat, index) => {
                            const IconComponent = cat.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-14 h-14 mb-5 flex items-center justify-center bg-gradient-to-br from-[#197dd3] to-[#77d4fb] rounded-xl text-white">
                                        <IconComponent className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0f426c] mb-2">
                                        {cat.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {cat.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {cat.articles.map((article, aIndex) => (
                                            <li key={aIndex}>
                                                <Link
                                                    href="#"
                                                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#197dd3] transition-colors"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                    {article}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Quick Start Guide */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block text-[#197dd3] text-sm font-semibold uppercase tracking-wider mb-4">
                            Bắt đầu nhanh
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0f426c] mb-4">
                            5 bước để bắt đầu
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Hướng dẫn nhanh để bắt đầu sử dụng {productName}
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {[
                            { step: 1, title: "Tạo tài khoản", desc: "Đăng ký tài khoản với email công ty của bạn." },
                            { step: 2, title: "Cấu hình hệ thống", desc: "Thiết lập thông tin công ty, chi nhánh, người dùng." },
                            { step: 3, title: "Nhập dữ liệu ban đầu", desc: "Import danh mục, dữ liệu từ hệ thống cũ (nếu có)." },
                            { step: 4, title: "Phân quyền người dùng", desc: "Tạo tài khoản và phân quyền cho nhân viên." },
                            { step: 5, title: "Bắt đầu sử dụng", desc: "Bắt đầu nhập liệu và theo dõi hoạt động." },
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-6 mb-6 last:mb-0">
                                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#197dd3] to-[#77d4fb] rounded-full text-white font-bold text-lg flex-shrink-0">
                                    {item.step}
                                </div>
                                <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
                                    <h4 className="font-semibold text-[#0f426c] mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block text-[#197dd3] text-sm font-semibold uppercase tracking-wider mb-4">
                            Hỏi đáp
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0f426c] mb-4">
                            Câu hỏi thường gặp
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {defaultFAQs.map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <HelpCircle className="w-6 h-6 text-[#197dd3] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-[#0f426c] mb-2">
                                            {faq.question}
                                        </h4>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Contact */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="bg-gradient-to-br from-[#197dd3] to-[#77d4fb] rounded-2xl p-8 lg:p-12 text-center text-white">
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                            Cần hỗ trợ thêm?
                        </h3>
                        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                            Đội ngũ hỗ trợ kỹ thuật của chúng tôi sẵn sàng giúp đỡ bạn 24/7
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-[#197dd3] px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                <HelpCircle className="w-5 h-5" />
                                Liên hệ hỗ trợ
                            </Link>
                            <a
                                href="tel:0915688122"
                                className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Hotline: 0915.688.122
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <ProductCTA
                title={`Sẵn sàng sử dụng ${categoryName}?`}
                subtitle="Đăng ký dùng thử miễn phí 14 ngày để trải nghiệm."
                ctaPrimaryText="Dùng thử miễn phí"
                ctaPrimaryLink="/contact"
                ctaSecondaryText="Xem tính năng"
                ctaSecondaryLink={`/san-pham/${category}/features`}
            />

            {/* Floating Buttons */}
            <FloatingButtons />
        </div>
    );
}
