"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Store,
  Package,
  Coffee,
  Utensils,
  Hotel,
  Users,
  Truck,
  Warehouse,
  Car,
  Building2,
  Pill,
  MessageSquare,
  Lock,
  LayoutGrid,
  Globe,
  Loader2,
} from "lucide-react";

interface ProductDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  maDanhMuc: string;
  tenDanhMuc: string;
  moTa: string | null;
  soSanPham?: number;
}

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
  'DUOC': Pill,
  'CHAT': MessageSquare,
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
  'DUOC': { from: 'from-teal-400', to: 'to-teal-600', border: 'hover:border-teal-400' },
  'CHAT': { from: 'from-slate-400', to: 'to-slate-600', border: 'hover:border-slate-400' },
};

const defaultColor = { from: 'from-blue-400', to: 'to-blue-600', border: 'hover:border-blue-400' };

// Map category code to URL slug
function categoryToSlug(maDanhMuc: string): string {
  const mapping: Record<string, string> = {
    'CAFE': 'phan-mem-ban-hang',
    'KHACHSAN': 'phan-mem-khach-san',
    'NHAHANG': 'phan-mem-nha-hang',
    'QUANAN': 'phan-mem-quan-an',
    'NHANSU': 'phan-mem-nhan-su',
    'ERP': 'phan-mem-erp',
    'VANTAI': 'phan-mem-van-tai-logistic',
    'KHO': 'phan-mem-kho-pallet',
    'GIUXE': 'phan-mem-quan-li-giu-xe',
    'CHUKYSO': 'phan-mem-chu-ky-so',
  };
  return mapping[maDanhMuc] || `san-pham/${maDanhMuc.toLowerCase()}`;
}

// Static items that should always appear
const staticItems = [
  { maDanhMuc: 'WEB', tenDanhMuc: 'Thiết kế web', moTa: 'Website chuẩn UX/UI, tối ưu SEO', href: '/dich-vu-thiet-ke-web' },
];

export const ProductDropdown = ({ isOpen, onClose }: ProductDropdownProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

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
            func: 'data',
            code: 'admin',
            token: 'rbA3RKvD1OJTF1DC'
          })
        });

        if (!response.ok) throw new Error(`API error ${response.status}`);

        const text = await response.text();
        const cleanedText = text.trim().replace(/^\ufeff/, '');
        const jsonMatch = cleanedText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        const data = JSON.parse(jsonMatch ? jsonMatch[0] : cleanedText);

        const categoriesData = Array.isArray(data) ? data : (data.data || data.result || []);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [isOpen]);

  if (!isOpen) return null;

  // Combine API categories with static items
  const allItems = [
    ...categories.map(cat => ({
      ...cat,
      href: `/${categoryToSlug(cat.maDanhMuc)}`,
      isFromApi: true,
    })),
    ...staticItems.filter(item => 
      !categories.some(cat => cat.maDanhMuc === item.maDanhMuc)
    ),
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="fixed left-0 right-0 z-50 mt-0 top-16 lg:top-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div
            className="border border-[#a7d5ec] rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden"
            style={{
              backgroundColor: '#f4fbff',
              maxHeight: '600px'
            }}
          >
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                  Giải Pháp Phần Mềm SOF
                </h2>
                <p className="text-sm text-gray-600">Chọn phần mềm phù hợp với ngành nghề của bạn</p>
              </div>

              {/* Loading state */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-[#197dd3]" />
                  <span className="ml-2 text-gray-600">Đang tải...</span>
                </div>
              ) : (
                /* Grid */
                <div className="grid grid-cols-4 gap-4 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50">
                  {allItems.map((item, index) => {
                    const Icon = categoryIcons[item.maDanhMuc] || LayoutGrid;
                    const color = categoryColors[item.maDanhMuc] || defaultColor;

                    return (
                      <a
                        key={item.maDanhMuc || index}
                        href={(item as any).href}
                        className={`bg-white rounded-xl p-4 hover:shadow-xl transition-all duration-300 border-2 border-transparent ${color.border} group cursor-pointer`}
                        onClick={onClose}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color.from} ${color.to} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1 text-sm">{item.tenDanhMuc}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{item.moTa || 'Giải pháp chuyên nghiệp'}</p>
                      </a>
                    );
                  })}

                  {/* Xem tất cả - CTA */}
                  <a
                    href="/products"
                    className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer flex flex-col items-center justify-center"
                    onClick={onClose}
                  >
                    <LayoutGrid className="w-8 h-8 text-white mb-2" />
                    <h4 className="font-bold text-white text-sm text-center">Xem tất cả</h4>
                    <p className="text-xs text-white/80 text-center mt-1">→</p>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
