export type PlanOption = "basic" | "pro" | "full";

interface PlanMeta {
  value: PlanOption;
  label: string;
  suffix: string;
}

const PLAN_METAS: PlanMeta[] = [
  { value: "basic", label: "Basic", suffix: "BS" },
  { value: "pro", label: "Pro", suffix: "PR" },
  { value: "full", label: "Full", suffix: "FU" },
];

// Chuẩn hoá mã dịch vụ: ONLINE.<CODE>.[BS|PR|FU].2025.V1
const SERVICE_CODE_BY_SLUG: Record<string, string> = {
  "phan-mem-ban-hang": "CAFE",
  "phan-mem-khach-san": "KHACHSAN",
  "phan-mem-nha-hang": "NHAHANG",
  "phan-mem-quan-an": "QUANAN",
  "phan-mem-erp": "ERP",
  "phan-mem-nhan-su": "NHANSU",
  "phan-mem-van-tai-logistic": "VANTAI",
  "phan-mem-kho-pallet": "KHO",
  "phan-mem-quan-li-giu-xe": "GIUXE",
  "phan-mem-chu-ky-so": "CHUKYSO",
  "dich-vu-thiet-ke-web": "WEB",
};

const VERSION_YEAR = 2025;
const VERSION_NUMBER = 1;

export function getServiceCodeFromSlug(rawSlug: string): string {
  const normalized = (rawSlug || "")
    .toString()
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();

  if (SERVICE_CODE_BY_SLUG[normalized]) {
    return SERVICE_CODE_BY_SLUG[normalized];
  }

  const segments = normalized.split("/");
  const lastSegment = segments[segments.length - 1] || normalized;
  return lastSegment.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

export function getPlanOptions() {
  return PLAN_METAS.map((meta) => ({ value: meta.value, label: meta.label }));
}

export function buildProductCode(slug: string, plan: PlanOption) {
  const serviceCode = getServiceCodeFromSlug(slug);
  const planSuffix = PLAN_METAS.find((meta) => meta.value === plan)?.suffix;
  if (!planSuffix || !serviceCode) return "";
  return `ONLINE.${serviceCode}.${planSuffix}.${VERSION_YEAR}.V${VERSION_NUMBER}`;
}

export function planLabel(plan: PlanOption) {
  return PLAN_METAS.find((meta) => meta.value === plan)?.label || plan;
}
