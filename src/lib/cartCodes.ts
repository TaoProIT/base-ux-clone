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

// Map slug -> product code prefix used in ERP (sl_lv0014)
// Extend this map when thêm sản phẩm mới.
const PRODUCT_PREFIX_BY_SLUG: Record<string, string> = {
  "phan-mem-ban-hang": "ONLINE.CAFE",
};

const VERSION = "2025.V1";

export function getPlanOptions() {
  return PLAN_METAS.map((meta) => ({ value: meta.value, label: meta.label }));
}

export function buildProductCode(slug: string, plan: PlanOption) {
  const prefix = PRODUCT_PREFIX_BY_SLUG[slug] || slug.toUpperCase();
  const planSuffix = PLAN_METAS.find((meta) => meta.value === plan)?.suffix;
  if (!planSuffix) return "";
  // When prefix is known (ONLINE.xxx) we append version to stay in sync với ERP
  const versionSuffix = prefix.startsWith("ONLINE.") ? `.${VERSION}` : "";
  return `${prefix}.${planSuffix}${versionSuffix}`;
}

export function planLabel(plan: PlanOption) {
  return PLAN_METAS.find((meta) => meta.value === plan)?.label || plan;
}
