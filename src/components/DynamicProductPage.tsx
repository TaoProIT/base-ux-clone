"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    Check, 
    Loader2, 
    Star, 
    Phone, 
    ArrowRight, 
    Play,
    Zap,
    Shield,
    Clock,
    Database,
    Settings,
    CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductSubNav from "@/components/product-page/ProductSubNav";
import { categoryCodeToSlug } from "@/config/products";

interface Product {
    maSanPham: string;
    tenSanPham: string;
    loaiSanPham: string;
    donViTinhChinh: string;
    giaBan: number;
    donViTienTe: string;
    nhaCungCap: string;
    moTa: string;
}

interface Category {
    maDanhMuc: string;
    tenDanhMuc: string;
    moTa: string | null;
    hinhAnh?: string | null;
}

interface DynamicProductPageProps {
    categoryCode: string;
}

const FALLBACK_HERO = "/placeholder.svg";

// Default features khi chưa có data từ backend
const defaultFeatures = [
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Đang tải...",
        description: "Thông tin chi tiết về tính năng sẽ được cập nhật sớm.",
    },
    {
        icon: <Shield className="w-8 h-8" />,
        title: "Bảo mật cao",
        description: "Hệ thống được bảo mật theo tiêu chuẩn quốc tế.",
    },
    {
        icon: <Clock className="w-8 h-8" />,
        title: "Hỗ trợ 24/7",
        description: "Đội ngũ kỹ thuật hỗ trợ khách hàng mọi lúc.",
    },
    {
        icon: <Database className="w-8 h-8" />,
        title: "Dữ liệu real-time",
        description: "Đồng bộ dữ liệu theo thời gian thực.",
    },
    {
        icon: <Settings className="w-8 h-8" />,
        title: "Tùy biến linh hoạt",
        description: "Cấu hình theo yêu cầu doanh nghiệp.",
    },
    {
        icon: <CheckCircle className="w-8 h-8" />,
        title: "Dễ sử dụng",
        description: "Giao diện thân thiện, dễ thao tác.",
    },
];

// Default stats
const defaultStats = [
    { number: "500+", label: "Khách hàng" },
    { number: "12+", label: "Năm kinh nghiệm" },
    { number: "99.9%", label: "Uptime" },
];

// Default processes
const defaultProcesses = [
    {
        title: "Quy trình triển khai:",
        items: [
            "Khảo sát và phân tích yêu cầu",
            "Tùy chỉnh theo đặc thù doanh nghiệp",
            "Đào tạo và hỗ trợ sử dụng",
            "Bảo trì và nâng cấp liên tục",
        ],
    },
];

// Default FAQ
const defaultFAQ = [
    {
        question: "Có thời gian dùng thử không?",
        answer: "Có, chúng tôi cung cấp 14 ngày dùng thử miễn phí cho tất cả các gói dịch vụ.",
    },
    {
        question: "Có hỗ trợ đào tạo sử dụng không?",
        answer: "Có, đội ngũ SOF sẽ hỗ trợ đào tạo trực tiếp hoặc online cho nhân viên của bạn.",
    },
    {
        question: "Dữ liệu có được bảo mật không?",
        answer: "Dữ liệu được mã hóa và lưu trữ an toàn trên server Việt Nam theo tiêu chuẩn quốc tế.",
    },
];

