/**
 * Product API Service
 * Kết nối với backend API để lấy danh mục và sản phẩm
 */

const API_URL = '/api/proxy';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'username': 'admin',
    'role': 'admin'
};

export interface Category {
    maDanhMuc: string;
    tenDanhMuc: string;
    moTa: string | null;
    phanLoai?: string | null;
    hinhAnh: string | null;
    maNhomCha: string | null;
    ngayTao: string | null;
    trangThai: number;
    soSanPham?: number;
}

export interface Product {
    maSanPham: string;
    tenSanPham: string;
    loaiSanPham: string;
    donViTinhChinh: string;
    donViTinhPhu: string | null;
    tyLeQuyDoi: number | null;
    giaBan: number;
    donViTienTe: string;
    nhaCungCap: string;
    moTa: string;
    maVach: string | null;
    nhomSanPham: string | null;
    ghiChu: string | null;
}

// Helper function to parse response
async function parseApiResponse<T>(response: Response): Promise<T | null> {
    const text = await response.text();
    try {
        const cleanedText = text.trim().replace(/^\ufeff/, '');
        const jsonMatch = cleanedText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        return JSON.parse(jsonMatch ? jsonMatch[0] : cleanedText);
    } catch (e) {
        console.error("Parse error", e);
        return null;
    }
}

/**
 * Lấy tất cả danh mục sản phẩm
 */
export async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify({
                table: 'sl_lv0006',
                func: 'data',
                code: 'admin',
                token: 'rbA3RKvD1OJTF1DC'
            })
        });

        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const data = await parseApiResponse<Category[]>(response);
        return data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

/**
 * Lấy danh mục kèm số lượng sản phẩm
 */
export async function getCategoriesWithCount(): Promise<Category[]> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify({
                table: 'sl_lv0006',
                func: 'listWithCount',
                code: 'admin',
                token: 'rbA3RKvD1OJTF1DC'
            })
        });

        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const data = await parseApiResponse<Category[]>(response);
        return data || [];
    } catch (error) {
        console.error('Error fetching categories with count:', error);
        return [];
    }
}

/**
 * Lấy chi tiết một danh mục
 */
export async function getCategoryById(maDanhMuc: string): Promise<Category | null> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify({
                table: 'sl_lv0006',
                func: 'getById',
                maDanhMuc,
                code: 'admin',
                token: 'rbA3RKvD1OJTF1DC'
            })
        });

        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const data = await parseApiResponse<{ success: boolean; data: Category }>(response);
        return data?.success ? data.data : null;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

/**
 * Lấy sản phẩm theo danh mục
 */
export async function getProductsByCategory(maDanhMuc: string): Promise<{ category: Category | null; products: Product[] }> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify({
                table: 'sl_lv0006',
                func: 'getProducts',
                maDanhMuc,
                code: 'admin',
                token: 'rbA3RKvD1OJTF1DC'
            })
        });

        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const data = await parseApiResponse<{ success: boolean; category: Category | null; products: Product[] }>(response);
        return {
            category: data?.category || null,
            products: data?.products || []
        };
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return { category: null, products: [] };
    }
}

/**
 * Lấy tất cả sản phẩm
 */
export async function getAllProducts(): Promise<Product[]> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify({
                table: 'sl_lv0007',
                func: 'data',
                code: 'admin',
                token: 'rbA3RKvD1OJTF1DC'
            })
        });

        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const data = await parseApiResponse<Product[]>(response);
        return data || [];
    } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
    }
}

/**
 * Lấy chi tiết một sản phẩm
 */
export async function getProductById(maSanPham: string): Promise<Product | null> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify({
                table: 'sl_lv0007',
                func: 'getById',
                maSanPham,
                code: 'admin',
                token: 'rbA3RKvD1OJTF1DC'
            })
        });

        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const data = await parseApiResponse<{ success: boolean; data: Product }>(response);
        return data?.success ? data.data : null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

/**
 * Map mã danh mục sang slug URL
 */
export function categoryToSlug(maDanhMuc: string): string {
    const mapping: Record<string, string> = {
        'CAFE': 'phan-mem-quan-ly-cafe',
        'KHACHSAN': 'phan-mem-khach-san',
        'NHAHANG': 'phan-mem-nha-hang',
        'QUANAN': 'phan-mem-quan-an',
    };
    return mapping[maDanhMuc] || `san-pham-${maDanhMuc.toLowerCase()}`;
}

/**
 * Map slug URL sang mã danh mục
 */
export function slugToCategory(slug: string): string {
    const mapping: Record<string, string> = {
        'phan-mem-quan-ly-cafe': 'CAFE',
        'phan-mem-ban-hang': 'CAFE', // Backward compatibility
        'phan-mem-khach-san': 'KHACHSAN',
        'phan-mem-nha-hang': 'NHAHANG',
        'phan-mem-quan-an': 'QUANAN',
    };
    return mapping[slug] || slug.toUpperCase();
}
