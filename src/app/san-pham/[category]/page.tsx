import type { Metadata } from "next";
import Link from "next/link";
import { DynamicProductPage } from "@/components/DynamicProductPage";
import { FloatingButtons } from "@/components/FloatingButtons";

// Generate metadata dynamically
export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    const { category } = await params;
    const categoryName = category.toUpperCase();

    return {
        title: `Phần Mềm ${categoryName} - SOF Software Solutions`,
        description: `Khám phá giải pháp phần mềm ${categoryName} chuyên nghiệp của SOF với đầy đủ tính năng và hỗ trợ 24/7.`,
        keywords: ["phần mềm", categoryName, "SOF", "giải pháp quản lý"],
    };
}

// Page component for dynamic products from database
export default async function DynamicCategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="pt-20 bg-white border-b">
                <div className="container mx-auto px-4 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-[#197dd3]">
                            Trang chủ
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/products" className="text-gray-500 hover:text-[#197dd3]">
                            Sản phẩm
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#197dd3] font-medium">{category.toUpperCase()}</span>
                    </nav>
                </div>
            </div>

            {/* Dynamic Product Content - loaded from API */}
            <DynamicProductPage categoryCode={category.toUpperCase()} />
            <FloatingButtons />
        </div>
    );
}
