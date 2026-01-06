"use client";

import { useEffect, useRef } from "react";
import { ProductPricing, ProductPricingComparison } from "./ProductPricing";

// Default placeholder data structure for initial render
const PLACEHOLDER_PLANS = [
    { name: "Basic", description: "Đang tải...", price: "...", features: ["Đang tải..."], cta: "Đăng ký", ctaLink: "#" },
    { name: "Pro", description: "Đang tải...", price: "...", features: ["Đang tải..."], cta: "Đăng ký", ctaLink: "#", isFeatured: true },
    { name: "Full", description: "Đang tải...", price: "...", features: ["Đang tải..."], cta: "Đăng ký", ctaLink: "#" }
];

interface ProductPricingDynamicProps {
    categoryCode?: string; // Mã loại sản phẩm (vd: CAFE, KHACHSAN, NHAHANG, QUANAN)
}

export function ProductPricingDynamic({ categoryCode = 'CAFE' }: ProductPricingDynamicProps) {
    // Use ref to prevent duplicate fetches
    const hasFetched = useRef(false);

    useEffect(() => {
        // Prevent duplicate fetch
        if (hasFetched.current) return;
        hasFetched.current = true;

        const API_URL = '/api/proxy';
        const API_HEADERS = {
            'Content-Type': 'application/json',
            'username': 'admin',
            'role': 'admin'
        };
        const API_PAYLOAD = {
            table: 'sl_lv0007',
            func: 'data',
            code: 'admin',
            token: 'rbA3RKvD1OJTF1DC'
        };

        const FALLBACK_TEXT = 'đang xử lý data';
        const CHECK_ICON = '<svg class="w-5 h-5 flex-shrink-0 text-green-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';

        // Alias map cho category
        const CATEGORY_VARIANTS: Record<string, string[]> = {
            'CAFE': ['CAFE', 'CF'],
            'KHACHSAN': ['KHACHSAN', 'KHACHS', 'KS', 'HOTEL'],
            'NHAHANG': ['NHAHANG', 'NHAH', 'NH'],
            'QUANAN': ['QUANAN', 'QA', 'QUAN', 'QUANANH'],
            'ERP': ['ERP'],
            'NHANSU': ['NHANSU', 'HR'],
            'VANTAI': ['VANTAI', 'TMS'],
            'KHO': ['KHO', 'WMS'],
            'GIUXE': ['GIUXE', 'PARKING'],
            'CHUKYSO': ['CHUKYSO', 'ESIGN'],
            'WEB': ['WEB'],
            'TOILET': ['TOILET'],
        };

        const variants = CATEGORY_VARIANTS[categoryCode.toUpperCase()] || [categoryCode.toUpperCase()];

        const fetchData = async () => {
            const pricingCards = Array.from(document.querySelectorAll('.pricing-card'));
            const comparisonBody = document.querySelector('#feature-comparison-body');

            if (!pricingCards.length && !comparisonBody) return;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: API_HEADERS,
                    body: JSON.stringify(API_PAYLOAD)
                });

                if (!response.ok) throw new Error(`API error ${response.status}`);

                const text = await response.text();
                let data = null;
                try {
                    const cleanedText = text.trim().replace(/^\ufeff/, '');
                    const jsonMatch = cleanedText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
                    data = JSON.parse(jsonMatch ? jsonMatch[0] : cleanedText);
                } catch (e) {
                    console.error("Parse error", e);
                }

                if (!data) return;

                const productsRaw = Array.isArray(data) ? data : (data.data || data.result || [data]);
                
                // 1. Filter theo category aliases (loaiSanPham hoặc mã sản phẩm)
                const filteredProducts = productsRaw.filter((p: any) => {
                    const code = (p.maSanPham || p.ma_san_pham || '').toString().toUpperCase();
                    const loai = (p.loaiSanPham || '').toString().toUpperCase();
                    return variants.some(v => code.includes(v) || loai === v);
                });

                if (!filteredProducts.length) return;

                // 2. Map Slots - Remove duplicates by keeping only first match
                const findUnique = (arr: any[], patterns: string[]) => {
                    return arr.find((p: any) => {
                        const code = (p.maSanPham || '').toUpperCase();
                        return patterns.some(pt => code.includes(pt));
                    });
                };

                const plans: { basic: any; pro: any; full: any } = {
                    basic: findUnique(filteredProducts, ['.BS', 'BS']),
                    pro: findUnique(filteredProducts, ['.PR', 'PR']),
                    full: findUnique(filteredProducts, ['.FU', 'FU'])
                };

                // 3. Render Cards - Only hydrate if plan exists
                if (pricingCards.length >= 3) {
                    if (plans.basic) hydrateCard(pricingCards[0], plans.basic);
                    if (plans.pro) hydrateCard(pricingCards[1], plans.pro);
                    if (plans.full) hydrateCard(pricingCards[2], plans.full);
                }

                // 4. Render Table
                if (comparisonBody) {
                    renderComparisonTable(comparisonBody, plans);
                }

            } catch (error) {
                console.error(error);
            }
        };

        // Helper functions
        function hydrateCard(card: Element, product: any) {
            const titleEl = card.querySelector('.pricing-title, h3');
            const priceEl = card.querySelector('.pricing-price');
            const featureEl = card.querySelector('.pricing-features');

            if (titleEl) titleEl.textContent = product.tenSanPham || FALLBACK_TEXT;

            if (priceEl && product.giaBan !== undefined) {
                const price = Number(product.giaBan).toLocaleString('vi-VN');
                const unit = product.donViTinhChinh || 'month';
                priceEl.innerHTML = `${price} <span class="text-base font-normal text-gray-500">/${unit}</span>`;
            }

            if (featureEl && product.nhaCungCap) {
                const items = extractTextBlocks(product.nhaCungCap);
                // Remove duplicates from features
                const uniqueItems = [...new Set(items)];
                featureEl.innerHTML = '';
                uniqueItems.forEach(text => {
                    const li = document.createElement('li');
                    li.className = "flex items-center gap-3";
                    li.innerHTML = `${CHECK_ICON}<span class="text-gray-700">${text}</span>`;
                    featureEl.appendChild(li);
                });
            }
        }

        function renderComparisonTable(tbody: Element, plans: any) {
            tbody.innerHTML = '';
            const tr = document.createElement('tr');

            const label = document.createElement('td');
            label.className = "p-4 border-b border-gray-200 font-bold text-left";
            label.textContent = "Chi tiết tính năng";
            tr.appendChild(label);

            ['basic', 'pro', 'full'].forEach(key => {
                const td = document.createElement('td');
                td.className = `p-4 border-b border-gray-200 text-left align-top ${key === 'pro' ? 'bg-[#77d4fb]/10' : ''}`;
                if (plans[key] && plans[key].moTa) {
                    td.innerHTML = plans[key].moTa;
                } else {
                    td.textContent = "—";
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }

        function extractTextBlocks(html: string) {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const blocks: string[] = [];
            const seen = new Set<string>(); // Track seen text to avoid duplicates
            
            doc.querySelectorAll('li, p').forEach((node) => {
                const text = node.textContent?.replace(/^[-•✔+\s]+/, '').trim();
                if (text && !seen.has(text)) {
                    seen.add(text);
                    blocks.push(text);
                }
            });
            return blocks;
        }

        // Execute
        fetchData();

    }, [categoryCode]);

    return (
        <>
            <ProductPricing plans={PLACEHOLDER_PLANS} />
            <ProductPricingComparison rows={[]} />
        </>
    );
}
