"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Coffee,
    Hotel,
    Utensils,
    Store,
    ShoppingCart,
    Users,
    Building2,
    Truck,
    Warehouse,
    Car,
    Lock,
    Globe,
    Loader2,
    LayoutGrid,
} from "lucide-react";
import type { Category } from "@/services/productApi";

// Icon mapping based on category code
const categoryIcons: Record<string, React.ElementType> = {
    'CAFE': Coffee,
    'KHACHSAN': Hotel,
    'NHAHANG': Utensils,
    'QUANAN': Store,
    'BANHANG': ShoppingCart,
    'NHANSU': Users,
    'ERP': Building2,
    'VANTAI': Truck,
    'KHO': Warehouse,
    'GIUXE': Car,
    'CHUKYSO': Lock,
    'WEB': Globe,
};

// Color mapping for categories
const categoryColors: Record<string, { from: string; to: string; border: string }> = {
    'CAFE': { from: 'from-amber-400', to: 'to-amber-600', border: 'hover:border-amber-400' },
    'KHACHSAN': { from: 'from-violet-400', to: 'to-violet-600', border: 'hover:border-violet-400' },
    'NHAHANG': { from: 'from-red-400', to: 'to-red-600', border: 'hover:border-red-400' },
    'QUANAN': { from: 'from-orange-400', to: 'to-orange-600', border: 'hover:border-orange-400' },
    'BANHANG': { from: 'from-blue-400', to: 'to-blue-600', border: 'hover:border-blue-400' },
    'NHANSU': { from: 'from-pink-500', to: 'to-pink-700', border: 'hover:border-pink-400' },
    'ERP': { from: 'from-indigo-400', to: 'to-indigo-600', border: 'hover:border-indigo-400' },
    'VANTAI': { from: 'from-orange-500', to: 'to-orange-700', border: 'hover:border-orange-400' },
    'KHO': { from: 'from-amber-500', to: 'to-amber-700', border: 'hover:border-amber-400' },
    'GIUXE': { from: 'from-cyan-400', to: 'to-cyan-600', border: 'hover:border-cyan-400' },
    'CHUKYSO': { from: 'from-gray-400', to: 'to-gray-600', border: 'hover:border-gray-400' },
    'WEB': { from: 'from-pink-400', to: 'to-pink-600', border: 'hover:border-pink-400' },
};

// Default color for unknown categories
const defaultColor = { from: 'from-blue-400', to: 'to-blue-600', border: 'hover:border-blue-400' };

// Map category code to URL slug
function categoryToSlug(maDanhMuc: string): string {
    const mapping: Record<string, string> = {
        'CAFE': 'phan-mem-ban-hang',
        'KHACHSAN': 'phan-mem-khach-san',
        'NHAHANG': 'phan-mem-nha-hang',
        'QUANAN': 'phan-mem-quan-an',
    };
    return mapping[maDanhMuc] || `san-pham/${maDanhMuc.toLowerCase()}`;
}

// Static hardcoded items to keep (thiết kế web)
const staticItems = [
    {
        maDanhMuc: 'WEB',
        tenDanhMuc: 'Thiết kế Web',
        moTa: 'Website chuẩn UX/UI, tối ưu SEO',
        href: '/dich-vu-thiet-ke-web',
        isStatic: true,
    }
];

export function ProductsGrid() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('/api/proxy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'username': 'admin',
                        'role': 'admin'
                    },
                    body: JSON.stringify({
                        table: 'sl_lv0006',
                        func: 'listWithCount',
                        code: 'admin',
                        token: 'rbA3RKvD1OJTF1DC'
                    })
                });

                if (!response.ok) throw new Error(`API error ${response.status}`);

                const text = await response.text();
                const cleanedText = text.trim().replace(/^\ufeff/, '');
                const jsonMatch = cleanedText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
                const data = JSON.parse(jsonMatch ? jsonMatch[0] : cleanedText);

                // Handle both array and object with data property
                const categoriesData = Array.isArray(data) ? data : (data.data || data.result || []);
                setCategories(categoriesData);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Không thể tải danh mục sản phẩm');
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-[#197dd3]" />
                        <span className="ml-3 text-gray-600">Đang tải danh mục...</span>
                    </div>
                </div>
            </section>
        );
    }

    // Combine API categories with static items
    const allItems = [...categories, ...staticItems];

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
                        {error}
                    </div>
                )}

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Danh mục sản phẩm ({allItems.length})
                    </h2>
                    <p className="text-gray-600">
                        Chọn danh mục phù hợp với nhu cầu của bạn
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allItems.map((item, index) => {
                        const maDanhMuc = item.maDanhMuc || '';
                        const Icon = categoryIcons[maDanhMuc] || LayoutGrid;
                        const color = categoryColors[maDanhMuc] || defaultColor;
                        const href = (item as any).isStatic 
                            ? (item as any).href 
                            : `/${categoryToSlug(maDanhMuc)}`;

                        return (
                            <Link
                                key={maDanhMuc || index}
                                href={href}
                                className={`bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent ${color.border} group`}
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color.from} ${color.to} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">
                                    {item.tenDanhMuc}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                    {item.moTa || 'Giải pháp phần mềm chuyên nghiệp'}
                                </p>
                                {(item as Category).soSanPham !== undefined && (
                                    <span className="inline-flex items-center text-xs text-[#197dd3] font-medium">
                                        {(item as Category).soSanPham} gói dịch vụ →
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
