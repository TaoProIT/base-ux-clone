import type { Metadata } from "next";
import { Star, Zap, Shield, Database, Settings, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductSubNav from "@/components/product-page/ProductSubNav";
import { ProductCTA } from "@/components/product-page";
import { FloatingButtons } from "@/components/FloatingButtons";
import React from "react";

// Generate metadata dynamically
export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    const { category } = await params;
    const categoryName = category.toUpperCase();

    return {
        title: `Tính Năng - Phần Mềm ${categoryName} - SOF`,
        description: `Tính năng đầy đủ của phần mềm ${categoryName}: hiệu suất cao, bảo mật, real-time, hỗ trợ 24/7.`,
        keywords: ["tính năng", categoryName, "SOF", "phần mềm"],
    };
}

// Default feature sections
const defaultFeatureSections = [
    {
        label: "Tính năng cốt lõi",
        title: "Chức năng chính",
        subtitle: "Các tính năng cơ bản giúp tối ưu quy trình làm việc.",
        features: [
            {
                icon: React.createElement(Zap, { className: "w-7 h-7" }),
                title: "Hiệu suất cao",
                description: "Xử lý nhanh chóng, không giật lag, đáp ứng mọi nhu cầu.",
            },
            {
                icon: React.createElement(Shield, { className: "w-7 h-7" }),
                title: "Bảo mật đa lớp",
                description: "Mã hóa dữ liệu, phân quyền chi tiết, audit log.",
            },
            {
                icon: React.createElement(Database, { className: "w-7 h-7" }),
                title: "Dữ liệu real-time",
                description: "Đồng bộ dữ liệu theo thời gian thực giữa các thiết bị.",
            },
            {
                icon: React.createElement(Clock, { className: "w-7 h-7" }),
                title: "Hoạt động 24/7",
                description: "Hệ thống ổn định, uptime 99.9%.",
            },
        ],
    },
    {
        label: "Tính năng nâng cao",
        title: "Mở rộng & Tích hợp",
        subtitle: "Các tính năng nâng cao cho doanh nghiệp phát triển.",
        features: [
            {
                icon: React.createElement(Settings, { className: "w-7 h-7" }),
                title: "Tùy biến linh hoạt",
                description: "Cấu hình theo yêu cầu đặc thù của doanh nghiệp.",
            },
            {
                icon: React.createElement(CheckCircle, { className: "w-7 h-7" }),
                title: "API tích hợp",
                description: "Kết nối với các hệ thống khác: kế toán, CRM, ERP.",
            },
            {
                icon: React.createElement(Database, { className: "w-7 h-7" }),
                title: "Báo cáo thông minh",
                description: "Dashboard, biểu đồ, xuất Excel/PDF tự động.",
            },
            {
                icon: React.createElement(Shield, { className: "w-7 h-7" }),
                title: "Đa chi nhánh",
                description: "Quản lý nhiều chi nhánh, phân quyền theo vị trí.",
            },
        ],
    },
];

// Default full feature list
const defaultFullFeatures = [
    "Giao diện thân thiện, dễ sử dụng",
    "Đa ngôn ngữ (Tiếng Việt, English)",
    "Responsive trên mọi thiết bị",
    "Bảo mật theo tiêu chuẩn quốc tế",
    "Phân quyền người dùng chi tiết",
    "Audit log theo dõi hoạt động",
    "Sao lưu dữ liệu tự động",
    "Đồng bộ real-time",
    "API RESTful đầy đủ",
    "Tích hợp SSO/LDAP",
    "Báo cáo và thống kê",
    "Xuất dữ liệu Excel/PDF",
    "Thông báo email/SMS",
    "Hỗ trợ đa chi nhánh",
    "Cập nhật miễn phí",
    "Hỗ trợ kỹ thuật 24/7",
];

// Page component
export default async function DynamicFeaturesPage({
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
                        <Star className="w-4 h-4" />
                        Công nghệ hiện đại
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Tính Năng {categoryName}
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Khám phá đầy đủ các tính năng của Phần mềm {categoryName} - Giải pháp toàn diện cho doanh nghiệp
                    </p>
                </div>
            </section>

            {/* Feature Sections */}
            {defaultFeatureSections.map((section, sectionIndex) => (
                <section 
                    key={sectionIndex} 
                    className={`py-20 ${sectionIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                    <div className="container mx-auto px-4 lg:px-8">
                        {/* Section Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-[#197dd3] text-sm font-semibold uppercase tracking-wider mb-4">
                                {section.label}
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f426c] mb-4">
                                {section.title}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {section.subtitle}
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {section.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                                >
                                    <div className="w-14 h-14 mb-5 flex items-center justify-center bg-gradient-to-br from-[#197dd3] to-[#77d4fb] rounded-xl text-white">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#0f426c] mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* Full Feature List */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block text-[#197dd3] text-sm font-semibold uppercase tracking-wider mb-4">
                            Danh sách đầy đủ
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0f426c] mb-4">
                            Tất cả tính năng
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Danh sách đầy đủ các tính năng của hệ thống
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {defaultFullFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <ProductCTA
                title={`Sẵn sàng trải nghiệm ${categoryName}?`}
                subtitle="Đăng ký dùng thử miễn phí 14 ngày. Không cần thẻ tín dụng."
                ctaPrimaryText="Dùng thử miễn phí"
                ctaPrimaryLink="/contact"
                ctaSecondaryText="Xem bảng giá"
                ctaSecondaryLink={`/san-pham/${category}/pricing`}
            />

            {/* Floating Buttons */}
            <FloatingButtons />
        </div>
    );
}
