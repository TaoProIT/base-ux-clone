import type { Metadata } from "next";
import { Check, HelpCircle, Star, Crown, Building } from "lucide-react";
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
        title: `Bảng Giá - Phần Mềm ${categoryName} - SOF`,
        description: `Bảng giá chi tiết Phần mềm ${categoryName}. Gói Basic, Pro, Enterprise phù hợp mọi quy mô doanh nghiệp.`,
        keywords: ["bảng giá", categoryName, "SOF", "phần mềm"],
    };
}

// Default pricing plans
const defaultPricingPlans = [
    {
        name: "Basic",
        description: "Dành cho doanh nghiệp nhỏ",
        price: "Liên hệ",
        period: "",
        popular: false,
        icon: Star,
        features: [
            "Tối đa 5 người dùng",
            "Các tính năng cơ bản",
            "Hỗ trợ email",
            "Sao lưu dữ liệu hàng tuần",
            "Cập nhật miễn phí 1 năm",
        ],
        notIncluded: [
            "API tích hợp",
            "Đa chi nhánh",
            "Báo cáo nâng cao",
            "Hỗ trợ ưu tiên 24/7",
        ],
    },
    {
        name: "Professional",
        description: "Dành cho doanh nghiệp vừa",
        price: "Liên hệ",
        period: "",
        popular: true,
        icon: Crown,
        features: [
            "Tối đa 20 người dùng",
            "Tất cả tính năng Basic",
            "API tích hợp",
            "Đa chi nhánh (3 chi nhánh)",
            "Báo cáo nâng cao",
            "Hỗ trợ ưu tiên",
            "Sao lưu dữ liệu hàng ngày",
            "Cập nhật miễn phí 2 năm",
        ],
        notIncluded: [
            "Không giới hạn chi nhánh",
            "Tùy chỉnh theo yêu cầu",
        ],
    },
    {
        name: "Enterprise",
        description: "Dành cho doanh nghiệp lớn",
        price: "Liên hệ",
        period: "",
        popular: false,
        icon: Building,
        features: [
            "Không giới hạn người dùng",
            "Tất cả tính năng Pro",
            "Không giới hạn chi nhánh",
            "Tùy chỉnh theo yêu cầu",
            "Hỗ trợ 24/7 ưu tiên cao",
            "Sao lưu real-time",
            "SLA cam kết 99.9% uptime",
            "Cập nhật miễn phí trọn đời",
            "Đào tạo tại chỗ",
        ],
        notIncluded: [],
    },
];

// FAQ items
const defaultFAQs = [
    {
        question: "Có được dùng thử miễn phí không?",
        answer: "Có, chúng tôi cung cấp bản dùng thử miễn phí 14 ngày cho tất cả các gói. Không cần thẻ tín dụng.",
    },
    {
        question: "Có thể nâng cấp gói sau khi mua không?",
        answer: "Có, bạn có thể nâng cấp gói bất cứ lúc nào. Chỉ cần thanh toán phần chênh lệch.",
    },
    {
        question: "Hỗ trợ thanh toán như thế nào?",
        answer: "Chúng tôi hỗ trợ thanh toán qua chuyển khoản ngân hàng, thẻ tín dụng/ghi nợ.",
    },
    {
        question: "Có hỗ trợ đào tạo sử dụng không?",
        answer: "Có, tất cả các gói đều được hỗ trợ đào tạo online miễn phí. Gói Enterprise có thêm đào tạo tại chỗ.",
    },
];

// Page component
export default async function DynamicPricingPage({
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
                        Giá cả minh bạch
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Bảng Giá {categoryName}
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Chọn gói phù hợp với quy mô và nhu cầu của doanh nghiệp bạn
                    </p>
                </div>
            </section>

            {/* Pricing Plans */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {defaultPricingPlans.map((plan, index) => {
                            const IconComponent = plan.icon;
                            return (
                                <div
                                    key={index}
                                    className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 ${
                                        plan.popular
                                            ? "border-2 border-[#197dd3] scale-105"
                                            : "border border-gray-200"
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#197dd3] to-[#77d4fb] text-white px-6 py-1 rounded-full text-sm font-medium">
                                            Phổ biến nhất
                                        </div>
                                    )}

                                    <div className="text-center mb-8">
                                        <div
                                            className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl ${
                                                plan.popular
                                                    ? "bg-gradient-to-br from-[#197dd3] to-[#77d4fb] text-white"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            <IconComponent className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#0f426c] mb-2">
                                            {plan.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">{plan.description}</p>
                                    </div>

                                    <div className="text-center mb-8">
                                        <div className="text-4xl font-bold text-[#0f426c]">
                                            {plan.price}
                                        </div>
                                        {plan.period && (
                                            <div className="text-gray-500 text-sm">{plan.period}</div>
                                        )}
                                    </div>

                                    {/* Features included */}
                                    <div className="space-y-3 mb-6">
                                        {plan.features.map((feature, fIndex) => (
                                            <div key={fIndex} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Features not included */}
                                    {plan.notIncluded.length > 0 && (
                                        <div className="space-y-3 mb-8 opacity-50">
                                            {plan.notIncluded.map((feature, fIndex) => (
                                                <div key={fIndex} className="flex items-start gap-3">
                                                    <span className="w-5 h-5 flex items-center justify-center text-gray-400 flex-shrink-0">
                                                        —
                                                    </span>
                                                    <span className="text-gray-500 text-sm line-through">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <Link
                                        href="/contact"
                                        className={`block w-full py-3 text-center rounded-xl font-semibold transition-all ${
                                            plan.popular
                                                ? "bg-gradient-to-r from-[#197dd3] to-[#77d4fb] text-white hover:shadow-lg"
                                                : "bg-gray-100 text-[#0f426c] hover:bg-gray-200"
                                        }`}
                                    >
                                        Liên hệ tư vấn
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block text-[#197dd3] text-sm font-semibold uppercase tracking-wider mb-4">
                            Câu hỏi thường gặp
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0f426c] mb-4">
                            Hỏi đáp về bảng giá
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

            {/* CTA Section */}
            <ProductCTA
                title={`Bắt đầu với ${categoryName} ngay hôm nay`}
                subtitle="Liên hệ để nhận báo giá chi tiết và tư vấn miễn phí."
                ctaPrimaryText="Liên hệ tư vấn"
                ctaPrimaryLink="/contact"
                ctaSecondaryText="Xem tính năng"
                ctaSecondaryLink={`/san-pham/${category}/features`}
            />

            {/* Floating Buttons */}
            <FloatingButtons />
        </div>
    );
}
