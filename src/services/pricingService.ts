
export interface PricingProduct {
    maSanPham: string;
    tenSanPham: string;
    image: string;
    moTa: string; // HTML description for comparison
    nhaCungCap: string; // HTML for features list card
    giaBan: number;
    donViTienTe: string;
    donViTinhChinh: string;
    donViTinhPhu: string;
    loaiSanPham: string;
    [key: string]: any;
}

export interface NormalizedPlan {
    name: string;
    description: string;
    price: string;
    priceNote?: string;
    features: string[];
    cta: string;
    ctaLink: string;
    isFeatured?: boolean;
    badge?: string;
    rawHtmlDescription?: string; // For comparison table
}

const API_PAYLOAD = {
    table: 'sl_lv0007',
    func: 'data',
    code: 'admin',
    token: 'rbA3RKvD1OJTF1DC'
};

export const pricingService = {
    fetchPricing: async (): Promise<PricingProduct[]> => {
        try {
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': 'admin',
                    'role': 'admin'
                },
                body: JSON.stringify(API_PAYLOAD)
            });

            if (!response.ok) throw new Error(`API error ${response.status}`);

            const raw = await response.json();
            const products = normalizeProducts(raw);
            // Filter CAFE products as per legacy logic
            return products.filter(isCafeProduct);
        } catch (error) {
            console.error("Fetch pricing error:", error);
            return [];
        }
    },

    mapToPlans: (products: PricingProduct[]): NormalizedPlan[] => {
        const plans: NormalizedPlan[] = [
            { // Basic
                name: "Basic",
                description: "Giải pháp cơ bản cho cửa hàng nhỏ",
                price: "Liên hệ",
                features: [],
                cta: "Đăng ký Basic",
                ctaLink: "/contact",
                badge: "Tiết kiệm"
            },
            { // Pro
                name: "Pro",
                description: "Giải pháp tiêu chuẩn cho doanh nghiệp",
                price: "Liên hệ",
                features: [],
                cta: "Đăng ký Pro",
                ctaLink: "/contact",
                isFeatured: true,
                badge: "Phổ biến nhất"
            },
            { // Full
                name: "Full",
                description: "Giải pháp toàn diện không giới hạn",
                price: "Liên hệ",
                features: [],
                cta: "Đăng ký Full",
                ctaLink: "/contact",
                badge: "Doanh nghiệp"
            }
        ];

        products.forEach(p => {
            const index = getSlotIndex(p.maSanPham);
            if (index === -1) return;

            const plan = plans[index];
            plan.name = p.tenSanPham || plan.name;
            plan.description = getShortDescription(p.nhaCungCap) || p.loaiSanPham || plan.description;

            const unitLabel = normalizeUnit(p.donViTinhChinh || p.donViTinhPhu);
            const priceText = formatPrice(p.giaBan, p.donViTienTe);
            plan.price = priceText;
            plan.priceNote = unitLabel ? `/${unitLabel}` : '';

            plan.features = buildFeatures(p.nhaCungCap);
            plan.rawHtmlDescription = p.moTa;
        });

        return plans.filter(p => p.price !== "Liên hệ" || p.features.length > 0); // Only return valid plans
    },

    buildComparisonRows: (products: PricingProduct[]) => {
        // Legacy logic conversion
        const plans = {
            basic: products.find(p => (p.maSanPham || '').includes('BS')),
            pro: products.find(p => (p.maSanPham || '').includes('PR')),
            full: products.find(p => (p.maSanPham || '').includes('FU'))
        };

        if (!plans.basic && !plans.pro && !plans.full) return [];

        // Create a single row "Tính năng" with HTML content as per legacy
        return [
            {
                feature: "Tính năng chi tiết",
                basic: buildMoTaHTML(plans.basic),
                pro: buildMoTaHTML(plans.pro),
                full: buildMoTaHTML(plans.full),
                isHtml: true // Flag to render as HTML
            }
        ];
    }
};

// --- Helpers from legacy JS ---

function normalizeProducts(payload: any) {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.result)) return payload.result;
    if (payload.maSanPham) return [payload];
    return [];
}

function isCafeProduct(product: any) {
    const code = (product && (product.maSanPham || product.ma_san_pham || '')).toString().toUpperCase();
    return code.includes('CAFE');
}

function getSlotIndex(code: string) {
    if (!code) return -1;
    if (code.includes('BS')) return 0;
    if (code.includes('PR')) return 1;
    if (code.includes('FU')) return 2;
    return -1;
}

function getShortDescription(htmlString: string) {
    if (!htmlString) return '';
    // Server-side safe parsing or simple regex since DOMParser is client-side
    // Using regex for simplicity in pure JS logic or need rudimentary DOMShim if strictly needed
    // But since this runs on Client Component, DOMParser is available.
    if (typeof window === 'undefined') return ''; // Safety check

    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const heading = doc.querySelector('h1, h2, h3, h4, h5, h6, p');
    return heading ? heading.textContent?.trim() : '';
}

function normalizeUnit(unit: string) {
    if (!unit) return '';
    const lower = unit.toString().toLowerCase();
    if (lower.includes('month')) return 'tháng';
    if (lower.includes('year')) return 'năm';
    return lower;
}

function formatPrice(value: any, currency = '') {
    if (value === undefined || value === null || value === '') return 'Liên hệ';
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric <= 0) return 'Liên hệ';
    return `${numeric.toLocaleString('vi-VN')}${currency ? ` ${currency}` : ''}`;
}

function buildFeatures(nhaCungCap: string) {
    if (typeof window === 'undefined') return [];
    const items = extractTextBlocks(nhaCungCap);
    const unique = Array.from(new Set(items)).filter(Boolean);
    return unique.length ? unique : ["Đang cập nhật"];
}

function extractTextBlocks(htmlString: string) {
    if (!htmlString || typeof window === 'undefined') return [];
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const blocks: string[] = [];
    doc.querySelectorAll('li, p, h3, h4').forEach((node: any) => {
        const text = sanitizeText(node.textContent);
        if (text) blocks.push(text);
    });
    return blocks;
}

function sanitizeText(raw: string | null, stripPrefix = true) {
    if (!raw) return '';
    const cleaned = raw.replace(/\s+/g, ' ').trim();
    if (!stripPrefix) return cleaned;
    return cleaned.replace(/^[-•✔+\s]+/, '').trim();
}

function buildMoTaHTML(product: any) {
    if (!product || !product.moTa) return '';
    if (typeof window === 'undefined') return product.moTa;

    // Simple cleaning logic
    const doc = new DOMParser().parseFromString(product.moTa, 'text/html');
    doc.querySelectorAll('script').forEach((node: any) => node.remove());

    // We want to return list HTML
    const items: string[] = [];
    doc.querySelectorAll('li, p').forEach((node: any) => {
        const text = sanitizeText(node.textContent, false); // false = keep prefix? legacy code used false
        if (text) items.push(text);
    });

    const unique = Array.from(new Set(items));
    if (!unique.length) return '';

    // Construct UL
    return `<ul class="space-y-2 text-left text-sm text-gray-600 pl-4 list-disc">${unique.map(t => `<li>${t}</li>`).join('')}</ul>`;
}
