// Cấu hình cơ chế mã sản phẩm
// Ví dụ:
// - Phần mềm quản lý cafe Basic 2025 -> ONLINE.CAFE.BS.2025.V1
// - Phần mềm quản lý khách sạn Basic 2025 -> ONLINE.KHACHS.BS.2025.V1
// - Phần mềm quản lý nhà hàng Full 2025 -> ONLINE.NHAH.FU.2025.V1

export type ProductTier = 'BS' | 'PR' | 'FU';

export const categoryCodeMap: Record<string, string> = {
  CAFE: 'CAFE',
  KHACHSAN: 'KHACHS',
  NHAHANG: 'NHAH',
  QUANAN: 'QUANAN',
  TOILET: 'TOILET',
};

export function generateProductCode({
  categoryCode,
  tier,
  year = 2025,
  version = 1,
}: {
  categoryCode: keyof typeof categoryCodeMap;
  tier: ProductTier;
  year?: number;
  version?: number;
}): string {
  const cat = categoryCodeMap[categoryCode] || categoryCode.toUpperCase();
  return `ONLINE.${cat}.${tier}.${year}.V${version}`;
}

export function parseProductCode(code: string) {
  // Trả về các phần đã tách nếu khớp pattern, otherwise null
  const regex = /^ONLINE\.([A-Z]+)\.(BS|PR|FU)\.(\d{4})\.V(\d+)$/i;
  const match = code.match(regex);
  if (!match) return null;
  return {
    category: match[1].toUpperCase(),
    tier: match[2].toUpperCase() as ProductTier,
    year: Number(match[3]),
    version: Number(match[4]),
  };
}

export const tierLabels: Record<ProductTier, string> = {
  BS: 'Basic',
  PR: 'Pro',
  FU: 'Full',
};