export function DynamicProductPage({ categoryCode }: DynamicProductPageProps) {
    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);
    const productSlug = categoryCodeToSlug(categoryCode) || categoryCode.toLowerCase();

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        async function fetchData() {
            try {
                // Fetch category info and products
                const response = await fetch('/api/proxy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'username': 'admin',
                        'role': 'admin'
                    },
                    body: JSON.stringify({
                        table: 'sl_lv0006',
                        func: 'getProducts',
                        maDanhMuc: categoryCode,
                        code: 'admin',
                        token: 'rbA3RKvD1OJTF1DC'
                    })
                });

                if (!response.ok) throw new Error(`API error ${response.status}`);

                const text = await response.text();
                const cleanedText = text.trim().replace(/^\ufeff/, '');
                const jsonMatch = cleanedText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
                const data = JSON.parse(jsonMatch ? jsonMatch[0] : cleanedText);

                if (data.success) {
                    setCategory(data.category);
                    setProducts(data.products || []);
                } else {
                    setCategory({
                        maDanhMuc: categoryCode,
                        tenDanhMuc: `Phần mềm ${categoryCode}`,
                        moTa: `Giải pháp phần mềm ${categoryCode} chuyên nghiệp của SOF`,
                        hinhAnh: FALLBACK_HERO,
                    });
                    setProducts([]);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setCategory({
                    maDanhMuc: categoryCode,
                    tenDanhMuc: `Phần mềm ${categoryCode}`,
                    moTa: `Giải pháp phần mềm ${categoryCode} chuyên nghiệp của SOF`,
                    hinhAnh: FALLBACK_HERO,
                });
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [categoryCode]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#197dd3]" />
                <span className="ml-3 text-gray-600">Đang tải thông tin sản phẩm...</span>
            </div>
        );
    }

    // Group products by tier (Basic, Pro, Full)
    const basicProducts = products.filter(p => p.maSanPham.includes('BS'));
    const proProducts = products.filter(p => p.maSanPham.includes('PR'));
    const fullProducts = products.filter(p => p.maSanPham.includes('FU'));

    // Helper to extract feature list from nhaCungCap HTML
    const extractFeatures = (html: string): string[] => {
        if (!html) return ['Đang tải...'];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const features: string[] = [];
        const seen = new Set<string>();
        doc.querySelectorAll('li, p').forEach((node) => {
            const text = node.textContent?.replace(/^[-•✔+\s]+/, '').trim();
            if (text && !seen.has(text)) {
                seen.add(text);
                features.push(text);
            }
        });
        return features.length > 0 ? features : ['Đang tải...'];
    };

    // Build pricing plans
    const pricingPlans = [];
    if (basicProducts[0]) {
        pricingPlans.push({
            name: basicProducts[0].tenSanPham || "Basic",
            description: basicProducts[0].loaiSanPham || "Phù hợp doanh nghiệp nhỏ",
            price: basicProducts[0].giaBan ? Number(basicProducts[0].giaBan).toLocaleString('vi-VN') : "Đang tải",
            priceNote: `/${basicProducts[0].donViTinhChinh || 'tháng'}`,
            features: extractFeatures(basicProducts[0].nhaCungCap),
            cta: "Đăng ký ngay",
            ctaLink: "/contact?plan=basic",
        });
    } else {
        pricingPlans.push({
            name: "Basic",
            description: "Đang tải...",
            price: "Đang tải",
            priceNote: "",
            features: ["Đang tải tính năng...", "Hỗ trợ email", "Cập nhật miễn phí"],
            cta: "Liên hệ tư vấn",
            ctaLink: "/contact?plan=basic",
        });
    }

    if (proProducts[0]) {
        pricingPlans.push({
            name: proProducts[0].tenSanPham || "Pro",
            description: proProducts[0].loaiSanPham || "Doanh nghiệp vừa và lớn",
            price: proProducts[0].giaBan ? Number(proProducts[0].giaBan).toLocaleString('vi-VN') : "Đang tải",
            priceNote: `/${proProducts[0].donViTinhChinh || 'tháng'}`,
            features: extractFeatures(proProducts[0].nhaCungCap),
            cta: "Đăng ký ngay",
            ctaLink: "/contact?plan=pro",
            isFeatured: true,
            badge: "Phổ biến nhất",
        });
    } else {
        pricingPlans.push({
            name: "Pro",
            description: "Đang tải...",
            price: "Đang tải",
            priceNote: "",
            features: ["Đang tải tính năng...", "Tính năng nâng cao", "Hỗ trợ 24/7"],
            cta: "Liên hệ tư vấn",
            ctaLink: "/contact?plan=pro",
            isFeatured: true,
            badge: "Phổ biến",
        });
    }

    if (fullProducts[0]) {
        pricingPlans.push({
            name: fullProducts[0].tenSanPham || "Full",
            description: fullProducts[0].loaiSanPham || "Chuỗi, tập đoàn",
            price: fullProducts[0].giaBan ? Number(fullProducts[0].giaBan).toLocaleString('vi-VN') : "Đang tải",
            priceNote: `/${fullProducts[0].donViTinhChinh || 'tháng'}`,
            features: extractFeatures(fullProducts[0].nhaCungCap),
            cta: "Liên hệ báo giá",
            ctaLink: "/contact?plan=full",
        });
    } else {
        pricingPlans.push({
            name: "Enterprise",
            description: "Đang tải...",
            price: "Đang tải",
            priceNote: "",
            features: ["Đang tải tính năng...", "Tùy chỉnh không giới hạn", "Account Manager riêng"],
            cta: "Liên hệ báo giá",
            ctaLink: "/contact?plan=enterprise",
        });
    }

    const productName = category?.tenDanhMuc || `Phần mềm ${categoryCode}`;
    const productDescription = category?.moTa || `Giải pháp phần mềm ${categoryCode} chuyên nghiệp của SOF với đầy đủ tính năng và hỗ trợ 24/7.`;
    
    // Tạo slug cho trang san-pham động
    const dynamicProductSlug = `san-pham/${categoryCode.toLowerCase()}`;

    return (
        <>
            {/* Hero Section */}
            <ProductSubNav productSlug={dynamicProductSlug} productName={category?.tenDanhMuc} />

            <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0f426c] to-[#197dd3] pt-28 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-96 h-96 rounded-full border-[40px] border-white/30" />
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border-[30px] border-white/20" />
                    <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border-[20px] border-white/25" />
                </div>

                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Star className="w-4 h-4" />
                                Sản phẩm SOF
                            </span>

                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 leading-tight">
                                {productName}
                            </h1>

                            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-lg">
                                {productDescription}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        className="bg-white text-[#0f426c] hover:bg-gray-100 gap-2 font-semibold"
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                        Dùng thử miễn phí
                                    </Button>
                                </Link>
                                <Link href="#features">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-[#0f426c] gap-2 font-semibold"
                                    >
                                        <Play className="w-5 h-5" />
                                        Xem demo
                                    </Button>
                                </Link>
                            </div>

                            {/* Hotline */}
                            <div className="flex items-center gap-3 mb-8">
                                <a 
                                    href="tel:0933549469"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span className="font-medium">Hotline: 0933 549 469</span>
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-8 mt-8">
                                {defaultStats.map((stat, index) => (
                                    <div key={index} className="text-left">
                                        <div className="text-3xl lg:text-4xl font-extrabold text-white">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-white/80">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative z-10">
                            <div className="relative">
                                <Image
                                    src={category?.hinhAnh || FALLBACK_HERO}
                                    alt={productName}
                                    width={800}
                                    height={600}
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                    priority
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        if (!target.src.includes('placeholder')) {
                                            target.src = FALLBACK_HERO;
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block text-[#197dd3] text-sm font-semibold uppercase tracking-wider mb-4">
                            Tính năng nổi bật
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0f426c] mb-4">
                            Giải pháp toàn diện cho doanh nghiệp
                        </h2>
                        <p className="text-lg text-gray-600">
                            {products.length > 0 
                                ? "Khám phá các tính năng được thiết kế để tối ưu hóa hoạt động của bạn"
                                : "Đang tải thông tin tính năng..."}
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {defaultFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-[#197dd3] to-[#77d4fb] rounded-xl text-white">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-[#0f426c] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About / Process Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Images */}
                        <div className="space-y-4">
                            <Image
                                src={category?.hinhAnh || FALLBACK_HERO}
                                alt={`${productName} Screenshot`}
                                width={600}
                                height={400}
                                className="w-full rounded-xl shadow-lg"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    if (!target.src.includes('placeholder')) {
                                        target.src = FALLBACK_HERO;
                                    }
                                }}
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <span className="inline-block text-[#197dd3] text-sm font-semibold uppercase tracking-wider mb-4">
                                Quy trình vận hành
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f426c] mb-4">
                                Triển khai nhanh chóng, hiệu quả
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                {products.length > 0 
                                    ? "SOF cam kết hỗ trợ doanh nghiệp từ khâu tư vấn đến triển khai và vận hành."
                                    : "Đang tải thông tin quy trình..."}
                            </p>

                            {/* Processes */}
                            <div className="space-y-8">
                                {defaultProcesses.map((process, processIndex) => (
                                    <div key={processIndex}>
                                        <h4 className="font-semibold mb-4 text-[#197dd3]">
                                            {process.title}
                                        </h4>
                                        <ul className="space-y-3">
                                            {process.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#197dd3] text-white rounded-full">
                                                        <Check className="w-4 h-4" />
                                                    </span>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-10">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-[#197dd3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1565c0] transition-colors"
                                >
                                    Nhận tư vấn miễn phí
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block text-[#197dd3] text-sm font-semibold uppercase tracking-wider mb-4">
                            Bảng giá
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0f426c] mb-4">
                            Chọn gói phù hợp với bạn
                        </h2>
                        <p className="text-lg text-gray-600">
                            {products.length > 0 
                                ? "Tất cả các gói đều bao gồm hỗ trợ kỹ thuật và cập nhật miễn phí"
                                : "Đang tải thông tin bảng giá..."}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`pricing-card relative rounded-xl p-8 flex flex-col transition-all duration-300 ${
                                    plan.isFeatured
                                        ? "bg-gradient-to-br from-[#197dd3] to-[#1565c0] text-white scale-105 shadow-xl"
                                        : "bg-white shadow-md hover:shadow-lg hover:-translate-y-1"
                                }`}
                            >
                                {plan.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase">
                                        {plan.badge}
                                    </div>
                                )}

                                {/* Header */}
                                <div className="pricing-header text-center pb-6 border-b border-gray-200 mb-6">
                                    <h3 className="pricing-title text-2xl font-bold mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className={`text-sm ${plan.isFeatured ? "opacity-80" : "text-gray-500"}`}>
                                        {plan.description}
                                    </p>
                                    <div className={`pricing-price text-3xl font-extrabold mt-4 ${plan.isFeatured ? "text-white" : "text-[#197dd3]"}`}>
                                        {plan.price}
                                        {plan.priceNote && (
                                            <span className={`text-base font-normal ${plan.isFeatured ? "opacity-80" : "text-gray-600"}`}>
                                                {plan.priceNote}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="pricing-features flex-1 space-y-3 mb-8">
                                    {plan.features.slice(0, 8).map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <Check className={`w-5 h-5 flex-shrink-0 ${plan.isFeatured ? "text-white" : "text-green-500"}`} />
                                            <span className={plan.isFeatured ? "text-white/90" : "text-gray-700"}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link
                                    href={plan.ctaLink}
                                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                                        plan.isFeatured
                                            ? "bg-white text-[#197dd3] hover:bg-gray-100"
                                            : index === 2
                                                ? "bg-[#197dd3] text-white hover:bg-[#1565c0]"
                                                : "border-2 border-[#197dd3] text-[#197dd3] hover:bg-[#197dd3] hover:text-white"
                                    }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* If no products found */}
                    {products.length === 0 && (
                        <div className="text-center py-8 mt-8">
                            <p className="text-gray-500 italic mb-4">
                                Dữ liệu bảng giá đang được cập nhật. Vui lòng liên hệ để biết thêm chi tiết.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block text-[#197dd3] text-sm font-semibold uppercase tracking-wider mb-4">
                            Câu hỏi thường gặp
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0f426c] mb-4">
                            Giải đáp thắc mắc
                        </h2>
                        <p className="text-lg text-gray-600">
                            Những câu hỏi phổ biến về bảng giá và dịch vụ.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {defaultFAQ.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                                <h4 className="font-semibold text-[#197dd3] mb-2">{item.question}</h4>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#197dd3] to-[#1565c0]">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        Sẵn sàng trải nghiệm {productName}?
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                        Đăng ký dùng thử miễn phí 14 ngày. Không cần thẻ tín dụng.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-[#197dd3] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Dùng thử miễn phí
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a
                            href="tel:0933549469"
                            className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            Hotline: 0933 549 469
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

// Pricing Card Component (backward compatibility - deprecated, use inline rendering above)
function PricingCard({
    product,
    extractFeatures,
    isFeatured = false,
}: {
    product: Product;
    extractFeatures: (html: string) => string[];
    isFeatured?: boolean;
}) {
    const features = extractFeatures(product.nhaCungCap);
    const price = Number(product.giaBan).toLocaleString('vi-VN');

    return (
        <div
            className={`relative rounded-xl p-8 flex flex-col transition-all duration-300 ${isFeatured
                    ? "bg-gradient-to-br from-[#197dd3] to-[#1565c0] text-white scale-105 shadow-xl"
                    : "bg-white shadow-md hover:shadow-lg hover:-translate-y-1"
                }`}
        >
            {isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase">
                    Phổ biến nhất
                </div>
            )}

            {/* Header */}
            <div className="text-center pb-6 border-b border-gray-200 mb-6">
                <h3 className="text-2xl font-bold mb-2">{product.tenSanPham}</h3>
                <p className={`text-sm ${isFeatured ? "opacity-80" : "text-gray-500"}`}>
                    {product.loaiSanPham}
                </p>
                <div className={`text-3xl font-extrabold mt-4 ${isFeatured ? "text-white" : "text-[#197dd3]"}`}>
                    {price}
                    <span className={`text-base font-normal ${isFeatured ? "opacity-80" : "text-gray-600"}`}>
                        /{product.donViTinhChinh || 'month'}
                    </span>
                </div>
            </div>

            {/* Features */}
            <ul className="flex-1 space-y-3 mb-8">
                {features.slice(0, 8).map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 ${isFeatured ? "text-white" : "text-green-500"}`} />
                        <span className={isFeatured ? "text-white/90" : "text-gray-700"}>
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <Link
                href="/contact"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${isFeatured
                        ? "bg-white text-[#197dd3] hover:bg-gray-100"
                        : "border-2 border-[#197dd3] text-[#197dd3] hover:bg-[#197dd3] hover:text-white"
                    }`}
            >
                Đăng ký ngay
            </Link>
        </div>
    );
}
