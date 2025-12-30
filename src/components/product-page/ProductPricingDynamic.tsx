"use client";

import { useEffect } from "react";
import { ProductPricing, ProductPricingComparison } from "./ProductPricing";

// Default placeholder data structure for initial render
const PLACEHOLDER_PLANS = [
    { name: "Basic", description: "Đang tải...", price: "...", features: ["Đang tải..."], cta: "Đăng ký", ctaLink: "#" },
    { name: "Pro", description: "Đang tải...", price: "...", features: ["Đang tải..."], cta: "Đăng ký", ctaLink: "#", isFeatured: true },
    { name: "Full", description: "Đang tải...", price: "...", features: ["Đang tải..."], cta: "Đăng ký", ctaLink: "#" }
];

export function ProductPricingDynamic() {
    // We still render the component structure so DOM elements exist
    // but we won't use state for data binding to strictly follow "fetch data via js script" paradigm if insisted.
    // However, for React compatibility, using state is much cleaner. 
    // Code below implements the "Vanilla JS logic" inside useEffect.

    useEffect(() => {
        // --- START LOGIC FROM template_static_fetch_data.js ---
        const API_URL = '/api/proxy'; // Use proxy to avoid CORS
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
                // 1. Filter CAFE
                const cafeProducts = productsRaw.filter((p: any) => {
                    const code = (p.maSanPham || p.ma_san_pham || '').toString().toUpperCase();
                    return code.includes('CAFE');
                });

                if (!cafeProducts.length) return;

                // 2. Map Slots
                const plans = {
                    basic: cafeProducts.find((p: any) => (p.maSanPham || '').includes('BS')),
                    pro: cafeProducts.find((p: any) => (p.maSanPham || '').includes('PR')),
                    full: cafeProducts.find((p: any) => (p.maSanPham || '').includes('FU'))
                };

                // 3. Render Cards
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

            if (priceEl && product.giaBan) {
                const price = Number(product.giaBan).toLocaleString('vi-VN');
                const unit = product.donViTinhChinh || 'month';
                // Use existing styles if possible or simple innerHTML
                priceEl.innerHTML = `${price} <span class="text-base font-normal text-gray-500">/${unit}</span>`;
            }

            if (featureEl && product.nhaCungCap) {
                const items = extractTextBlocks(product.nhaCungCap);
                featureEl.innerHTML = '';
                items.forEach(text => {
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
            doc.querySelectorAll('li, p').forEach((node) => {
                const text = node.textContent?.replace(/^[-•✔+\s]+/, '').trim();
                if (text) blocks.push(text);
            });
            return blocks;
        }

        // Execute
        fetchData();
        // --- END LOGIC ---

    }, []);

    return (
        <>
            <ProductPricing plans={PLACEHOLDER_PLANS} />
            {/* Empty rows prop, will be populated by JS */}
            <ProductPricingComparison rows={[]} />
        </>
    );
}
